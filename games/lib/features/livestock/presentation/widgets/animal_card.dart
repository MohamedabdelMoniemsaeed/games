import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/constants/app_metrics.dart';
import '../../../../core/l10n/formatters.dart';
import '../../../../core/l10n/generated/app_localizations.dart';
import '../../../../core/l10n/localized_labels.dart';
import '../../../../core/router/app_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/widgets/app_card.dart';
import '../../../../core/widgets/status_pill.dart';
import '../../domain/animal.dart';

/// A localized animal row with identifier, age and health.
class AnimalCard extends StatelessWidget {
  const AnimalCard({required this.animal, super.key});

  final Animal animal;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final isLowHealth = animal.healthPercent < 80;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => context.pushNamed(
          AppRouteNames.animalDetail,
          pathParameters: {'tag': animal.tag},
        ),
        borderRadius: BorderRadius.circular(AppRadius.card),
        child: AppCard(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.md,
      ),
      child: Row(
        children: [
          _AnimalAvatar(category: animal.category),
          const SizedBox(width: AppSpacing.sm + 2),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  animal.localizedName(l10n),
                  style: const TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: AppTextSize.titleSmall,
                  ),
                ),
                const SizedBox(height: AppSpacing.xxs),
                Text(
                  animal.localizedBreed(l10n),
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: AppColors.muted,
                    fontSize: AppTextSize.caption,
                  ),
                ),
                const SizedBox(height: AppSpacing.xs),
                Wrap(
                  spacing: AppSpacing.xs,
                  runSpacing: AppSpacing.xxs,
                  children: [
                    _AnimalTag(text: animal.tag),
                    _AnimalTag(text: _ageLabel(l10n, animal.ageMonths)),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(width: AppSpacing.xs),
          StatusPill(
            label: localizedPercent(context, animal.healthPercent),
            warning: isLowHealth,
            icon: Icons.favorite_rounded,
          ),
          Icon(
            Directionality.of(context) == TextDirection.rtl
                ? Icons.chevron_left_rounded
                : Icons.chevron_right_rounded,
            color: AppColors.iconMuted,
            size: AppIconSize.medium,
          ),
        ],
      ),
        ),
      ),
    );
  }

  String _ageLabel(AppLocalizations l10n, int ageMonths) {
    if (ageMonths == 18) return l10n.oneAndHalfYears;
    if (ageMonths == 12) return l10n.oneYear;
    return l10n.yearsCount((ageMonths ~/ 12).toString());
  }
}

class _AnimalAvatar extends StatelessWidget {
  const _AnimalAvatar({required this.category});
  final AnimalCategory category;

  @override
  Widget build(BuildContext context) {
    final emoji = switch (category) {
      AnimalCategory.cows => '🐄',
      AnimalCategory.chickens => '🐔',
      AnimalCategory.sheep => '🐑',
      AnimalCategory.goats => '🐐',
    };
    return Container(
      width: AppSizes.animalAvatar,
      height: AppSizes.animalAvatar,
      decoration: BoxDecoration(
        color: AppColors.animalAvatar,
        borderRadius: BorderRadius.circular(AppRadius.animalAvatar),
      ),
      alignment: Alignment.center,
      child: Text(
        emoji,
        style: const TextStyle(fontSize: AppTextSize.animalAvatarEmoji),
      ),
    );
  }
}

class _AnimalTag extends StatelessWidget {
  const _AnimalTag({required this.text});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm - 2,
        vertical: AppSpacing.xxs + 1,
      ),
      decoration: BoxDecoration(
        color: AppColors.surfaceMuted,
        borderRadius: BorderRadius.circular(AppRadius.small),
      ),
      child: Text(
        text,
        style: const TextStyle(
          fontSize: AppTextSize.micro,
          color: AppColors.muted,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
