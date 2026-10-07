import 'package:flutter/material.dart';
import '../constants/app_metrics.dart';
import '../theme/app_colors.dart';

/// A full-width primary action button with a directional icon.
class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    required this.label,
    required this.onPressed,
    this.icon = Icons.arrow_forward_rounded,
    this.trailingIcon,
    this.isLoading = false,
    super.key,
  });

  final String label;
  final VoidCallback? onPressed;
  final IconData icon;
  final IconData? trailingIcon;
  final bool isLoading;

  @override
  Widget build(BuildContext context) {
    final rtl = Directionality.of(context) == TextDirection.rtl;
    final useTrailingIcon = trailingIcon != null;
    final defaultDirectionalIcon = icon == Icons.arrow_forward_rounded && rtl
        ? Icons.arrow_back_rounded
        : icon;
    return SizedBox(
      width: double.infinity,
      child: FilledButton(
        style: FilledButton.styleFrom(
          backgroundColor: AppColors.green,
          foregroundColor: AppColors.white,
          minimumSize: const Size.fromHeight(AppSizes.primaryButtonHeight),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppRadius.button),
          ),
        ),
        onPressed: onPressed,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isLoading)
              const SizedBox(
                width: AppIconSize.medium,
                height: AppIconSize.medium,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: AppColors.white,
                ),
              )
            else if (!useTrailingIcon)
              Icon(defaultDirectionalIcon, size: AppIconSize.small),
            const SizedBox(width: AppSpacing.sm),
            Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w700,
                fontSize: AppTextSize.body,
              ),
            ),
            if (useTrailingIcon && !isLoading) ...[
              const SizedBox(width: AppSpacing.sm),
              Icon(
                rtl && trailingIcon == Icons.arrow_forward_rounded
                    ? Icons.arrow_back_rounded
                    : trailingIcon,
                size: AppIconSize.small,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
