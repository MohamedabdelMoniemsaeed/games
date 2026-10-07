import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/formatters.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/section_heading.dart';
import '../domain/analytics_data.dart';
import 'providers/analytics_providers.dart';

class AnalyticsScreen extends ConsumerWidget {
  const AnalyticsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final selected = ref.watch(analyticsPeriodProvider);
    final data = ref.watch(analyticsDataProvider);
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
              l10n.analytics,
              style: const TextStyle(
                fontSize: AppTextSize.farmTitle,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: AppSpacing.md),
            SegmentedButton<AnalyticsPeriod>(
              segments: [
                ButtonSegment(
                  value: AnalyticsPeriod.week,
                  label: Text(l10n.analyticsPeriodWeek),
                ),
                ButtonSegment(
                  value: AnalyticsPeriod.month,
                  label: Text(l10n.analyticsPeriodMonth),
                ),
                ButtonSegment(
                  value: AnalyticsPeriod.season,
                  label: Text(l10n.analyticsPeriodSeason),
                ),
              ],
              selected: {selected},
              onSelectionChanged: (values) => ref
                  .read(analyticsPeriodProvider.notifier)
                  .select(values.first),
            ),
            const SizedBox(height: AppSpacing.lg),
            data.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) => Text('${l10n.loadFailed}\n$error'),
              data: (analytics) => AnimatedSwitcher(
                duration: AppAnimation.standard,
                child: Column(
                  key: ValueKey(selected),
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: _SummaryCard(
                            icon: Icons.agriculture_rounded,
                            label: l10n.avgYield,
                            value: l10n.harvestWeight(
                              localizedNumber(context, analytics.totalYield),
                            ),
                            change: analytics.yieldChangePercent,
                          ),
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: _SummaryCard(
                            icon: Icons.water_drop_rounded,
                            label: l10n.waterEfficiency,
                            value: localizedPercent(
                              context,
                              analytics.waterEfficiency,
                            ),
                            change: 5,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.md),
                    _SummaryCard(
                      icon: Icons.eco_rounded,
                      label: l10n.farmScore,
                      value: localizedPercent(context, analytics.farmScore),
                      change: 3,
                      wide: true,
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    SectionHeading(title: l10n.productionOverview),
                    const SizedBox(height: AppSpacing.md),
                    _ChartCard(
                      title: l10n.production,
                      chart: _LineChart(values: analytics.productionValues),
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    SectionHeading(title: l10n.cropComparison),
                    const SizedBox(height: AppSpacing.md),
                    _ChartCard(
                      title: l10n.analyticsYield,
                      chart: _CropBarChart(values: analytics.cropYields),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SummaryCard extends StatelessWidget {
  const _SummaryCard({
    required this.icon,
    required this.label,
    required this.value,
    required this.change,
    this.wide = false,
  });

  final IconData icon;
  final String label;
  final String value;
  final int change;
  final bool wide;

  @override
  Widget build(BuildContext context) => AppCard(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Row(
          children: [
            Icon(icon, color: AppColors.green, size: AppIconSize.large),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: const TextStyle(
                      color: AppColors.muted,
                      fontSize: AppTextSize.caption,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    value,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: AppColors.dark,
                      fontWeight: FontWeight.w800,
                      fontSize: AppTextSize.titleMedium,
                    ),
                  ),
                ],
              ),
            ),
            if (wide) _TrendLabel(change: change),
          ],
        ),
      );
}

class _TrendLabel extends StatelessWidget {
  const _TrendLabel({required this.change});
  final int change;

  @override
  Widget build(BuildContext context) => Text(
        '+${localizedPercent(context, change)}',
        style: const TextStyle(
          color: AppColors.green,
          fontWeight: FontWeight.w700,
          fontSize: AppTextSize.bodySmall,
        ),
      );
}

class _ChartCard extends StatelessWidget {
  const _ChartCard({required this.title, required this.chart});
  final String title;
  final Widget chart;

  @override
  Widget build(BuildContext context) => AppCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontWeight: FontWeight.w700,
                fontSize: AppTextSize.body,
              ),
            ),
            const SizedBox(height: AppSpacing.md),
            SizedBox(height: AppSizes.analyticsChartHeight, child: chart),
          ],
        ),
      );
}

class _LineChart extends StatefulWidget {
  const _LineChart({required this.values});
  final List<int> values;

