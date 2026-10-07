import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/harvest_repository.dart';
import '../../data/mock_harvest_repository.dart';
import '../../domain/harvest_item.dart';

final harvestRepositoryProvider = Provider<HarvestRepository>(
  (ref) => MockHarvestRepository(),
);

final harvestProvider =
    AsyncNotifierProvider<HarvestNotifier, List<HarvestItem>>(
  HarvestNotifier.new,
);

class HarvestNotifier extends AsyncNotifier<List<HarvestItem>> {
  @override
  Future<List<HarvestItem>> build() =>
      ref.watch(harvestRepositoryProvider).getHarvests();

  Future<void> markHarvested(String id) async {
    final repository = ref.read(harvestRepositoryProvider);
    state = await AsyncValue.guard(() => repository.markHarvested(id));
  }
}
