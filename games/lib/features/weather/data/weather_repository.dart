import '../domain/weather_data.dart';

abstract interface class WeatherRepository {
  Future<WeatherSnapshot> getCurrentWeather();
}
