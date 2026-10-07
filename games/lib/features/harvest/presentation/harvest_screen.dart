import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart' as intl;

import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/formatters.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/section_heading.dart';
import '../domain/harvest_item.dart';
import 'providers/harvest_providers.dart';

class HarvestScreen extends ConsumerWidget {
  const HarvestScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final harvests = ref.watch(harvestProvider);
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(
          AppSpacing.lg,
          AppSpacing.lg,
          AppSpacing.lg,
          AppSpacing.xxl,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              l10n.harvestSchedule,
              style: const TextStyle(
                fontSize: AppTextSize.farmTitle,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: AppSpacing.xs),
            Text(
              l10n.harvestSubtitle,
              style: const TextStyle(color: AppColors.muted),
            ),
            const SizedBox(height: AppSpacing.xl),
            SectionHeading(
              title: l10n.expectedHarvest,
              subtitle: l10n.farmLocation,
            ),
            const SizedBox(height: AppSpacing.md),
            harvests.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) => Text('${l10n.loadFailed}\n$error'),
              data: (items) => Column(
                children: [
                  for (var index = 0; index < items.length; index++)
                    _HarvestTimelineCard(
                      item: items[index],
                      isLast: index == items.length - 1,
                      onMark: () => ref
                          .read(harvestProvider.notifier)
                          .markHarvested(items[index].id),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _HarvestTimelineCard extends StatelessWidget {
  const _HarvestTimelineCard({
    required this.item,
    required this.isLast,
    required this.onMark,
  });

  final HarvestItem item;
  final bool isLast;
  final VoidCallback onMark;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final date = intl.DateFormat.MMMd(
      Localizations.localeOf(context).toLanguageTag(),
    ).format(item.expectedDate);
    final crop = switch (item.crop) {
      HarvestCrop.tomatoes => l10n.tomatoes,
      HarvestCrop.corn => l10n.corn,
      HarvestCrop.lettuce => l10n.lettuce,
    };
    final field = switch (item.fieldNameKey) {
      'tomatoField' => l10n.tomatoField,
      'cornField' => l10n.cornField,
      _ => l10n.vegetableField,
    };
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          SizedBox(
            width: AppSizes.iconButton,
            child: Column(
              children: [
                Container(
                  width: AppSpacing.md,
                  height: AppSpacing.md,
                  decoration: BoxDecoration(
                    color: item.isHarvested
                        ? AppColors.green
                        : AppColors.harvestGold,
                    shape: BoxShape.circle,
                  ),
                  child: item.isHarvested
                      ? const Icon(
                          Icons.check_rounded,
                          color: AppColors.white,
                          size: AppIconSize.small,
                        )
                      : null,
                ),
                if (!isLast)
                  Expanded(
                    child: Container(
                      width: AppSizes.harvestTimelineWidth,
                      color: AppColors.border,
                    ),
                  ),
              ],
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(bottom: AppSpacing.md),
              child: AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            field,
                            style: const TextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: AppTextSize.titleMedium,
                            ),
                          ),
                        ),
                        _HarvestStatus(isHarvested: item.isHarvested),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.xs),
                    Text(
                      '$crop · $date · ${l10n.daysToHarvest(localizedNumber(context, item.daysUntilHarvest))}',
                      style: const TextStyle(
                        color: AppColors.muted,
                        fontSize: AppTextSize.bodySmall,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Row(
                      children: [
                        const Icon(
                          Icons.scale_outlined,
                          color: AppColors.green,
                          size: AppIconSize.medium,
                        ),
                        const SizedBox(width: AppSpacing.xs),
                        Expanded(
                          child: Text(
                            l10n.harvestWeight(
                              localizedNumber(context, item.expectedYieldKg),
                            ),
                            style: const TextStyle(
                              color: AppColors.dark,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                        if (!item.isHarvested)
                          TextButton.icon(
                            onPressed: onMark,
                            icon: const Icon(
                              Icons.check_circle_outline_rounded,
                              size: AppIconSize.medium,
                            ),
                            label: Text(l10n.markHarvested),
                          ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _HarvestStatus extends StatelessWidget {
  const _HarvestStatus({required this.isHarvested});
  final bool isHarvested;

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.sm,
          vertical: AppSpacing.xs,
        ),
        decoration: BoxDecoration(
          color: isHarvested ? AppColors.paleGreen : AppColors.paleYellow,
          borderRadius: BorderRadius.circular(AppRadius.pill),
        ),
        child: Text(
          isHarvested
              ? AppLocalizations.of(context).harvested
              : AppLocalizations.of(context).upcoming,
          style: TextStyle(
            color: isHarvested ? AppColors.green : AppColors.warningText,
            fontSize: AppTextSize.caption,
            fontWeight: FontWeight.w700,
          ),
        ),
      );
}
