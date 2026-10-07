import 'package:drift/drift.dart';

import '../../features/farm/data/farm_repository.dart';
import '../../features/farm/domain/farm_zone.dart';
import '../../features/harvest/data/harvest_repository.dart';
import '../../features/harvest/domain/harvest_item.dart';
import '../../features/home/data/home_repository.dart';
import '../../features/home/domain/home_dashboard.dart';
import '../../features/livestock/data/livestock_repository.dart';
import '../../features/livestock/data/mock_livestock_repository.dart';
import '../../features/livestock/domain/animal.dart';
import '../../features/livestock/domain/animal_detail.dart';
import 'farm_database.dart' as db;

/// Drift-backed implementation of the farm feature repository.
class DriftFarmRepository implements FarmRepository {
  DriftFarmRepository(this.database);

  final db.FarmDatabase database;

  Stream<List<FarmZoneInfo>> watchZones() => database
      .customSelect(
        'SELECT f.name, c.name AS crop, c.growth_percent '
        'FROM fields f LEFT JOIN crops c ON c.field_id = f.id '
        'ORDER BY f.id',
        readsFrom: {database.fields, database.crops},
      )
      .watch()
      .map((rows) => rows
          .map((row) => _zoneInfo(
                row.read<String>('name'),
                row.readNullable<String>('crop'),
                row.readNullable<int>('growth_percent'),
              ))
          .whereType<FarmZoneInfo>()
          .toList(growable: false));

  @override
  Future<List<FarmZoneInfo>> getZones() => watchZones().first;

  @override
  Future<FarmOverview> getOverview() => watchOverview().first;

  Stream<FarmOverview> watchOverview() => database
      .customSelect(
        'SELECT (SELECT COUNT(*) FROM fields) AS field_count, '
        '(SELECT COUNT(*) FROM crops) AS crop_count, '
        '(SELECT COUNT(*) FROM animals) AS animal_count, '
        '(SELECT COALESCE(SUM(area_hectares), 0) FROM fields) AS area, '
        '(SELECT COALESCE(SUM(CASE WHEN is_usage = 0 THEN liters ELSE -liters END), 0) FROM water_log) AS stored, '
        '(SELECT COALESCE(SUM(liters), 0) FROM water_log WHERE is_usage = 1 AND recorded_at >= ?) AS used',
        variables: [
          Variable.withDateTime(
            DateTime.now().copyWith(hour: 0, minute: 0, second: 0, millisecond: 0),
          ),
        ],
        readsFrom: {
          database.fields,
          database.crops,
          database.animals,
          database.waterLog,
        },
      )
      .watch()
      .map((rows) {
        final row = rows.single;
        final storedLiters = row.read<int>('stored');
        return FarmOverview(
          zoneCount: row.read<int>('field_count') + 1,
          cropCount: row.read<int>('crop_count'),
          animalCount: row.read<int>('animal_count'),
          areaHectares: row.read<double>('area'),
          waterLevelPercent: storedLiters > 0
              ? (storedLiters * 100 / 10000).round().clamp(0, 100)
              : 0,
          waterStoredLiters: storedLiters,
          waterUsedTodayLiters: row.read<int>('used'),
        );
      });

  Future<int> saveField({
    int? id,
    required String name,
    required String cropName,
    required double areaHectares,
    required DateTime plantingDate,
    required int growthPercent,
  }) =>
      database.transaction(() async {
        final fieldId = id == null
            ? await database.into(database.fields).insert(
                  db.FieldsCompanion.insert(
                    name: name.trim(),
                    areaHectares: Value(areaHectares),
                    plantingDate: Value(plantingDate),
                  ),
                )
            : id;
        if (id != null) {
          await (database.update(database.fields)
                ..where((field) => field.id.equals(id)))
              .write(
            db.FieldsCompanion(
              name: Value(name.trim()),
              areaHectares: Value(areaHectares),
              plantingDate: Value(plantingDate),
            ),
          );
          await (database.delete(database.crops)
                ..where((crop) => crop.fieldId.equals(id)))
              .go();
        }
        await database.into(database.crops).insert(
              db.CropsCompanion.insert(
                fieldId: fieldId,
                name: cropName.trim(),
                growthPercent: Value(growthPercent),
                plantingDate: Value(plantingDate),
              ),
            );
        return fieldId;
      });

