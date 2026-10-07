import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/auth_repository.dart';
import '../../data/mock_auth_repository.dart';
import '../../domain/auth_user.dart';

final authRepositoryProvider = Provider<AuthRepository>(
  (ref) => const MockAuthRepository(),
);

final authStateProvider =
    AsyncNotifierProvider<AuthNotifier, AuthSession>(AuthNotifier.new);

class AuthNotifier extends AsyncNotifier<AuthSession> {
  AuthRepository get _repository => ref.read(authRepositoryProvider);

  @override
  Future<AuthSession> build() async {
    final onboardingSeen = await _repository.hasSeenOnboarding();
    final user = await _repository.currentUser();
    return AuthSession(
      onboardingSeen: onboardingSeen,
      user: user,
      isGuest: await _repository.isGuest(),
    );
  }

  Future<void> completeOnboarding() async {
    await _repository.markOnboardingSeen();
    final session = state.requireValue;
    state = AsyncData(session.copyWith(onboardingSeen: true));
  }

  Future<void> continueAsGuest() async {
    await _repository.continueAsGuest();
    final session = state.requireValue;
    state = AsyncData(
      session.copyWith(onboardingSeen: true, clearUser: true, isGuest: true),
    );
  }

  Future<void> signIn(
    String email,
    String password, {
    bool keepSignedIn = true,
  }) async {
    final user = await _repository.signIn(
      email,
      password,
      keepSignedIn: keepSignedIn,
    );
    state = AsyncData(
      state.requireValue.copyWith(
        onboardingSeen: true,
        user: user,
        isGuest: false,
      ),
    );
  }

  Future<void> signUp(String email, String password) async {
    final user = await _repository.signUp(email, password);
    state = AsyncData(
      state.requireValue.copyWith(
        onboardingSeen: true,
        user: user,
        isGuest: false,
      ),
    );
  }

  Future<void> signOut() async {
    await _repository.signOut();
    state = AsyncData(
      state.requireValue.copyWith(clearUser: true, isGuest: false),
    );
  }
}
