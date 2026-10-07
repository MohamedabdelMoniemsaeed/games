import '../domain/home_dashboard.dart';
import 'home_repository.dart';

class MockHomeRepository implements HomeRepository {
  const MockHomeRepository();

  static const _dashboard = HomeDashboardData(
    stats: [
      DashboardStat(
        metric: DashboardMetric.crops,
        value: 12,
        trendPercent: 8,
      ),
      DashboardStat(
        metric: DashboardMetric.animals,
        value: 48,
        trendPercent: 4,
      ),
      DashboardStat(
        metric: DashboardMetric.soilMoisture,
        value: 72,
        trendPercent: 3,
      ),
      DashboardStat(
        metric: DashboardMetric.harvest,
        value: 1280,
        trendPercent: 12,
      ),
    ],
    tasks: [
      FarmTask(id: 'water-tomatoes', type: FarmTaskType.waterTomatoes),
      FarmTask(id: 'check-corn', type: FarmTaskType.checkCorn),
      FarmTask(id: 'feed-livestock', type: FarmTaskType.feedLivestock),
      FarmTask(id: 'prepare-harvest', type: FarmTaskType.prepareHarvest),
    ],
    fields: [
      FarmField(
        type: FarmFieldType.tomato,
        growthPercent: 54,
        isHealthy: false,
      ),
      FarmField(
        type: FarmFieldType.corn,
        growthPercent: 18,
        isHealthy: true,
      ),
      FarmField(
        type: FarmFieldType.vegetables,
        growthPercent: 88,
        isHealthy: true,
      ),
    ],
    financeBalance: 12480,
    financeTrend: 8,
    lowInventoryCount: 3,
  );

  @override
  Future<HomeDashboardData> getDashboard() async => _dashboard;
}