  Future<void> deleteField(int id) async {
    await (database.delete(database.fields)
          ..where((field) => field.id.equals(id)))
        .go();
  }

  static FarmZoneInfo? _zoneInfo(String name, String? crop, int? growth) {
    final zone = switch (name) {
      'Farm House' => FarmZone.farmHouse,
      'Tomato Field' => FarmZone.tomatoField,
      'Vegetable Field' => FarmZone.vegetableField,
      'Corn Field' => FarmZone.cornField,
      'Animal Area' => FarmZone.animalArea,
      'Water Tank' => FarmZone.waterTank,
      _ => null,
    };
    if (zone == null) return null;
    return FarmZoneInfo(
      zone: zone,
      subtitleKey: switch (crop ?? '') {
        'Tomatoes' => 'cropTomatoes',
        'Lettuce' || 'Carrots' => 'cropLettuce',
        'Corn' => 'cropCorn',
        _ => switch (zone) {
            FarmZone.farmHouse => 'houseSubtitle',
            FarmZone.animalArea => 'animalsSubtitle',
            FarmZone.waterTank => 'waterSubtitle',
            _ => 'cropTomatoes',
          },
      },
      status: (growth ?? 100) >= 80
          ? FarmStatus.excellent
          : (growth ?? 100) >= 40
              ? FarmStatus.good
              : FarmStatus.good,
      growthPercent: growth,
    );
  }
}

/// Drift-backed implementation of the livestock repository.
class DriftLivestockRepository implements LivestockRepository {
  DriftLivestockRepository(this.database);

  final db.FarmDatabase database;
  final MockLivestockRepository _details = const MockLivestockRepository();

  Stream<List<Animal>> watchAnimals() => database.select(database.animals).watch().map(
        (rows) => rows.map(_animalFromRow).toList(growable: false),
      );

  @override
  Future<List<Animal>> getAnimals() => watchAnimals().first;

  Stream<HerdSummary> watchHerdSummary() => watchAnimals().map((animals) {
        int count(AnimalCategory category) =>
            animals.where((animal) => animal.category == category).length;
        return HerdSummary(
          cows: count(AnimalCategory.cows),
          chickens: count(AnimalCategory.chickens),
          sheep: count(AnimalCategory.sheep),
          goats: count(AnimalCategory.goats),
          healthPercent: animals.isEmpty
              ? 0
              : (animals.fold<int>(
                        0,
                        (total, animal) => total + animal.healthPercent,
                      ) /
                      animals.length)
                  .round(),
          feedPercent: 78,
          productionPercent: 84,
        );
      });

  @override
  Future<HerdSummary> getHerdSummary() => watchHerdSummary().first;

  @override
  Future<List<FeedingEvent>> getFeedingSchedule() =>
      _details.getFeedingSchedule();

  @override
  Future<AnimalDetail> getAnimalDetail(String tag) =>
      _details.getAnimalDetail(tag);

  Future<void> saveAnimal({
    String? existingTag,
    required String name,
    required AnimalCategory category,
    required String breed,
    required String tag,
    required DateTime birthDate,
    required int healthPercent,
  }) async {
    final existing = existingTag == null
        ? null
        : await (database.select(database.animals)
              ..where((animal) => animal.tag.equals(existingTag)))
            .getSingleOrNull();
    final values = db.AnimalsCompanion.insert(
      name: name.trim(),
      category: category.name,
      breed: breed.trim(),
      tag: tag.trim().toUpperCase(),
      birthDate: birthDate,
      healthPercent: healthPercent,
    );
    if (existing == null) {
      await database.into(database.animals).insert(values);
    } else {
      await (database.update(database.animals)
            ..where((animal) => animal.id.equals(existing.id)))
          .write(values);
    }
  }

