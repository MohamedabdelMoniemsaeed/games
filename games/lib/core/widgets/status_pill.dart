import 'package:flutter/material.dart';
import '../constants/app_metrics.dart';
import '../theme/app_colors.dart';

/// A compact positive or caution status badge.
class StatusPill extends StatelessWidget {
  const StatusPill({
    required this.label,
    this.warning = false,
    this.icon = Icons.check_circle_rounded,
    super.key,
  });

  final String label;
  final bool warning;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final color = warning ? AppColors.orange : AppColors.green;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 6),
      decoration: BoxDecoration(
        color: warning ? const Color(0xFFFFF2DF) : AppColors.paleGreen,
        borderRadius: BorderRadius.circular(AppRadius.pill),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: color),
          const SizedBox(width: AppSpacing.xs),
          Text(
            label,
            style: TextStyle(
              color: color,
              fontSize: 10,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}
