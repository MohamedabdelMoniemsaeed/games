class FarmProfile {
  const FarmProfile({
    required this.farmName,
    required this.ownerName,
    required this.areaHectares,
    required this.version,
  });

  final String farmName;
  final String ownerName;
  final double areaHectares;
  final String version;

  FarmProfile copyWith({
    String? farmName,
    String? ownerName,
    double? areaHectares,
    String? version,
  }) =>
      FarmProfile(
        farmName: farmName ?? this.farmName,
        ownerName: ownerName ?? this.ownerName,
        areaHectares: areaHectares ?? this.areaHectares,
        version: version ?? this.version,
      );

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is FarmProfile &&
          farmName == other.farmName &&
          ownerName == other.ownerName &&
          areaHectares == other.areaHectares &&
          version == other.version;

  @override
  int get hashCode => Object.hash(farmName, ownerName, areaHectares, version);
}
