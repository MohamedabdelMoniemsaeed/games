class AuthUser {
  const AuthUser({required this.email});

  final String email;

  AuthUser copyWith({String? email}) => AuthUser(email: email ?? this.email);

  @override
  bool operator ==(Object other) =>
      identical(this, other) || other is AuthUser && email == other.email;

  @override
  int get hashCode => email.hashCode;
}

class AuthSession {
  const AuthSession({
    required this.onboardingSeen,
    this.user,
    this.isGuest = false,
  });

  final bool onboardingSeen;
  final AuthUser? user;
  final bool isGuest;

  bool get isAuthenticated => user != null || isGuest;

  AuthSession copyWith({
    bool? onboardingSeen,
    AuthUser? user,
    bool clearUser = false,
    bool? isGuest,
  }) =>
      AuthSession(
        onboardingSeen: onboardingSeen ?? this.onboardingSeen,
        user: clearUser ? null : user ?? this.user,
        isGuest: isGuest ?? this.isGuest,
      );

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AuthSession &&
          onboardingSeen == other.onboardingSeen &&
          user == other.user &&
          isGuest == other.isGuest;

  @override
  int get hashCode => Object.hash(onboardingSeen, user, isGuest);
}
