import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../../../core/constants/app_metrics.dart';
import '../../../../core/l10n/formatters.dart';
import '../../../../core/l10n/generated/app_localizations.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/widgets/app_card.dart';
import '../../../../core/widgets/status_pill.dart';
import '../../domain/animal.dart';

/// Summarizes herd size, health, feed reserves and production.
class HerdSummaryCard extends StatelessWidget {
  const HerdSummaryCard({required this.summary, super.key});

  final HerdSummary summary;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return AppCard(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      l10n.totalHerd,
                      style: const TextStyle(
                        color: AppColors.muted,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1,
                        fontSize: AppTextSize.caption,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xs),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.baseline,
                      textBaseline: TextBaseline.alphabetic,
                      children: [
                        Text(
                          localizedNumber(context, summary.total),
                          style: const TextStyle(
                            fontSize: AppTextSize.totalCount,
                            height: 1,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        const SizedBox(width: AppSpacing.sm),
                        Text(
                          l10n.animals,
                          style: const TextStyle(
                            color: AppColors.muted,
                            fontSize: AppTextSize.titleSmall,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              StatusPill(label: l10n.allHealthy, icon: Icons.favorite_rounded),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          const Divider(height: 1),
          const SizedBox(height: AppSpacing.md),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _HerdMetric(
                percent: summary.healthPercent,
                title: l10n.health,
                caption: l10n.excellent,
                color: AppColors.green,
              ),
              _HerdMetric(
                percent: summary.feedPercent,
                title: l10n.feed,
                caption: l10n.twelveDaysStock,
                color: AppColors.orange,
              ),
              _HerdMetric(
                percent: summary.productionPercent,
                title: l10n.production,
                caption: l10n.onTarget,
                color: AppColors.blue,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _HerdMetric extends StatelessWidget {
  const _HerdMetric({
    required this.percent,
    required this.title,
    required this.caption,
    required this.color,
  });

  final int percent;
  final String title;
  final String caption;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween<double>(begin: 0, end: percent / 100),
      duration: const Duration(milliseconds: 850),
      curve: Curves.easeOutCubic,
      builder: (context, progress, child) => Column(
        children: [
          SizedBox(
            width: AppSizes.ring,
            height: AppSizes.ring,
            child: CustomPaint(
              painter: _RingPainter(progress: progress, color: color),
              child: Center(
                child: Text(
                  localizedPercent(context, percent),
                  style: const TextStyle(
                    fontSize: AppTextSize.body,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            title,
            style: const TextStyle(
              fontSize: AppTextSize.bodySmall,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: AppSpacing.xxs),
          Text(
            caption,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: AppTextSize.tiny,
              color: AppColors.muted,
            ),
          ),
        ],
      ),
    );
  }
}

class _RingPainter extends CustomPainter {
  const _RingPainter({required this.progress, required this.color});

  final double progress;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final rect = Rect.fromCircle(center: center, radius: size.width * .42);
    final background = Paint()
      ..color = AppColors.ringTrack
      ..style = PaintingStyle.stroke
      ..strokeWidth = AppSizes.ringStroke
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(rect, -math.pi / 2, math.pi * 2, false, background);
    canvas.drawArc(
      rect,
      -math.pi / 2,
      math.pi * 2 * progress,
      false,
      Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = AppSizes.ringStroke
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(covariant _RingPainter oldDelegate) =>
      oldDelegate.progress != progress || oldDelegate.color != color;
}
