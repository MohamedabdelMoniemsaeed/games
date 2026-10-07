enum HarvestCrop { tomatoes, corn, lettuce }

class HarvestItem {
  const HarvestItem({
    required this.id,
    required this.crop,
    required this.fieldNameKey,
    required this.expectedDate,
    required this.expectedYieldKg,
    required this.daysUntilHarvest,
    required this.isHarvested,
    this.actualYieldKg,
  });

  final String id;
  final HarvestCrop crop;
  final String fieldNameKey;
  final DateTime expectedDate;
  final int expectedYieldKg;
  final int daysUntilHarvest;
  final bool isHarvested;
  final double? actualYieldKg;

  HarvestItem copyWith({
    String? id,
    HarvestCrop? crop,
    String? fieldNameKey,
    DateTime? expectedDate,
    int? expectedYieldKg,
    int? daysUntilHarvest,
    bool? isHarvested,
    double? actualYieldKg,
  }) => HarvestItem(
    id: id ?? this.id,
    crop: crop ?? this.crop,
    fieldNameKey: fieldNameKey ?? this.fieldNameKey,
    expectedDate: expectedDate ?? this.expectedDate,
    expectedYieldKg: expectedYieldKg ?? this.expectedYieldKg,
    daysUntilHarvest: daysUntilHarvest ?? this.daysUntilHarvest,
    isHarvested: isHarvested ?? this.isHarvested,
    actualYieldKg: actualYieldKg ?? this.actualYieldKg,
  );

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is HarvestItem &&
          id == other.id &&
          crop == other.crop &&
          fieldNameKey == other.fieldNameKey &&
          expectedDate == other.expectedDate &&
          expectedYieldKg == other.expectedYieldKg &&
          daysUntilHarvest == other.daysUntilHarvest &&
          isHarvested == other.isHarvested &&
          actualYieldKg == other.actualYieldKg;

  @override
  int get hashCode => Object.hash(
    id,
    crop,
    fieldNameKey,
    expectedDate,
    expectedYieldKg,
    daysUntilHarvest,
    isHarvested,
    actualYieldKg,
  );
}
