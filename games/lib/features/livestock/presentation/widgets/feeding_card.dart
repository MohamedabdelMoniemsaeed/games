import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/constants/app_metrics.dart';
import '../../../../core/l10n/formatters.dart';
import '../../../../core/l10n/generated/app_localizations.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/widgets/app_card.dart';
import '../../domain/animal.dart';
import '../providers/livestock_providers.dart';

/// Displays the day's three feeding times in a mirrored horizontal timeline.
class FeedingCard extends ConsumerWidget {
  const FeedingCard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final schedule = ref.watch(feedingScheduleProvider);
    final isRtl = Directionality.of(context) == TextDirection.rtl;
    return schedule.when(
      loading: () =>
          const AppCard(child: Center(child: CircularProgressIndicator())),
      error: (error, stack) =>
          AppCard(child: Text('${l10n.loadFailed}\n$error')),
      data: (entries) => AppCard(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          children: [
            Row(
              children: [
                const _FeedIcon(),
                const SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Text(
                    l10n.todaysFeeding,
                    style: const TextStyle(
                      fontSize: AppTextSize.titleMedium,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.sm,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.timelineWarm,
                    borderRadius: BorderRadius.circular(AppRadius.pill),
                  ),
                  child: Text(
                    l10n.completedFeedingCount(
                      localizedNumber(
                        context,
                        entries.where((entry) => entry.isComplete).length,
                      ),
                      localizedNumber(context, entries.length),
                    ),
                    style: const TextStyle(
                      color: AppColors.timelineWarmText,
                      fontWeight: FontWeight.w700,
                      fontSize: AppTextSize.caption,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.lg),
            SizedBox(
              height: 25,
              child: CustomPaint(
                painter: _FeedingTrackPainter(rtl: isRtl),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: List.generate(
                    entries.length,
                    (index) => _StepDot(done: entries[index].isComplete),
                  ),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: entries.map((entry) {
                final done = entry.isComplete;
                return Expanded(
                  child: Column(
                    children: [
                      Text(
                        entry.time,
                        style: const TextStyle(
                          fontSize: AppTextSize.bodySmall,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.xxs),
                      Text(
                        _feedTitle(l10n, entry.type),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: AppColors.muted,
                          fontSize: AppTextSize.tiny,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.xxs),
                      Text(
                        done ? l10n.done : l10n.upcoming,
                        style: TextStyle(
                          color: done ? AppColors.green : AppColors.orange,
                          fontSize: AppTextSize.tiny,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }

  String _feedTitle(AppLocalizations l10n, FeedType type) => switch (type) {
    FeedType.haySilage => l10n.haySilage,
    FeedType.grainMix => l10n.grainMix,
    FeedType.eveningFeed => l10n.eveningFeed,
  };
}

class _FeedIcon extends StatelessWidget {
  const _FeedIcon();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: AppSizes.feedIcon,
      height: AppSizes.feedIcon,
      decoration: const BoxDecoration(
        color: AppColors.paleGreen,
        shape: BoxShape.circle,
      ),
      child: const Icon(
        Icons.restaurant_rounded,
        color: AppColors.green,
        size: 18,
      ),
    );
  }
}

class _StepDot extends StatelessWidget {
  const _StepDot({required this.done});
  final bool done;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 350),
      width: AppSizes.feedDot,
      height: AppSizes.feedDot,
      decoration: BoxDecoration(
        color: done ? AppColors.green : AppColors.white,
        shape: BoxShape.circle,
        border: Border.all(
          color: done ? AppColors.green : AppColors.timelineDotBorder,
          width: 2,
        ),
      ),
      child: done
          ? const Icon(Icons.check_rounded, size: 14, color: AppColors.white)
          : null,
    );
  }
}

class _FeedingTrackPainter extends CustomPainter {
  const _FeedingTrackPainter({required this.rtl});
  final bool rtl;

  @override
  void paint(Canvas canvas, Size size) {
    final points = [
      Offset(size.width / 6, size.height / 2),
      Offset(size.width / 2, size.height / 2),
      Offset(size.width * 5 / 6, size.height / 2),
    ];
    for (var index = 0; index < points.length - 1; index++) {
      final start = rtl ? points[points.length - 1 - index] : points[index];
      final end = rtl ? points[points.length - 2 - index] : points[index + 1];
      canvas.drawLine(
        start,
        end,
        Paint()
          ..color = index == 0
              ? AppColors.green.withValues(alpha: .72)
              : AppColors.timelineTrack
          ..strokeWidth = 3
          ..strokeCap = StrokeCap.round,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _FeedingTrackPainter oldDelegate) =>
      oldDelegate.rtl != rtl;
}
