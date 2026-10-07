import '../domain/home_dashboard.dart';

abstract interface class HomeRepository {
  Future<HomeDashboardData> getDashboard();
}
