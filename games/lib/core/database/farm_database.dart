import 'dart:io';

import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';

import '../../features/home/domain/home_dashboard.dart';

part 'farm_database.g.dart';

/// A crop planted in a farm field.
class Crops extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get fieldId =>
      integer().references(Fields, #id, onDelete: KeyAction.cascade)();
  TextColumn get name => text()();
  IntColumn get growthPercent =>
      integer().withDefault(const Constant(0))();
  DateTimeColumn get plantingDate => dateTime().nullable()();
}

/// A physical farm plot or operational zone.
class Fields extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text().unique()();
  RealColumn get areaHectares => real().withDefault(const Constant(0))();
  DateTimeColumn get plantingDate => dateTime().nullable()();
}

/// A livestock animal managed by the farm.
class Animals extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  TextColumn get category => text()();
  TextColumn get breed => text()();
  TextColumn get tag => text().unique()();
  DateTimeColumn get birthDate => dateTime()();
  IntColumn get healthPercent => integer()();
}

/// A farm task shown on the home dashboard.
class Tasks extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get title => text()();
  BoolColumn get isCompleted => boolean().withDefault(const Constant(false))();
  DateTimeColumn get dueDate => dateTime().nullable()();
}

/// A planned harvest and its recorded yield.
class HarvestPlans extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get fieldName => text()();
  TextColumn get cropName => text()();
  DateTimeColumn get expectedDate => dateTime()();
  RealColumn get expectedYieldKg => real()();
  BoolColumn get isHarvested => boolean().withDefault(const Constant(false))();
  RealColumn get actualYieldKg => real().nullable()();
}

/// A recorded farm irrigation event.
class WaterLog extends Table {
  IntColumn get id => integer().autoIncrement()();
  DateTimeColumn get recordedAt => dateTime()();
  RealColumn get liters => real()();
  BoolColumn get isUsage => boolean().withDefault(const Constant(false))();
  IntColumn get fieldId =>
      integer().nullable().references(Fields, #id, onDelete: KeyAction.setNull)();
}

/// Local SQLite database for Farmly's editable farm data.
@DriftDatabase(tables: [Fields, Crops, Animals, Tasks, HarvestPlans, WaterLog])
class FarmDatabase extends _$FarmDatabase {
  FarmDatabase([QueryExecutor? executor])
      : super(executor ?? _openConnection());

  @override
  int get schemaVersion => 1;

  @override
  MigrationStrategy get migration => MigrationStrategy(
        onCreate: (migrator) async {
          await migrator.createAll();
          await _seedDatabase();
        },
      );

