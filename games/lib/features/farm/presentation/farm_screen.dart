import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/l10n/locale_provider.dart';
import '../../../core/l10n/localized_labels.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/round_icon_button.dart';
import '../domain/farm_zone.dart';
import 'farm_map_view.dart';
import 'farm_zone_detail_card.dart';
import 'providers/farm_providers.dart';

/// Main farm overview, zone selector, interactive map and selected-zone details.
class FarmScreen extends ConsumerStatefulWidget {
  const FarmScreen({super.key});

  @override
  ConsumerState<FarmScreen> createState() => _FarmScreenState();
}

class _FarmScreenState extends ConsumerState<FarmScreen> {
  late final Map<FarmZone, GlobalKey> _chipKeys = {
    for (final zone in FarmZone.values) zone: GlobalKey(),
  };

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final selectedZone = ref.watch(selectedZoneProvider);
    ref.listen(selectedZoneProvider, (previous, next) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        final chipContext = _chipKeys[next]?.currentContext;
        if (chipContext != null) {
          Scrollable.ensureVisible(
            chipContext,
            duration: const Duration(milliseconds: 350),
            curve: Curves.easeOutCubic,
            alignment: .5,
          );
        }
      });
    });
    return SafeArea(
      bottom: false,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(
              AppSpacing.xl,
              AppSpacing.md,
              AppSpacing.lg,
              AppSpacing.md,
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        l10n.myFarm,
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.xs),
                      Row(
                        children: [
                          const Icon(
                            Icons.location_on_outlined,
                            size: 15,
                            color: AppColors.green,
                          ),
                          const SizedBox(width: AppSpacing.xs),
                          Flexible(
                            child: Text(
                              l10n.farmLocation,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                color: AppColors.muted,
                                fontSize: 12.5,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                RoundIconButton(
                  icon: Icons.eco_outlined,
                  tooltip: l10n.farmStats,
                  onPressed: _showFarmStats,
                ),
                const SizedBox(width: AppSpacing.sm),
                _LanguageToggle(
                  label: Localizations.localeOf(context).languageCode == 'en'
                      ? l10n.switchToArabic
                      : l10n.switchToEnglish,
                  onPressed: ref.read(localeProvider.notifier).toggle,
                ),
              ],
            ),
          ),
          SizedBox(
            height: AppSizes.chipHeight,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              scrollDirection: Axis.horizontal,
              itemCount: FarmZone.values.length,
              separatorBuilder: (context, index) =>
                  const SizedBox(width: AppSpacing.sm),
              itemBuilder: (context, index) {
                final zone = FarmZone.values[index];
                return _ZoneChip(
                  key: _chipKeys[zone],
                  label: zone.label(l10n),
                  icon: _zoneIcon(zone),
                  selected: selectedZone == zone,
                  onTap: () =>
                      ref.read(selectedZoneProvider.notifier).select(zone),
                );
              },
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.lg,
                0,
                AppSpacing.lg,
                AppSpacing.xl,
              ),
              child: Column(
                children: [
                  FarmMapView(onFullscreen: _showFullscreenMap),
                  const SizedBox(height: AppSpacing.md),
                  AnimatedSwitcher(
                    duration: const Duration(milliseconds: 320),
                    switchInCurve: Curves.easeOutCubic,
                    switchOutCurve: Curves.easeIn,
                    transitionBuilder: (child, animation) => FadeTransition(
                      opacity: animation,
                      child: SlideTransition(
                        position: Tween<Offset>(
                          begin: const Offset(0, .04),
                          end: Offset.zero,
                        ).animate(animation),
                        child: child,
                      ),
                    ),
                    child: FarmZoneDetailCard(
                      key: ValueKey(selectedZone),
                      zone: selectedZone,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showFarmStats() {
    final l10n = AppLocalizations.of(context);
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: AppColors.cream,
      showDragHandle: true,
      builder: (context) => Padding(
        padding: const EdgeInsets.fromLTRB(
          AppSpacing.xxl,
          AppSpacing.sm,
          AppSpacing.xxl,
          AppSpacing.xxl,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              l10n.farmStats,
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: AppSpacing.lg),
            Text(l10n.farmSummary),
            const SizedBox(height: AppSpacing.sm),
            Text(
              l10n.sampleUpdated,
              style: const TextStyle(color: AppColors.muted, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }

  void _showFullscreenMap() {
    showDialog<void>(
      context: context,
      barrierColor: AppColors.dark.withValues(alpha: .8),
      builder: (dialogContext) => Dialog.fullscreen(
        backgroundColor: AppColors.cream,
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              children: [
                Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).myFarm,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const Spacer(),
                    RoundIconButton(
                      icon: Icons.close_rounded,
                      tooltip: AppLocalizations.of(context).close,
                      onPressed: () => Navigator.pop(dialogContext),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.md),
                const Expanded(
                  child: Center(
                    child: FarmMapView(showFullscreenButton: false, fullscreen: true),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

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

class _LanguageToggle extends StatelessWidget {
  const _LanguageToggle({required this.label, required this.onPressed});
  final String label;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.white,
      borderRadius: BorderRadius.circular(AppRadius.pill),
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(AppRadius.pill),
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: 10,
          ),
          child: Text(
            label,
            style: const TextStyle(
              color: AppColors.green,
              fontSize: 12,
              fontWeight: FontWeight.w800,
            ),
          ),
        ),
      ),
    );
  }
}

class _ZoneChip extends StatelessWidget {
  const _ZoneChip({
    required this.label,
    required this.icon,
    required this.selected,
    required this.onTap,
    super.key,
  });

  final String label;
  final IconData icon;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 220),
      decoration: BoxDecoration(
        color: selected ? AppColors.dark : AppColors.white,
        borderRadius: BorderRadius.circular(AppRadius.chip),
        border: Border.all(
          color: selected ? AppColors.dark : AppColors.border,
        ),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(AppRadius.chip),
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.md,
              vertical: AppSpacing.sm,
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  icon,
                  size: 15,
                  color: selected ? AppColors.white : AppColors.muted,
                ),
                const SizedBox(width: AppSpacing.xs + 2),
                Text(
                  label,
                  style: TextStyle(
                    color: selected ? AppColors.white : AppColors.dark,
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
