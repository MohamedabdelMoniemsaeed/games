import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/formatters.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/l10n/localized_labels.dart';
import '../../../core/router/app_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/primary_button.dart';
import '../../../core/widgets/status_pill.dart';
import '../domain/farm_zone.dart';
import 'providers/farm_providers.dart';

/// Renders the selected zone's localized summary and relevant farm actions.
class FarmZoneDetailCard extends ConsumerWidget {
  const FarmZoneDetailCard({required this.zone, super.key});

  final FarmZone zone;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    if (zone == FarmZone.overview) {
      return const _OverviewDetailCard();
    }
    final zones = ref.watch(farmZonesProvider);
    return zones.when(
      loading: () => const AppCard(
        child: Center(child: CircularProgressIndicator()),
      ),
      error: (error, stack) => AppCard(
        child: Text('${l10n.loadFailed}\n$error'),
      ),
      data: (items) {
        FarmZoneInfo? info;
        for (final item in items) {
          if (item.zone == zone) {
            info = item;
            break;
          }
        }
        if (info == null) {
          return AppCard(child: Text(l10n.zoneUnavailable));
        }
        return _DetailCard(info: info);
      },
    );
  }
}

class _OverviewDetailCard extends ConsumerWidget {
  const _OverviewDetailCard();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final summary = ref.watch(farmOverviewProvider);
    return summary.when(
      loading: () => const AppCard(
        child: Center(child: CircularProgressIndicator()),
      ),
      error: (error, stack) => AppCard(
        child: Text('${l10n.loadFailed}\n$error'),
      ),
      data: (overview) => Container(
        width: double.infinity,
        padding: const EdgeInsets.all(AppSpacing.lg),
        decoration: BoxDecoration(
          color: const Color(0xFFE7F1DF),
          borderRadius: BorderRadius.circular(AppRadius.card),
        ),
        child: Row(
          children: [
            const _ZoneIcon(icon: Icons.touch_app_rounded),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    l10n.tapExplore,
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: 15,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    l10n.farmSummaryValues(
                      localizedNumber(context, overview.zoneCount),
                      localizedNumber(context, overview.cropCount),
                      localizedNumber(context, overview.animalCount),
                    ),
                    style: const TextStyle(
                      color: AppColors.muted,
                      fontSize: 12,
                    ),
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

class _DetailCard extends ConsumerWidget {
  const _DetailCard({required this.info});

  final FarmZoneInfo info;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final overview = ref.watch(farmOverviewProvider);
    final title = info.zone.label(l10n);
    final status = switch (info.status) {
      FarmStatus.excellent => l10n.excellent,
      FarmStatus.good => l10n.good,
      FarmStatus.healthy => l10n.healthy,
    };
    return AppCard(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              _ZoneIcon(icon: _zoneIcon(info.zone)),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xxs),
                    Text(
                      _subtitle(l10n, info),
                      style: const TextStyle(
                        fontSize: 11.5,
                        color: AppColors.muted,
                      ),
                    ),
                  ],
                ),
              ),
              StatusPill(
                label: status,
                icon: Icons.favorite_rounded,
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          if (info.growthPercent case final progress?)
            _GrowthProgress(progress: progress)
          else if (info.zone == FarmZone.farmHouse)
            Row(
              children: [
                _MiniStat(label: l10n.size, value: l10n.houseSize),
                _MiniStat(label: l10n.type, value: l10n.residential),
                _MiniStat(label: l10n.rooms, value: l10n.roomsValue),
              ],
            )
          else if (info.zone == FarmZone.animalArea) ...[
            overview.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) => Text('${l10n.loadFailed}\n$error'),
              data: (data) => Row(
                children: [
                  _MiniStat(
                    label: l10n.animals,
                    value: localizedNumber(context, data.animalCount),
                  ),
                  _MiniStat(label: l10n.health, value: l10n.healthPercent),
                  _MiniStat(label: l10n.nextFeed, value: '12:00'),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.md),
            PrimaryButton(
              label: l10n.openLivestock,
              onPressed: () => context.pushNamed(AppRouteNames.livestock),
            ),
          ]
          else if (info.zone == FarmZone.waterTank) ...[
            overview.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) => Text('${l10n.loadFailed}\n$error'),
              data: (data) => Row(
                children: [
                  _MiniStat(
                    label: l10n.level,
                    value: localizedPercent(context, data.waterLevelPercent),
                  ),
                  _MiniStat(
                    label: l10n.stored,
                    value: l10n.litersValue(
                      localizedNumber(context, data.waterStoredLiters),
                    ),
                  ),
                  _MiniStat(
                    label: l10n.usedToday,
                    value: l10n.litersValue(
                      localizedNumber(context, data.waterUsedTodayLiters),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.md),
            PrimaryButton(
              label: l10n.smartWatering,
              icon: Icons.water_drop_outlined,
              onPressed: () => context.pushNamed(AppRouteNames.weather),
            ),
          ],
        ],
      ),
    );
  }

  String _subtitle(AppLocalizations l10n, FarmZoneInfo info) =>
      switch (info.subtitleKey) {
        'houseSubtitle' => l10n.houseSubtitle,
        'cropTomatoes' => l10n.cropTomatoes,
        'cropLettuce' => l10n.cropLettuce,
        'cropCorn' => l10n.cropCorn,
        'animalsSubtitle' => l10n.animalsSubtitle,
        'waterSubtitle' => l10n.waterSubtitle,
        _ => l10n.farmOverview,
      };

  IconData _zoneIcon(FarmZone zone) => switch (zone) {
        FarmZone.overview => Icons.grid_view_rounded,
        FarmZone.farmHouse => Icons.home_rounded,
        FarmZone.tomatoField => Icons.eco_rounded,
        FarmZone.vegetableField => Icons.grass_rounded,
        FarmZone.cornField => Icons.grain_rounded,
        FarmZone.animalArea => Icons.pets_rounded,
        FarmZone.waterTank => Icons.water_drop_rounded,
      };

}

class _GrowthProgress extends StatelessWidget {
  const _GrowthProgress({required this.progress});
  final int progress;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                l10n.growth,
                style: const TextStyle(
                  fontSize: 12,
                  color: AppColors.muted,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Text(
              localizedPercent(context, progress),
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w800,
                color: AppColors.green,
              ),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.sm),
        TweenAnimationBuilder<double>(
          tween: Tween<double>(begin: 0, end: progress / 100),
          duration: const Duration(milliseconds: 750),
          curve: Curves.easeOutCubic,
          builder: (context, value, child) => ClipRRect(
            borderRadius: BorderRadius.circular(AppRadius.small),
            child: LinearProgressIndicator(
              value: value,
              minHeight: 8,
              backgroundColor: const Color(0xFFEAF0E9),
              color: AppColors.green,
            ),
          ),
        ),
      ],
    );
  }
}

class _ZoneIcon extends StatelessWidget {
  const _ZoneIcon({required this.icon});
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 42,
      height: 42,
      decoration: const BoxDecoration(
        color: AppColors.paleGreen,
        shape: BoxShape.circle,
      ),
      child: Icon(icon, color: AppColors.green, size: 21),
    );
  }
}

class _MiniStat extends StatelessWidget {
  const _MiniStat({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(color: AppColors.muted, fontSize: 10),
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            value,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: AppColors.dark,
              fontSize: 12,
              fontWeight: FontWeight.w800,
            ),
          ),
        ],
      ),
    );
  }
}