  Future<void> _seedDatabase() async {
    final fieldIds = <String, int>{};
    for (final entry in const [
      ('Farm House', 1.2),
      ('Tomato Field', 3.0),
      ('Vegetable Field', 2.4),
      ('Corn Field', 3.5),
      ('Animal Area', 1.6),
      ('Water Tank', 0.8),
    ]) {
      fieldIds[entry.$1] = await into(fields).insert(
        FieldsCompanion.insert(name: entry.$1, areaHectares: Value(entry.$2)),
      );
    }

    await batch((batch) {
      batch.insertAll(crops, [
        CropsCompanion.insert(
          fieldId: fieldIds['Tomato Field']!,
          name: 'Tomatoes',
          growthPercent: const Value(54),
          plantingDate: Value(DateTime.now().subtract(const Duration(days: 40))),
        ),
        CropsCompanion.insert(
          fieldId: fieldIds['Vegetable Field']!,
          name: 'Lettuce',
          growthPercent: const Value(88),
          plantingDate: Value(DateTime.now().subtract(const Duration(days: 32))),
        ),
        CropsCompanion.insert(
          fieldId: fieldIds['Vegetable Field']!,
          name: 'Carrots',
          growthPercent: const Value(88),
          plantingDate: Value(DateTime.now().subtract(const Duration(days: 36))),
        ),
        CropsCompanion.insert(
          fieldId: fieldIds['Corn Field']!,
          name: 'Corn',
          growthPercent: const Value(18),
          plantingDate: Value(DateTime.now().subtract(const Duration(days: 12))),
        ),
      ]);
    });

    final seedAnimals = <AnimalsCompanion>[
      _animal('Bella', 'cows', 'Holstein-Friesian', 'COW-001', 36, 94),
      _animal('Daisy', 'cows', 'Jersey', 'COW-002', 48, 91),
      _animal('Moose', 'cows', 'Angus', 'COW-003', 24, 84),
      _animal('Clucky', 'chickens', 'Rhode Island Red', 'HEN-001', 18, 96),
      _animal('Pepper', 'chickens', 'Leghorn', 'HEN-002', 12, 91),
      _animal('Fluffy', 'sheep', 'Merino', 'SHP-001', 24, 89),
      _animal('Billy', 'goats', 'Boer', 'GOT-001', 24, 93),
    ];
    _addRemainingAnimals(seedAnimals, 'cows', 'Cow', 'COW', 'Angus', 15);
    _addRemainingAnimals(
      seedAnimals,
      'chickens',
      'Hen',
      'HEN',
      'Leghorn',
      18,
    );
    _addRemainingAnimals(
      seedAnimals,
      'sheep',
      'Sheep',
      'SHP',
      'Merino',
      5,
    );
    _addRemainingAnimals(seedAnimals, 'goats', 'Goat', 'GOT', 'Boer', 3);
    await batch((batch) => batch.insertAll(animals, seedAnimals));

    await batch((batch) {
      batch.insertAll(tasks, [
        TasksCompanion.insert(title: FarmTaskType.waterTomatoes.name),
        TasksCompanion.insert(title: FarmTaskType.checkCorn.name),
        TasksCompanion.insert(title: FarmTaskType.feedLivestock.name),
        TasksCompanion.insert(title: FarmTaskType.prepareHarvest.name),
      ]);
      batch.insertAll(harvestPlans, [
        HarvestPlansCompanion.insert(
          fieldName: 'Tomato Field',
          cropName: 'tomatoes',
          expectedDate: DateTime.now().add(const Duration(days: 4)),
          expectedYieldKg: 460,
        ),
        HarvestPlansCompanion.insert(
          fieldName: 'Vegetable Field',
          cropName: 'lettuce',
          expectedDate: DateTime.now().add(const Duration(days: 9)),
          expectedYieldKg: 320,
        ),
        HarvestPlansCompanion.insert(
          fieldName: 'Corn Field',
          cropName: 'corn',
          expectedDate: DateTime.now().add(const Duration(days: 18)),
          expectedYieldKg: 500,
        ),
      ]);
      batch.insert(
        waterLog,
        WaterLogCompanion.insert(
          recordedAt: DateTime.now(),
          liters: 9440,
          fieldId: Value(fieldIds['Tomato Field']),
        ),
      );
      batch.insert(
        waterLog,
        WaterLogCompanion.insert(
          recordedAt: DateTime.now(),
          liters: 1240,
          isUsage: const Value(true),
          fieldId: Value(fieldIds['Tomato Field']),
        ),
      );
    });
  }

  AnimalsCompanion _animal(
    String name,
    String category,
    String breed,
    String tag,
    int ageMonths,
    int health,
  ) =>
      AnimalsCompanion.insert(
        name: name,
        category: category,
        breed: breed,
        tag: tag,
        birthDate: DateTime.now().subtract(Duration(days: ageMonths * 30)),
        healthPercent: health,
      );

  void _addRemainingAnimals(
    List<AnimalsCompanion> output,
    String category,
    String name,
    String prefix,
    String breed,
    int additionalCount,
  ) {
    final existingCount = output.where((animal) => animal.category.value == category).length;
    for (var index = 1; index <= additionalCount; index++) {
      final serial = existingCount + index;
      output.add(
        _animal(
          '$name ${serial.toString().padLeft(3, '0')}',
          category,
          breed,
          '$prefix-${serial.toString().padLeft(3, '0')}',
          18 + serial % 30,
          88 + serial % 11,
        ),
      );
    }
  }
}

LazyDatabase _openConnection() => LazyDatabase(() async {
      final directory = await getApplicationDocumentsDirectory();
      final file = File(
        '${directory.path}${Platform.pathSeparator}farmly.sqlite',
      );
      return NativeDatabase.createInBackground(file);
    });
