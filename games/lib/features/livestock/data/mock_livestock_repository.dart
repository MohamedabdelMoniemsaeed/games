import '../domain/animal.dart';
import '../domain/animal_detail.dart';
import 'livestock_repository.dart';

class MockLivestockRepository implements LivestockRepository {
  const MockLivestockRepository();

  static const _animals = [
    Animal(
      name: AnimalName.bella,
      breed: AnimalBreed.holstein,
      tag: 'COW-001',
      ageMonths: 36,
      category: AnimalCategory.cows,
      healthPercent: 94,
    ),
    Animal(
      name: AnimalName.daisy,
      breed: AnimalBreed.jersey,
      tag: 'COW-002',
      ageMonths: 48,
      category: AnimalCategory.cows,
      healthPercent: 91,
    ),
    Animal(
      name: AnimalName.moose,
      breed: AnimalBreed.angus,
      tag: 'COW-003',
      ageMonths: 24,
      category: AnimalCategory.cows,
      healthPercent: 84,
    ),
    Animal(
      name: AnimalName.clucky,
      breed: AnimalBreed.rhodeIslandRed,
      tag: 'HEN-001',
      ageMonths: 18,
      category: AnimalCategory.chickens,
      healthPercent: 96,
    ),
    Animal(
      name: AnimalName.pepper,
      breed: AnimalBreed.leghorn,
      tag: 'HEN-002',
      ageMonths: 12,
      category: AnimalCategory.chickens,
      healthPercent: 91,
    ),
    Animal(
      name: AnimalName.fluffy,
      breed: AnimalBreed.merino,
      tag: 'SHP-001',
      ageMonths: 24,
      category: AnimalCategory.sheep,
      healthPercent: 89,
    ),
    Animal(
      name: AnimalName.billy,
      breed: AnimalBreed.boer,
      tag: 'GOT-001',
      ageMonths: 24,
      category: AnimalCategory.goats,
      healthPercent: 93,
    ),
  ];

  static const _schedule = [
    FeedingEvent(time: '06:00', type: FeedType.haySilage, isComplete: true),
    FeedingEvent(time: '12:00', type: FeedType.grainMix, isComplete: false),
    FeedingEvent(time: '18:00', type: FeedType.eveningFeed, isComplete: false),
  ];

  @override
  Future<HerdSummary> getHerdSummary() async => const HerdSummary(
        cows: 18,
        chickens: 20,
        sheep: 6,
        goats: 4,
        healthPercent: 93,
        feedPercent: 78,
        productionPercent: 84,
      );

  @override
  Future<List<Animal>> getAnimals() async =>
      List<Animal>.unmodifiable(_animals);

  @override
  Future<List<FeedingEvent>> getFeedingSchedule() async =>
      List<FeedingEvent>.unmodifiable(_schedule);

  @override
  Future<AnimalDetail> getAnimalDetail(String tag) async {
    final animal = _animals.where((item) => item.tag == tag).firstOrNull;
    if (animal == null) throw StateError('Animal not found: $tag');
    final baseWeight = switch (animal.category) {
      AnimalCategory.cows => 430,
      AnimalCategory.chickens => 2,
      AnimalCategory.sheep => 62,
      AnimalCategory.goats => 48,
    };
    return AnimalDetail(
      tag: tag,
      weightHistoryKg: List.unmodifiable([
        baseWeight - 18,
        baseWeight - 12,
        baseWeight - 8,
        baseWeight - 3,
        baseWeight,
      ]),
      vaccinations: List.unmodifiable([
        VaccinationRecord(
          date: DateTime(2026, 5, 12),
          vaccineKey: 'rabiesVaccine',
        ),
        VaccinationRecord(
          date: DateTime(2026, 2, 3),
          vaccineKey: 'clostridialVaccine',
        ),
        VaccinationRecord(
          date: DateTime(2025, 10, 18),
          vaccineKey: 'boosterVaccine',
        ),
      ]),
    );
  }
}