  @override
  State<_LineChart> createState() => _LineChartState();
}

class _LineChartState extends State<_LineChart>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: AppAnimation.progress,
  )..forward();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => AnimatedBuilder(
        animation: _controller,
        builder: (context, child) => CustomPaint(
          painter: _LineChartPainter(
            values: widget.values,
            progress: Curves.easeOutCubic.transform(_controller.value),
          ),
          child: const SizedBox.expand(),
        ),
      );
}

class _LineChartPainter extends CustomPainter {
  const _LineChartPainter({required this.values, required this.progress});
  final List<int> values;
  final double progress;

  @override
  void paint(Canvas canvas, Size size) {
    for (var line = 0; line < 4; line++) {
      final y = size.height * line / 3;
      canvas.drawLine(
        Offset(0, y),
        Offset(size.width, y),
        Paint()
          ..color = AppColors.border
          ..strokeWidth = 1,
      );
    }
    if (values.length < 2) return;
    final minValue = values.reduce(math.min).toDouble();
    final maxValue = values.reduce(math.max).toDouble();
    final range = math.max(1, maxValue - minValue);
    final points = [
      for (var index = 0; index < values.length; index++)
        Offset(
          size.width * index / (values.length - 1),
          size.height -
              ((values[index] - minValue) / range * size.height * .75) -
              size.height * .1,
        ),
    ];
    final visible = math.max(2, (points.length * progress).ceil());
    final path = Path()..moveTo(points.first.dx, points.first.dy);
    for (final point in points.take(visible).skip(1)) {
      path.lineTo(point.dx, point.dy);
    }
    canvas.drawPath(
      path,
      Paint()
        ..color = AppColors.green
        ..strokeWidth = 3
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round
        ..style = PaintingStyle.stroke,
    );
    for (final point in points.take(visible)) {
      canvas.drawCircle(point, 4, Paint()..color = AppColors.green);
    }
  }

  @override
  bool shouldRepaint(covariant _LineChartPainter oldDelegate) =>
      oldDelegate.progress != progress || oldDelegate.values != values;
}

class _CropBarChart extends StatefulWidget {
  const _CropBarChart({required this.values});
  final List<int> values;

  @override
  State<_CropBarChart> createState() => _CropBarChartState();
}

class _CropBarChartState extends State<_CropBarChart>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: AppAnimation.progress,
  )..forward();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final labels = [l10n.tomatoes, l10n.corn, l10n.lettuce];
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) => CustomPaint(
        painter: _CropBarPainter(
          values: widget.values,
          labels: labels,
          progress: Curves.easeOutCubic.transform(_controller.value),
          textDirection: Directionality.of(context),
        ),
        child: const SizedBox.expand(),
      ),
    );
  }
}

class _CropBarPainter extends CustomPainter {
  const _CropBarPainter({
    required this.values,
    required this.labels,
    required this.progress,
    required this.textDirection,
  });
  final List<int> values;
  final List<String> labels;
  final double progress;
  final TextDirection textDirection;

  @override
  void paint(Canvas canvas, Size size) {
    if (values.isEmpty) return;
    final maxValue = values.reduce(math.max);
    final rowHeight = size.height / values.length;
    for (var index = 0; index < values.length; index++) {
      final top = rowHeight * index + rowHeight * .22;
      final width = (size.width * .72 * values[index] / maxValue) * progress;
      final left = textDirection == TextDirection.rtl
          ? size.width - width
          : size.width * .25;
      final rect = Rect.fromLTWH(left, top, width, rowHeight * .36);
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(8)),
        Paint()
          ..color = [
            AppColors.green,
            AppColors.orange,
            AppColors.blue,
          ][index % 3],
      );
      final label = TextPainter(
        text: TextSpan(
          text: labels[index],
          style: const TextStyle(
            color: AppColors.dark,
            fontSize: AppTextSize.bodySmall,
          ),
        ),
        textDirection: textDirection,
      )..layout(maxWidth: size.width * .24);
      label.paint(
        canvas,
        Offset(
          textDirection == TextDirection.rtl ? size.width - label.width : 0,
          top - rowHeight * .05,
        ),
      );
    }
  }

  @override
  bool shouldRepaint(covariant _CropBarPainter oldDelegate) =>
      oldDelegate.progress != progress ||
      oldDelegate.values != values ||
      oldDelegate.textDirection != textDirection;
}
