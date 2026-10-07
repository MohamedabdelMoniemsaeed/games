import 'package:flutter/material.dart';

import '../../../../core/constants/app_metrics.dart';
import '../../../../core/l10n/formatters.dart';
import '../../../../core/l10n/generated/app_localizations.dart';
import '../../../../core/l10n/localized_labels.dart';
import '../../../../core/theme/app_colors.dart';
import '../../domain/animal.dart';

/// A compact selectable tile for an animal group.
class AnimalCategoryTile extends StatelessWidget {
  const AnimalCategoryTile({
    required this.category,
    required this.count,
    required this.selected,
    required this.onTap,
    super.key,
  });

  final AnimalCategory category;
  final int count;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 220),
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.xs,
          vertical: AppSpacing.sm,
        ),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(AppRadius.category),
          border: Border.all(
            color: selected ? AppColors.green : AppColors.border,
            width: selected ? 1.8 : 1,
          ),
          boxShadow: selected
              ? [
                  BoxShadow(
                    color: AppColors.green.withValues(alpha: .08),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ]
              : null,
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              _emoji(category),
              style: const TextStyle(fontSize: AppTextSize.animalEmoji),
            ),
            const SizedBox(height: AppSpacing.xxs),
            Text(
              localizedNumber(context, count),
              style: TextStyle(
                color: selected ? AppColors.green : AppColors.dark,
                fontSize: selected
                    ? AppTextSize.headlineSmall
                    : AppTextSize.titleLarge,
                fontWeight: FontWeight.w800,
              ),
            ),
            Text(
              category.title(l10n),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: AppTextSize.tiny,
                color: AppColors.muted,
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _emoji(AnimalCategory value) => switch (value) {
    AnimalCategory.cows => '🐄',
    AnimalCategory.chickens => '🐔',
    AnimalCategory.sheep => '🐑',
    AnimalCategory.goats => '🐐',
  };
}
