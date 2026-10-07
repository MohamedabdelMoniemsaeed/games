import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/analytics_repository.dart';
import '../../data/mock_analytics_repository.dart';
import '../../domain/analytics_data.dart';

final analyticsRepositoryProvider = Provider<AnalyticsRepository>(
  (ref) => const MockAnalyticsRepository(),
);

final analyticsPeriodProvider =
    NotifierProvider<AnalyticsPeriodNotifier, AnalyticsPeriod>(
  AnalyticsPeriodNotifier.new,
);

class AnalyticsPeriodNotifier extends Notifier<AnalyticsPeriod> {
  @override
  AnalyticsPeriod build() => AnalyticsPeriod.week;

  void select(AnalyticsPeriod period) => state = period;
}

final analyticsDataProvider = FutureProvider<AnalyticsData>((ref) {
  final period = ref.watch(analyticsPeriodProvider);
  return ref.watch(analyticsRepositoryProvider).getAnalytics(period);
});
