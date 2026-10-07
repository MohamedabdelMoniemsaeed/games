import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/analytics/presentation/analytics_screen.dart';
import '../../features/auth/presentation/auth_flow_screens.dart';
import '../../features/auth/presentation/providers/auth_provider.dart';
import '../../features/farm/presentation/farm_screen.dart';
import '../../features/harvest/presentation/harvest_screen.dart';
import '../../features/home/presentation/home_screen.dart';
import '../../features/livestock/presentation/animal_detail_screen.dart';
import '../../features/livestock/presentation/livestock_screen.dart';
import '../../features/profile/presentation/profile_screen.dart';
import '../../features/weather/presentation/weather_screen.dart';
import '../widgets/app_shell.dart';

/// Stable route paths used by deep links and bottom navigation.
abstract final class AppRoutePaths {
  static const splash = '/splash';
  static const onboarding = '/onboarding';
  static const login = '/login';
  static const createAccount = '/create-account';
  static const home = '/home';
  static const farm = '/farm';
  static const analytics = '/analytics';
  static const harvest = '/harvest';
  static const profile = '/profile';
  static const livestock = '/livestock';
  static const animalDetail = '/livestock/animal/:tag';
  static const weather = '/weather';
}

/// Stable names used for typed navigation to feature routes.
abstract final class AppRouteNames {
  static const splash = 'splash';
  static const onboarding = 'onboarding';
  static const login = 'login';
  static const createAccount = 'create-account';
  static const home = 'home';
  static const farm = 'farm';
  static const analytics = 'analytics';
  static const harvest = 'harvest';
  static const profile = 'profile';
  static const livestock = 'livestock';
  static const animalDetail = 'animal-detail';
  static const weather = 'weather';
}

final appRouterProvider = Provider<GoRouter>((ref) {
  final refresh = ValueNotifier<int>(0);
  ref.listen(authStateProvider, (previous, next) {
    refresh.value++;
  });
  ref.onDispose(refresh.dispose);
  final router = GoRouter(
    initialLocation: AppRoutePaths.splash,
    refreshListenable: refresh,
    redirect: (context, state) {
      final location = state.matchedLocation;
      final isAuthScreen = location == AppRoutePaths.onboarding ||
          location == AppRoutePaths.login ||
          location == AppRoutePaths.createAccount;
      final auth = ref.read(authStateProvider);
      final session = auth.asData?.value;
      if (session == null) {
        return location == AppRoutePaths.splash ? null : AppRoutePaths.splash;
      }
      if (!session.onboardingSeen) {
        return location == AppRoutePaths.splash ||
                location == AppRoutePaths.onboarding
            ? null
            : AppRoutePaths.onboarding;
      }
      if (!session.isAuthenticated) {
        return location == AppRoutePaths.splash ||
                location == AppRoutePaths.login ||
                location == AppRoutePaths.createAccount
            ? null
            : AppRoutePaths.login;
      }
      if (isAuthScreen) return AppRoutePaths.home;
      return null;
    },
    routes: [
      GoRoute(
        path: AppRoutePaths.splash,
        name: AppRouteNames.splash,
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: AppRoutePaths.onboarding,
        name: AppRouteNames.onboarding,
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: AppRoutePaths.login,
        name: AppRouteNames.login,
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: AppRoutePaths.createAccount,
        name: AppRouteNames.createAccount,
        builder: (context, state) => const CreateAccountScreen(),
      ),
      ShellRoute(
        builder: (context, state, child) => AppShell(child: child),
        routes: [
          GoRoute(
            path: AppRoutePaths.home,
            name: AppRouteNames.home,
            builder: (context, state) => const HomeScreen(),
          ),
          GoRoute(
            path: AppRoutePaths.farm,
            name: AppRouteNames.farm,
            builder: (context, state) => const FarmScreen(),
          ),
          GoRoute(
            path: AppRoutePaths.analytics,
            name: AppRouteNames.analytics,
            builder: (context, state) => const AnalyticsScreen(),
          ),
          GoRoute(
            path: AppRoutePaths.harvest,
            name: AppRouteNames.harvest,
            builder: (context, state) => const HarvestScreen(),
          ),
          GoRoute(
            path: AppRoutePaths.profile,
            name: AppRouteNames.profile,
            builder: (context, state) => const ProfileScreen(),
          ),
        ],
      ),
      GoRoute(
        path: AppRoutePaths.livestock,
        name: AppRouteNames.livestock,
        builder: (context, state) => const LivestockScreen(),
      ),
      GoRoute(
        path: AppRoutePaths.animalDetail,
        name: AppRouteNames.animalDetail,
        builder: (context, state) => AnimalDetailScreen(
          tag: state.pathParameters['tag']!,
        ),
      ),
      GoRoute(
        path: AppRoutePaths.weather,
        name: AppRouteNames.weather,
        builder: (context, state) => const WeatherScreen(),
      ),
      GoRoute(
        path: '/',
        redirect: (context, state) => AppRoutePaths.splash,
      ),
    ],
  );
  ref.onDispose(router.dispose);
  return router;
});
