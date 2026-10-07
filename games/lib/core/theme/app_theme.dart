import 'package:flutter/material.dart';
import '../constants/app_metrics.dart';
import 'app_colors.dart';

abstract final class AppTheme {
  static ThemeData get light {
    final scheme = ColorScheme.fromSeed(
      seedColor: AppColors.green,
      primary: AppColors.green,
      surface: AppColors.cream,
    );
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: AppColors.cream,
      textTheme: ThemeData.light().textTheme.apply(
            bodyColor: AppColors.dark,
            displayColor: AppColors.dark,
          ),
      extensions: const [
        FarmPalette(
          cream: AppColors.cream,
          green: AppColors.green,
          dark: AppColors.dark,
          muted: AppColors.muted,
          paleGreen: AppColors.paleGreen,
          orange: AppColors.orange,
          blue: AppColors.blue,
          border: AppColors.border,
        ),
      ],
      cardTheme: CardThemeData(
        color: AppColors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.card),
        ),
      ),
      chipTheme: ChipThemeData(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.chip),
        ),
      ),
      navigationBarTheme: const NavigationBarThemeData(
        height: AppSizes.navBar,
        backgroundColor: AppColors.white,
        indicatorColor: AppColors.paleGreen,
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
      ),
    );
  }

  static ThemeData get dark {
    final scheme = ColorScheme.fromSeed(
      seedColor: AppColors.green,
      brightness: Brightness.dark,
      surface: AppColors.darkSurface,
    );
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: scheme,
      scaffoldBackgroundColor: AppColors.darkBackground,
      textTheme: ThemeData.dark().textTheme.apply(
            bodyColor: AppColors.white,
            displayColor: AppColors.white,
          ),
      extensions: const [
        FarmPalette(
          cream: AppColors.darkBackground,
          green: AppColors.green,
          dark: AppColors.white,
          muted: AppColors.iconMuted,
          paleGreen: AppColors.darkSurface,
          orange: AppColors.orange,
          blue: AppColors.blue,
          border: AppColors.darkBorder,
        ),
      ],
      cardTheme: CardThemeData(
        color: AppColors.darkSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.card),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.darkSurface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.chip),
        ),
      ),
      navigationBarTheme: const NavigationBarThemeData(
        height: AppSizes.navBar,
        backgroundColor: AppColors.darkSurface,
        indicatorColor: AppColors.darkBorder,
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
      ),
    );
  }
}
