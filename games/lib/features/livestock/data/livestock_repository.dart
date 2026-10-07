import '../domain/animal.dart';
import '../domain/animal_detail.dart';

abstract interface class LivestockRepository {
  Future<HerdSummary> getHerdSummary();
  Future<List<Animal>> getAnimals();
  Future<List<FeedingEvent>> getFeedingSchedule();
  Future<AnimalDetail> getAnimalDetail(String tag);
}
