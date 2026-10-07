import '../domain/farm_zone.dart';
import 'farm_repository.dart';

class MockFarmRepository implements FarmRepository {
  const MockFarmRepository();

  static const _zones = [
    FarmZoneInfo(
      zone: FarmZone.farmHouse,
      subtitleKey: 'houseSubtitle',
      status: FarmStatus.healthy,
    ),
    FarmZoneInfo(
      zone: FarmZone.tomatoField,
      subtitleKey: 'cropTomatoes',
      status: FarmStatus.excellent,
      growthPercent: 54,
    ),
    FarmZoneInfo(
      zone: FarmZone.vegetableField,
      subtitleKey: 'cropLettuce',
      status: FarmStatus.excellent,
      growthPercent: 88,
    ),
    FarmZoneInfo(
      zone: FarmZone.cornField,
      subtitleKey: 'cropCorn',
      status: FarmStatus.good,
      growthPercent: 18,
    ),
    FarmZoneInfo(
      zone: FarmZone.animalArea,
      subtitleKey: 'animalsSubtitle',
      status: FarmStatus.healthy,
    ),
    FarmZoneInfo(
      zone: FarmZone.waterTank,
      subtitleKey: 'waterSubtitle',
      status: FarmStatus.good,
    ),
  ];

  @override
  Future<List<FarmZoneInfo>> getZones() async =>
      List<FarmZoneInfo>.unmodifiable(_zones);

  @override
  Future<FarmOverview> getOverview() async => const FarmOverview(
        zoneCount: 7,
        cropCount: 4,
        animalCount: 48,
        areaHectares: 12.5,
        waterLevelPercent: 82,
        waterStoredLiters: 8200,
        waterUsedTodayLiters: 1240,
      );
}
