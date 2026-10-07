import '../domain/analytics_data.dart';
import 'analytics_repository.dart';

class MockAnalyticsRepository implements AnalyticsRepository {
  const MockAnalyticsRepository();

  @override
  Future<AnalyticsData> getAnalytics(AnalyticsPeriod period) async {
    final multiplier = switch (period) {
      AnalyticsPeriod.week => 1,
      AnalyticsPeriod.month => 4,
      AnalyticsPeriod.season => 12,
    };
    return AnalyticsData(
      totalYield: 1280 * multiplier,
      yieldChangePercent: period == AnalyticsPeriod.week ? 12 : 16,
      waterEfficiency: 86,
      farmScore: 92,
      productionValues: List.unmodifiable(
        [38, 46, 44, 58, 62, 57, 76].map((value) => value * multiplier),
      ),
      cropYields: List.unmodifiable([76, 54, 39].map((v) => v * multiplier)),
    );
  }
}
