enum FarmZone {
  overview,
  farmHouse,
  tomatoField,
  vegetableField,
  cornField,
  animalArea,
  waterTank,
}

enum FarmStatus { excellent, good, healthy }

class FarmZoneInfo {
  const FarmZoneInfo({
    required this.zone,
    required this.subtitleKey,
    required this.status,
    this.growthPercent,
  });

  final FarmZone zone;
  final String subtitleKey;
  final FarmStatus status;
  final int? growthPercent;

  FarmZoneInfo copyWith({
    FarmZone? zone,
    String? subtitleKey,
    FarmStatus? status,
    int? growthPercent,
  }) {
    return FarmZoneInfo(
      zone: zone ?? this.zone,
      subtitleKey: subtitleKey ?? this.subtitleKey,
      status: status ?? this.status,
      growthPercent: growthPercent ?? this.growthPercent,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is FarmZoneInfo &&
          zone == other.zone &&
          subtitleKey == other.subtitleKey &&
          status == other.status &&
          growthPercent == other.growthPercent;

  @override
  int get hashCode => Object.hash(zone, subtitleKey, status, growthPercent);
}

class FarmOverview {
  const FarmOverview({
    required this.zoneCount,
    required this.cropCount,
    required this.animalCount,
    required this.areaHectares,
    required this.waterLevelPercent,
    required this.waterStoredLiters,
    required this.waterUsedTodayLiters,
  });

  final int zoneCount;
  final int cropCount;
  final int animalCount;
  final double areaHectares;
  final int waterLevelPercent;
  final int waterStoredLiters;
  final int waterUsedTodayLiters;

  FarmOverview copyWith({
    int? zoneCount,
    int? cropCount,
    int? animalCount,
    double? areaHectares,
    int? waterLevelPercent,
    int? waterStoredLiters,
    int? waterUsedTodayLiters,
  }) {
    return FarmOverview(
      zoneCount: zoneCount ?? this.zoneCount,
      cropCount: cropCount ?? this.cropCount,
      animalCount: animalCount ?? this.animalCount,
      areaHectares: areaHectares ?? this.areaHectares,
      waterLevelPercent: waterLevelPercent ?? this.waterLevelPercent,
      waterStoredLiters: waterStoredLiters ?? this.waterStoredLiters,
      waterUsedTodayLiters:
          waterUsedTodayLiters ?? this.waterUsedTodayLiters,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is FarmOverview &&
          zoneCount == other.zoneCount &&
          cropCount == other.cropCount &&
          animalCount == other.animalCount &&
          areaHectares == other.areaHectares &&
          waterLevelPercent == other.waterLevelPercent &&
          waterStoredLiters == other.waterStoredLiters &&
          waterUsedTodayLiters == other.waterUsedTodayLiters;

  @override
  int get hashCode => Object.hash(
        zoneCount,
        cropCount,
        animalCount,
        areaHectares,
        waterLevelPercent,
        waterStoredLiters,
        waterUsedTodayLiters,
      );
}
