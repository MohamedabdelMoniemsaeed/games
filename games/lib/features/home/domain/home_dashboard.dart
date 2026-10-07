enum DashboardMetric { crops, animals, soilMoisture, harvest }

enum FarmTaskType { waterTomatoes, checkCorn, feedLivestock, prepareHarvest }

enum FarmFieldType { tomato, corn, vegetables }

class DashboardStat {
  const DashboardStat({
    required this.metric,
    required this.value,
    required this.trendPercent,
  });

  final DashboardMetric metric;
  final int value;
  final int trendPercent;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is DashboardStat &&
          metric == other.metric &&
          value == other.value &&
          trendPercent == other.trendPercent;

  @override
  int get hashCode => Object.hash(metric, value, trendPercent);
}

class FarmTask {
  const FarmTask({
    required this.id,
    required this.type,
    this.customTitle,
    this.isCompleted = false,
  });

  final String id;
  final FarmTaskType type;
  final String? customTitle;
  final bool isCompleted;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is FarmTask &&
          id == other.id &&
          type == other.type &&
          customTitle == other.customTitle &&
          isCompleted == other.isCompleted;

  @override
  int get hashCode => Object.hash(id, type, customTitle, isCompleted);
}

class FarmField {
  const FarmField({
    required this.type,
    required this.growthPercent,
    required this.isHealthy,
  });

  final FarmFieldType type;
  final int growthPercent;
  final bool isHealthy;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is FarmField &&
          type == other.type &&
          growthPercent == other.growthPercent &&
          isHealthy == other.isHealthy;

  @override
  int get hashCode => Object.hash(type, growthPercent, isHealthy);
}

class HomeDashboardData {
  const HomeDashboardData({
    required this.stats,
    required this.tasks,
    required this.fields,
    required this.financeBalance,
    required this.financeTrend,
    required this.lowInventoryCount,
  });

  final List<DashboardStat> stats;
  final List<FarmTask> tasks;
  final List<FarmField> fields;
  final int financeBalance;
  final int financeTrend;
  final int lowInventoryCount;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is HomeDashboardData &&
          _listEquals(stats, other.stats) &&
          _listEquals(tasks, other.tasks) &&
          _listEquals(fields, other.fields) &&
          financeBalance == other.financeBalance &&
          financeTrend == other.financeTrend &&
          lowInventoryCount == other.lowInventoryCount;

  @override
  int get hashCode => Object.hash(
    Object.hashAll(stats),
    Object.hashAll(tasks),
    Object.hashAll(fields),
    financeBalance,
    financeTrend,
    lowInventoryCount,
  );
}

bool _listEquals<T>(List<T> first, List<T> second) {
  if (first.length != second.length) return false;
  for (var index = 0; index < first.length; index++) {
    if (first[index] != second[index]) return false;
  }
  return true;
}
