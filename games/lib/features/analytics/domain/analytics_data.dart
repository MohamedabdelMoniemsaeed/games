enum AnalyticsPeriod { week, month, season }

class AnalyticsData {
  const AnalyticsData({
    required this.totalYield,
    required this.yieldChangePercent,
    required this.waterEfficiency,
    required this.farmScore,
    required this.productionValues,
    required this.cropYields,
  });

  final int totalYield;
  final int yieldChangePercent;
  final int waterEfficiency;
  final int farmScore;
  final List<int> productionValues;
  final List<int> cropYields;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AnalyticsData &&
          totalYield == other.totalYield &&
          yieldChangePercent == other.yieldChangePercent &&
          waterEfficiency == other.waterEfficiency &&
          farmScore == other.farmScore &&
          _listEquals(productionValues, other.productionValues) &&
          _listEquals(cropYields, other.cropYields);

  @override
  int get hashCode => Object.hash(
        totalYield,
        yieldChangePercent,
        waterEfficiency,
        farmScore,
        Object.hashAll(productionValues),
        Object.hashAll(cropYields),
      );
}

bool _listEquals<T>(List<T> a, List<T> b) {
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; i++) {
    if (a[i] != b[i]) return false;
  }
  return true;
}
