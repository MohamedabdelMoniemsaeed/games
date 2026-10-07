import '../domain/weather_data.dart';
import 'weather_repository.dart';

class MockWeatherRepository implements WeatherRepository {
  const MockWeatherRepository();

  @override
  Future<WeatherSnapshot> getCurrentWeather() async =>
      const WeatherSnapshot(
        condition: WeatherCondition.sunny,
        windDirectionDegrees: 240,
        gustSpeed: 18,
        expectedRainMm: 0,
        waterTankPercent: 92,
        waterStoredLiters: 9200,
        soilStatusKey: 'wellWatered',
        feelsLikeOffset: 1,
        temperatureHistory: [22, 24, 23, 27, 26, 29, 28],
      );
}
