enum WeatherCondition {
  sunny,
  clouds,
  wind,
  rainshower,
  clearingUp;

  int get temperature => switch (this) {
        sunny => 28,
        clouds => 25,
        wind => 24,
        rainshower => 21,
        clearingUp => 26,
      };

  int get humidity => switch (this) {
        sunny => 52,
        clouds => 66,
        wind => 58,
        rainshower => 84,
        clearingUp => 64,
      };

  int get windSpeed => switch (this) {
        sunny => 11,
        clouds => 16,
        wind => 29,
        rainshower => 22,
        clearingUp => 12,
      };

  int get rainChance => switch (this) {
        sunny => 5,
        clouds => 20,
        wind => 35,
        rainshower => 86,
        clearingUp => 18,
      };

  int get soilMoisture => switch (this) {
        sunny => 72,
        clouds => 78,
        wind => 70,
        rainshower => 88,
        clearingUp => 86,
      };

  String get conditionKey => switch (this) {
        sunny => 'weatherSunny',
        clouds => 'weatherClouds',
        wind => 'weatherWind',
        rainshower => 'weatherRainshower',
        clearingUp => 'weatherClearingUp',
      };

  WeatherCondition get next =>
      WeatherCondition.values[(index + 1) % WeatherCondition.values.length];
}

enum WeatherRecommendationType { scheduleWater, skipIrrigation, plantCrop }

class WeatherSnapshot {
  const WeatherSnapshot({
    required this.condition,
    required this.windDirectionDegrees,
    required this.gustSpeed,
    required this.expectedRainMm,
    required this.waterTankPercent,
    required this.waterStoredLiters,
    required this.soilStatusKey,
    required this.feelsLikeOffset,
    required this.temperatureHistory,
  });

  final WeatherCondition condition;
  final int windDirectionDegrees;
  final int gustSpeed;
  final double expectedRainMm;
  final int waterTankPercent;
  final int waterStoredLiters;
  final String soilStatusKey;
  final int feelsLikeOffset;
  final List<int> temperatureHistory;

  int get feelsLike => condition.temperature + feelsLikeOffset;

  WeatherSnapshot copyWith({
    WeatherCondition? condition,
    int? windDirectionDegrees,
    int? gustSpeed,
    double? expectedRainMm,
    int? waterTankPercent,
    int? waterStoredLiters,
    String? soilStatusKey,
    int? feelsLikeOffset,
    List<int>? temperatureHistory,
  }) =>
      WeatherSnapshot(
        condition: condition ?? this.condition,
        windDirectionDegrees: windDirectionDegrees ?? this.windDirectionDegrees,
        gustSpeed: gustSpeed ?? this.gustSpeed,
        expectedRainMm: expectedRainMm ?? this.expectedRainMm,
        waterTankPercent: waterTankPercent ?? this.waterTankPercent,
        waterStoredLiters: waterStoredLiters ?? this.waterStoredLiters,
        soilStatusKey: soilStatusKey ?? this.soilStatusKey,
        feelsLikeOffset: feelsLikeOffset ?? this.feelsLikeOffset,
        temperatureHistory: temperatureHistory ?? this.temperatureHistory,
      );

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is WeatherSnapshot &&
          condition == other.condition &&
          windDirectionDegrees == other.windDirectionDegrees &&
          gustSpeed == other.gustSpeed &&
          expectedRainMm == other.expectedRainMm &&
          waterTankPercent == other.waterTankPercent &&
          waterStoredLiters == other.waterStoredLiters &&
          soilStatusKey == other.soilStatusKey &&
          feelsLikeOffset == other.feelsLikeOffset &&
          _sameList(temperatureHistory, other.temperatureHistory);

  @override
  int get hashCode => Object.hash(
        condition,
        windDirectionDegrees,
        gustSpeed,
        expectedRainMm,
        waterTankPercent,
        waterStoredLiters,
        soilStatusKey,
        feelsLikeOffset,
        Object.hashAll(temperatureHistory),
      );
}

bool _sameList<T>(List<T> first, List<T> second) {
  if (first.length != second.length) return false;
  for (var index = 0; index < first.length; index++) {
    if (first[index] != second[index]) return false;
  }
  return true;
}
