import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/farm_repository.dart';
import '../../data/mock_farm_repository.dart';
import '../../domain/farm_zone.dart';

final farmRepositoryProvider = Provider<FarmRepository>(
  (ref) => const MockFarmRepository(),
);

final farmZonesProvider =
    AsyncNotifierProvider<FarmZonesNotifier, List<FarmZoneInfo>>(
  FarmZonesNotifier.new,
);

class FarmZonesNotifier extends AsyncNotifier<List<FarmZoneInfo>> {
  @override
  Future<List<FarmZoneInfo>> build() =>
      ref.watch(farmRepositoryProvider).getZones();
}

final farmOverviewProvider =
    AsyncNotifierProvider<FarmOverviewNotifier, FarmOverview>(
  FarmOverviewNotifier.new,
);

class FarmOverviewNotifier extends AsyncNotifier<FarmOverview> {
  @override
  Future<FarmOverview> build() =>
      ref.watch(farmRepositoryProvider).getOverview();
}

final selectedZoneProvider =
    NotifierProvider<SelectedZoneNotifier, FarmZone>(
  SelectedZoneNotifier.new,
);

class SelectedZoneNotifier extends Notifier<FarmZone> {
  @override
  FarmZone build() => FarmZone.farmHouse;

  void select(FarmZone zone) {
    state = zone;
  }
}
