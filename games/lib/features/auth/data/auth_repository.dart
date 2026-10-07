import '../domain/auth_user.dart';

abstract interface class AuthRepository {
  Future<AuthUser> signIn(
    String email,
    String password, {
    bool keepSignedIn = true,
  });
  Future<AuthUser> signUp(String email, String password);
  Future<void> signOut();
  Future<AuthUser?> currentUser();
  Future<bool> isGuest();
  Future<void> continueAsGuest();
  Future<bool> hasSeenOnboarding();
  Future<void> markOnboardingSeen();
}