  Future<void> deleteAnimal(String tag) async {
    await (database.delete(database.animals)
          ..where((animal) => animal.tag.equals(tag)))
        .go();
  }

  Animal _animalFromRow(db.Animal row) {
    final category = AnimalCategory.values.firstWhere(
      (value) => value.name == row.category,
    );
    final name = AnimalName.values.firstWhere(
      (value) => value.name.toLowerCase() == row.name.toLowerCase(),
      orElse: () => switch (category) {
        AnimalCategory.cows => AnimalName.bella,
        AnimalCategory.chickens => AnimalName.clucky,
        AnimalCategory.sheep => AnimalName.fluffy,
        AnimalCategory.goats => AnimalName.billy,
      },
    );
    final breed = _breedFor(row.breed);
    final ageMonths = (DateTime.now().difference(row.birthDate).inDays / 30)
        .floor()
        .clamp(0, 1200);
    return Animal(
      name: name,
      breed: breed,
      tag: row.tag,
      ageMonths: ageMonths,
      category: category,
      healthPercent: row.healthPercent,
      displayName: _seedName(row.name) ? null : row.name,
      displayBreed: _seedBreed(row.breed) ? null : row.breed,
      birthDate: row.birthDate,
    );
  }

  AnimalBreed _breedFor(String value) => switch (value) {
        'Holstein-Friesian' => AnimalBreed.holstein,
        'Jersey' => AnimalBreed.jersey,
        'Angus' => AnimalBreed.angus,
        'Rhode Island Red' => AnimalBreed.rhodeIslandRed,
        'Leghorn' => AnimalBreed.leghorn,
        'Merino' => AnimalBreed.merino,
        'Boer' => AnimalBreed.boer,
        _ => AnimalBreed.angus,
      };

  bool _seedName(String value) => const {
        'Bella',
        'Daisy',
        'Moose',
        'Clucky',
        'Pepper',
        'Fluffy',
        'Billy',
      }.contains(value);

  bool _seedBreed(String value) => const {
        'Holstein-Friesian',
        'Jersey',
        'Angus',
        'Rhode Island Red',
        'Leghorn',
        'Merino',
        'Boer',
      }.contains(value);
}

/// Drift-backed implementation of the dashboard repository.
class DriftHomeRepository implements HomeRepository {
  DriftHomeRepository(this.database);

  final db.FarmDatabase database;

  Stream<HomeDashboardData> watchDashboard() => database
      .customSelect(
        'SELECT (SELECT COUNT(*) FROM animals) AS animal_count, '
        '(SELECT COUNT(*) FROM crops) AS crop_count, '
        '(SELECT COALESCE(AVG(growth_percent), 0) FROM crops) AS growth, '
        '(SELECT COALESCE(SUM(expected_yield_kg), 0) FROM harvest_plans WHERE is_harvested = 0) AS yield',
        readsFrom: {
          database.animals,
          database.crops,
          database.tasks,
          database.fields,
          database.harvestPlans,
        },
      )
      .watch()
      .asyncMap((rows) async {
        final summary = rows.single;
        final taskRows = await database.select(database.tasks).get();
        final fieldRows = await database
            .customSelect(
              'SELECT f.name, c.growth_percent FROM fields f '
              'LEFT JOIN crops c ON c.field_id = f.id GROUP BY f.id',
              readsFrom: {database.fields, database.crops},
            )
            .get();
        final growth = summary.read<double>('growth').round();
        final animals = summary.read<int>('animal_count');
        final crops = summary.read<int>('crop_count');
        final stats = [
          DashboardStat(metric: DashboardMetric.crops, value: crops, trendPercent: 8),
          DashboardStat(metric: DashboardMetric.animals, value: animals, trendPercent: 4),
          DashboardStat(metric: DashboardMetric.soilMoisture, value: growth, trendPercent: 3),
          DashboardStat(
            metric: DashboardMetric.harvest,
            value: summary.read<double>('yield').round(),
            trendPercent: 12,
          ),
        ];
        return HomeDashboardData(
          stats: stats,
          tasks: taskRows.map(_taskFromRow).toList(growable: false),
          fields: fieldRows.map((row) {
            final name = row.read<String>('name');
            return FarmField(
              type: switch (name) {
                'Tomato Field' => FarmFieldType.tomato,
                'Corn Field' => FarmFieldType.corn,
                _ => FarmFieldType.vegetables,
              },
              growthPercent: row.readNullable<int>('growth_percent') ?? 0,
              isHealthy: (row.readNullable<int>('growth_percent') ?? 0) >= 40,
            );
          }).toList(growable: false),
          financeBalance: 12480,
          financeTrend: 8,
          lowInventoryCount: 3,
        );
      });

