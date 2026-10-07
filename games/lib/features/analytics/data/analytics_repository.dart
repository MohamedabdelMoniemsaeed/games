import '../domain/analytics_data.dart';

abstract interface class AnalyticsRepository {
  Future<AnalyticsData> getAnalytics(AnalyticsPeriod period);
}
