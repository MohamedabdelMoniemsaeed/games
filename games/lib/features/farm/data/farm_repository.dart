import '../domain/farm_zone.dart';

abstract interface class FarmRepository {
  Future<List<FarmZoneInfo>> getZones();
  Future<FarmOverview> getOverview();
}
