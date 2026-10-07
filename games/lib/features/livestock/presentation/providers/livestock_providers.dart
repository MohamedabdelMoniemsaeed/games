import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/livestock_repository.dart';
import '../../data/mock_livestock_repository.dart';
import '../../domain/animal.dart';
import '../../domain/animal_detail.dart';

final livestockRepositoryProvider = Provider<LivestockRepository>(
  (ref) => const MockLivestockRepository(),
);

final herdSummaryProvider =
    AsyncNotifierProvider<HerdSummaryNotifier, HerdSummary>(
  HerdSummaryNotifier.new,
);

class HerdSummaryNotifier extends AsyncNotifier<HerdSummary> {
  @override
  Future<HerdSummary> build() =>
      ref.watch(livestockRepositoryProvider).getHerdSummary();
}

final livestockAnimalsProvider =
    AsyncNotifierProvider<LivestockAnimalsNotifier, List<Animal>>(
  LivestockAnimalsNotifier.new,
);

class LivestockAnimalsNotifier extends AsyncNotifier<List<Animal>> {
  @override
  Future<List<Animal>> build() =>
      ref.watch(livestockRepositoryProvider).getAnimals();
}

final feedingScheduleProvider =
    AsyncNotifierProvider<FeedingScheduleNotifier, List<FeedingEvent>>(
  FeedingScheduleNotifier.new,
);

class FeedingScheduleNotifier extends AsyncNotifier<List<FeedingEvent>> {
  @override
  Future<List<FeedingEvent>> build() =>
      ref.watch(livestockRepositoryProvider).getFeedingSchedule();
}

final selectedAnimalCategoryProvider =
    NotifierProvider<SelectedAnimalCategoryNotifier, AnimalCategory>(
  SelectedAnimalCategoryNotifier.new,
);

class SelectedAnimalCategoryNotifier extends Notifier<AnimalCategory> {
  @override
  AnimalCategory build() => AnimalCategory.cows;

  void select(AnimalCategory category) {
    state = category;
  }
}

final animalDetailProvider =
    FutureProvider.family<AnimalDetail, String>((ref, tag) {
  return ref.watch(livestockRepositoryProvider).getAnimalDetail(tag);
});