  @override
  Future<HomeDashboardData> getDashboard() => watchDashboard().first;

  Future<int> addTask(String title) => database.into(database.tasks).insert(
        db.TasksCompanion.insert(title: title.trim()),
      );

  Future<void> setTaskCompleted(String id, bool completed) async {
    await (database.update(database.tasks)
          ..where((task) => task.id.equals(int.parse(id))))
        .write(db.TasksCompanion(isCompleted: Value(completed)));
  }

  Future<void> deleteTask(String id) async {
    await (database.delete(database.tasks)
          ..where((task) => task.id.equals(int.parse(id))))
        .go();
  }

  FarmTask _taskFromRow(db.Task row) {
    final type = FarmTaskType.values.firstWhere(
      (value) => value.name == row.title,
      orElse: () => FarmTaskType.waterTomatoes,
    );
    return FarmTask(
      id: row.id.toString(),
      type: type,
      customTitle: FarmTaskType.values.any((value) => value.name == row.title)
          ? null
          : row.title,
      isCompleted: row.isCompleted,
    );
  }
}

/// Drift-backed implementation of the harvest repository.
class DriftHarvestRepository implements HarvestRepository {
  DriftHarvestRepository(this.database);

  final db.FarmDatabase database;

  Stream<List<HarvestItem>> watchHarvests() =>
      database.select(database.harvestPlans).watch().map(
            (rows) => rows.map(_harvestFromRow).toList(growable: false),
          );

  @override
  Future<List<HarvestItem>> getHarvests() => watchHarvests().first;

  @override
  Future<List<HarvestItem>> markHarvested(String id) async {
    await recordYield(id, null);
    return getHarvests();
  }

  Future<void> recordYield(String id, double? actualYieldKg) async {
    final planId = int.tryParse(id);
    if (planId == null) throw FormatException('Invalid harvest plan id: $id');
    await (database.update(database.harvestPlans)
          ..where((plan) => plan.id.equals(planId)))
        .write(
      HarvestPlansCompanion(
        isHarvested: const Value(true),
        actualYieldKg: Value(actualYieldKg),
      ),
    );
  }

  HarvestItem _harvestFromRow(db.HarvestPlan row) {
    final crop = switch (row.cropName.toLowerCase()) {
      'corn' => HarvestCrop.corn,
      'lettuce' => HarvestCrop.lettuce,
      _ => HarvestCrop.tomatoes,
    };
    final fieldKey = switch (row.fieldName) {
      'Tomato Field' => 'tomatoField',
      'Corn Field' => 'cornField',
      _ => 'vegetableField',
    };
    return HarvestItem(
      id: row.id.toString(),
      crop: crop,
      fieldNameKey: fieldKey,
      expectedDate: row.expectedDate,
      expectedYieldKg: row.expectedYieldKg.round(),
      daysUntilHarvest:
          row.expectedDate.difference(DateTime.now()).inDays.clamp(0, 999),
      isHarvested: row.isHarvested,
      actualYieldKg: row.actualYieldKg,
    );
  }
}
