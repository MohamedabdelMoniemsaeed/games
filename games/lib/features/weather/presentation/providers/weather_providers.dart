import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/mock_weather_repository.dart';
import '../../data/weather_repository.dart';
import '../../domain/weather_data.dart';

final weatherRepositoryProvider = Provider<WeatherRepository>(
  (ref) => const MockWeatherRepository(),
);

final weatherProvider =
    AsyncNotifierProvider<WeatherNotifier, WeatherSnapshot>(
  WeatherNotifier.new,
);

class WeatherNotifier extends AsyncNotifier<WeatherSnapshot> {
  Timer? _timer;
  bool _cycling = true;

  @override
  Future<WeatherSnapshot> build() async {
    ref.onDispose(() => _timer?.cancel());
    final initial = await ref.watch(weatherRepositoryProvider).getCurrentWeather();
    _startCycling();
    return initial;
  }

  void toggleDemo() {
    if (!_cycling) {
      _cycling = true;
      _startCycling();
    } else {
      _cycling = false;
      _timer?.cancel();
      _timer = null;
    }
  }

  void refresh() {
    final current = state.asData?.value;
    if (current == null) {
      ref.invalidateSelf();
      return;
    }
    state = AsyncData(_nextSnapshot(current, current.condition.next));
  }

  void _startCycling() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 5), (_) {
      final current = state.asData?.value;
      if (current != null) {
        state = AsyncData(_nextSnapshot(current, current.condition.next));
      }
    });
  }

  WeatherSnapshot _nextSnapshot(
    WeatherSnapshot current,
    WeatherCondition condition,
  ) {
    final history = [
      ...current.temperatureHistory.skip(1),
      condition.temperature,
    ];
    return current.copyWith(
      condition: condition,
      temperatureHistory: List.unmodifiable(history),
      expectedRainMm: condition == WeatherCondition.rainshower ? 8.0 : 0.0,
      soilStatusKey: condition == WeatherCondition.rainshower ||
              condition == WeatherCondition.clearingUp
          ? 'wellWatered'
          : 'moistureGood',
      windDirectionDegrees: switch (condition) {
        WeatherCondition.sunny => 240,
        WeatherCondition.clouds => 200,
        WeatherCondition.wind => 315,
        WeatherCondition.rainshower => 190,
        WeatherCondition.clearingUp => 225,
      },
      gustSpeed: condition == WeatherCondition.wind ? 42 : 18,
      waterTankPercent: condition == WeatherCondition.rainshower
          ? 94
          : current.waterTankPercent,
      waterStoredLiters: condition == WeatherCondition.rainshower
          ? 9400
          : current.waterStoredLiters,
    );
  }
}
