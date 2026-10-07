import 'dart:async';

import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

final localeProvider = NotifierProvider<LocaleNotifier, Locale>(
  LocaleNotifier.new,
);

class LocaleNotifier extends Notifier<Locale> {
  static const _preferenceKey = 'farmly.settings.locale';
  bool _hasUserChangedLocale = false;

  @override
  Locale build() {
    unawaited(_restore());
    return const Locale('en');
  }

  void toggle() {
    _hasUserChangedLocale = true;
    state = state.languageCode == 'en'
        ? const Locale('ar')
        : const Locale('en');
    unawaited(_persist(state.languageCode));
  }

  Future<void> _restore() async {
    final preferences = await SharedPreferences.getInstance();
    if (_hasUserChangedLocale) return;
    final languageCode = preferences.getString(_preferenceKey);
    if (languageCode == 'en' || languageCode == 'ar') {
      state = Locale(languageCode!);
    }
  }

  Future<void> _persist(String languageCode) async {
    final preferences = await SharedPreferences.getInstance();
    await preferences.setString(_preferenceKey, languageCode);
  }
}
