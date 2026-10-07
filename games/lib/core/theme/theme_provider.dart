import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

final themeModeProvider = NotifierProvider<ThemeModeNotifier, bool>(
  ThemeModeNotifier.new,
);

class ThemeModeNotifier extends Notifier<bool> {
  static const _preferenceKey = 'farmly.settings.dark_mode';
  bool _hasUserChangedTheme = false;

  @override
  bool build() {
    unawaited(_restore());
    return false;
  }

  void toggle() {
    _hasUserChangedTheme = true;
    state = !state;
    unawaited(_persist(state));
  }

  Future<void> _restore() async {
    final preferences = await SharedPreferences.getInstance();
    if (_hasUserChangedTheme) return;
    state = preferences.getBool(_preferenceKey) ?? false;
  }

  Future<void> _persist(bool isDark) async {
    final preferences = await SharedPreferences.getInstance();
    await preferences.setBool(_preferenceKey, isDark);
  }
}
