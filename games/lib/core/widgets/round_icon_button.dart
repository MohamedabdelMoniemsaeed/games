import 'package:flutter/material.dart';
import '../constants/app_metrics.dart';
import '../theme/app_colors.dart';

/// A circular icon action following the app's compact header style.
class RoundIconButton extends StatelessWidget {
  const RoundIconButton({
    required this.icon,
    required this.onPressed,
    this.tooltip,
    this.background = AppColors.white,
    super.key,
  });

  final IconData icon;
  final VoidCallback onPressed;
  final String? tooltip;
  final Color background;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: background,
      shape: const CircleBorder(),
      child: IconButton(
        onPressed: onPressed,
        tooltip: tooltip,
        icon: Icon(icon, color: AppColors.dark, size: 20),
        constraints: const BoxConstraints.tightFor(
          width: AppSizes.iconButton,
          height: AppSizes.iconButton,
        ),
        padding: EdgeInsets.zero,
      ),
    );
  }
}
