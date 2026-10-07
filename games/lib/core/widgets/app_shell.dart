import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../l10n/generated/app_localizations.dart';
import '../router/app_router.dart';
import '../theme/app_colors.dart';

/// The persistent five-destination navigation shell for the main tabs.
class AppShell extends StatelessWidget {
  const AppShell({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final routePath = GoRouterState.of(context).uri.path;
    final selectedIndex = switch (routePath) {
      AppRoutePaths.home => 0,
      AppRoutePaths.farm => 1,
      AppRoutePaths.analytics => 2,
      AppRoutePaths.harvest => 3,
      AppRoutePaths.profile => 4,
      _ => 1,
    };
    final labels = [
      l10n.home,
      l10n.farm,
      l10n.analytics,
      l10n.harvest,
      l10n.profile,
    ];
    const outlineIcons = [
      Icons.home_outlined,
      Icons.agriculture_outlined,
      Icons.analytics_outlined,
      Icons.spa_outlined,
      Icons.person_outline_rounded,
    ];
    const selectedIcons = [
      Icons.home_rounded,
      Icons.agriculture_rounded,
      Icons.analytics_rounded,
      Icons.spa_rounded,
      Icons.person_rounded,
    ];
    const routes = [
      AppRoutePaths.home,
      AppRoutePaths.farm,
      AppRoutePaths.analytics,
      AppRoutePaths.harvest,
      AppRoutePaths.profile,
    ];
    return Scaffold(
      body: child,
      bottomNavigationBar: NavigationBar(
        selectedIndex: selectedIndex,
        onDestinationSelected: (index) => context.go(routes[index]),
        destinations: List.generate(
          labels.length,
          (index) => NavigationDestination(
            icon: Icon(outlineIcons[index]),
            selectedIcon: Icon(selectedIcons[index], color: AppColors.green),
            label: labels[index],
          ),
        ),
      ),
    );
  }
}
