import 'package:shared_preferences/shared_preferences.dart';

import '../domain/auth_user.dart';
import 'auth_repository.dart';

class MockAuthRepository implements AuthRepository {
  const MockAuthRepository();

  static const _userEmailKey = 'farmly.auth.email';
  static const _guestKey = 'farmly.auth.guest';
  static const _onboardingKey = 'farmly.onboarding.seen';

  Future<SharedPreferences> get _preferences =>
      SharedPreferences.getInstance();

  @override
  Future<AuthUser> signIn(
    String email,
    String password, {
    bool keepSignedIn = true,
  }) async {
    _validateCredentials(email, password);
    await Future<void>.delayed(const Duration(milliseconds: 1200));
    final user = AuthUser(email: email.trim());
    final preferences = await _preferences;
    if (keepSignedIn) {
      await preferences.setString(_userEmailKey, user.email);
    } else {
      await preferences.remove(_userEmailKey);
    }
    await preferences.setBool(_guestKey, false);
    await preferences.setBool(_onboardingKey, true);
    return user;
  }

  @override
  Future<AuthUser> signUp(String email, String password) =>
      signIn(email, password);

  @override
  Future<void> signOut() async {
    final preferences = await _preferences;
    await preferences.remove(_userEmailKey);
    await preferences.setBool(_guestKey, false);
  }

  @override
  Future<AuthUser?> currentUser() async {
    final preferences = await _preferences;
    final email = preferences.getString(_userEmailKey);
    return email == null ? null : AuthUser(email: email);
  }

  @override
  Future<bool> isGuest() async {
    final preferences = await _preferences;
    return preferences.getBool(_guestKey) ?? false;
  }

  @override
  Future<void> continueAsGuest() async {
    final preferences = await _preferences;
    await preferences.setBool(_guestKey, true);
    await preferences.setBool(_onboardingKey, true);
  }

  @override
  Future<bool> hasSeenOnboarding() async {
    final preferences = await _preferences;
    return preferences.getBool(_onboardingKey) ?? false;
  }

  @override
  Future<void> markOnboardingSeen() async {
    final preferences = await _preferences;
    await preferences.setBool(_onboardingKey, true);
  }

  void _validateCredentials(String email, String password) {
    final validEmail = RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
        .hasMatch(email.trim());
    if (!validEmail) {
      throw const FormatException('Enter a valid email address.');
    }
    if (password.length < 6) {
      throw const FormatException('Password must be at least 6 characters.');
    }
  }
}
