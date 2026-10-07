import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart' as intl;

import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/formatters.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/round_icon_button.dart';
import '../../../core/widgets/section_heading.dart';
import '../domain/weather_data.dart';
import 'providers/weather_providers.dart';

class WeatherScreen extends ConsumerWidget {
  const WeatherScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final weather = ref.watch(weatherProvider);
    return Scaffold(
      body: SafeArea(
        child: weather.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, stack) => Center(child: Text('$error')),
          data: (snapshot) => CustomScrollView(
            slivers: [
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(
                    AppSpacing.lg,
                    AppSpacing.md,
                    AppSpacing.lg,
                    AppSpacing.md,
                  ),
                  child: Row(
                    children: [
                      RoundIconButton(
                        icon: Directionality.of(context) == TextDirection.rtl
                            ? Icons.arrow_forward_rounded
                            : Icons.arrow_back_rounded,
                        tooltip: l10n.back,
                        onPressed: () => context.pop(),
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: Center(
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: AppSpacing.md,
                              vertical: AppSpacing.sm,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.white,
                              borderRadius: BorderRadius.circular(
                                AppRadius.pill,
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(
                                  Icons.location_on_outlined,
                                  color: AppColors.green,
                                  size: AppIconSize.small,
                                ),
                                const SizedBox(width: AppSpacing.xs),
                                Flexible(
                                  child: Text(
                                    l10n.localName,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      RoundIconButton(
                        icon: Icons.refresh_rounded,
                        tooltip: l10n.refreshWeather,
                        onPressed: ref.read(weatherProvider.notifier).refresh,
                      ),
                    ],
                  ),
                ),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.lg,
                  ),
                  child: _WeatherScene(
                    snapshot: snapshot,
                    onToggleDemo: ref.read(weatherProvider.notifier).toggleDemo,
                  ),
                ),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(
                    AppSpacing.lg,
                    AppSpacing.lg,
                    AppSpacing.lg,
                    AppSpacing.xxl,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _ConditionsCard(snapshot: snapshot),
                      const SizedBox(height: AppSpacing.xl),
                      SectionHeading(
                        title: l10n.farmRecommendations,
                        subtitle: l10n.recommendationsSubtitle,
                      ),
                      const SizedBox(height: AppSpacing.md),
                      for (final recommendation in _recommendations(
                        snapshot.condition,
                      )) ...[
                        _RecommendationCard(
                          type: recommendation,
                          onPressed: () =>
                              _performRecommendation(context, recommendation),
                        ),
                        const SizedBox(height: AppSpacing.sm),
                      ],
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<WeatherRecommendationType> _recommendations(
    WeatherCondition condition,
  ) => switch (condition) {
    WeatherCondition.rainshower => const [
      WeatherRecommendationType.skipIrrigation,
      WeatherRecommendationType.plantCrop,
    ],
    WeatherCondition.clouds || WeatherCondition.clearingUp => const [
      WeatherRecommendationType.plantCrop,
      WeatherRecommendationType.scheduleWater,
    ],
    WeatherCondition.sunny || WeatherCondition.wind => const [
      WeatherRecommendationType.scheduleWater,
      WeatherRecommendationType.plantCrop,
    ],
  };

  void _performRecommendation(
    BuildContext context,
    WeatherRecommendationType type,
  ) {
    final l10n = AppLocalizations.of(context);
    final message = switch (type) {
      WeatherRecommendationType.scheduleWater => l10n.wateringScheduled,
      WeatherRecommendationType.skipIrrigation => l10n.irrigationSkipped,
      WeatherRecommendationType.plantCrop => l10n.cropAddedToPlan,
    };
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }
}

class _WeatherScene extends StatefulWidget {
  const _WeatherScene({required this.snapshot, required this.onToggleDemo});
  final WeatherSnapshot snapshot;
  final VoidCallback onToggleDemo;

  @override
  State<_WeatherScene> createState() => _WeatherSceneState();
}

class _WeatherSceneState extends State<_WeatherScene>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animation = AnimationController(
    vsync: this,
    duration: AppAnimation.mapZoom,
  )..repeat();

  @override
  void dispose() {
    _animation.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return ClipRRect(
      borderRadius: BorderRadius.circular(AppRadius.map),
      child: SizedBox(
        height: AppSizes.weatherSceneHeight,
        child: AnimatedSwitcher(
          duration: AppAnimation.standard,
          child: Stack(
            key: ValueKey(widget.snapshot.condition),
            fit: StackFit.expand,
            children: [
              AnimatedBuilder(
                animation: _animation,
                builder: (context, child) => CustomPaint(
                  painter: WeatherScenePainter(
                    condition: widget.snapshot.condition,
                    animation: _animation.value,
                  ),
                ),
              ),
              Positioned(
                top: AppSpacing.lg,
                left: AppSpacing.lg,
                right: AppSpacing.lg,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _conditionLabel(l10n, widget.snapshot.condition),
                            style: const TextStyle(
                              color: AppColors.white,
                              fontSize: AppTextSize.titleLarge,
                              fontWeight: FontWeight.w800,
                              shadows: [
                                Shadow(
                                  color: AppColors.fieldImageShade,
                                  blurRadius: 8,
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            l10n.farmWeather,
                            style: const TextStyle(
                              color: AppColors.faintWhite,
                              fontSize: AppTextSize.bodySmall,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Column(
                      children: [
                        Text(
                          localizedNumber(
                            context,
                            widget.snapshot.condition.temperature,
                          ),
                          style: const TextStyle(
                            color: AppColors.white,
                            fontSize: AppTextSize.weatherHeroTemperature,
                            height: 1,
                            fontWeight: FontWeight.w300,
                            shadows: [
                              Shadow(
                                color: AppColors.fieldImageShade,
                                blurRadius: 8,
                              ),
                            ],
                          ),
                        ),
                        const Text(
                          '°',
                          style: TextStyle(
                            color: AppColors.white,
                            fontSize: AppTextSize.titleLarge,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Positioned(
                bottom: AppSpacing.md,
                left: AppSpacing.md,
                child: _DemoToggle(onPressed: widget.onToggleDemo),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class WeatherScenePainter extends CustomPainter {
  const WeatherScenePainter({required this.condition, required this.animation});

  final WeatherCondition condition;
  final double animation;

  @override
  void paint(Canvas canvas, Size size) {
    final sky = switch (condition) {
      WeatherCondition.sunny => const [AppColors.skyTop, AppColors.skyBottom],
      WeatherCondition.clouds => const [
        AppColors.weatherCloudSky,
        AppColors.skyBottom,
      ],
      WeatherCondition.wind => const [
        AppColors.weatherWindSky,
        AppColors.weatherCloudSky,
      ],
      WeatherCondition.rainshower => const [
        AppColors.weatherRainSky,
        AppColors.weatherCloudSky,
      ],
      WeatherCondition.clearingUp => const [
        AppColors.weatherClearSky,
        AppColors.skyBottom,
      ],
    };
    canvas.drawRect(
      Offset.zero & size,
      Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: sky,
        ).createShader(Offset.zero & size),
    );
    final raining = condition == WeatherCondition.rainshower;
    final cloudy =
        condition == WeatherCondition.clouds ||
        condition == WeatherCondition.wind ||
        raining;
    if (!cloudy || condition == WeatherCondition.clearingUp) {
      _drawSun(canvas, Offset(size.width * .78, size.height * .25));
    }
    if (cloudy) {
      for (var index = 0; index < 4; index++) {
        final x =
            (size.width * (index * .28 + .05) +
                animation *
                    size.width *
                    (condition == WeatherCondition.wind ? .12 : .04)) %
            (size.width + 100);
        _drawCloud(
          canvas,
          Offset(x - 35, size.height * (.18 + (index % 2) * .13)),
          condition == WeatherCondition.wind
              ? AppColors.darkSurface
              : AppColors.white,
          condition == WeatherCondition.wind ? .85 : .76,
        );
      }
    } else {
      for (var index = 0; index < 3; index++) {
        final x =
            (size.width * (index * .36) + animation * 35) % (size.width + 90);
        _drawCloud(
          canvas,
          Offset(x - 35, size.height * (.17 + (index % 2) * .09)),
          AppColors.white,
          .78,
        );
      }
    }
    _drawField(canvas, size);
    _drawFarmhouse(canvas, size);
    _drawCrops(canvas, size, sway: condition == WeatherCondition.wind);
    _drawTank(canvas, size, raining: raining);
    if (condition == WeatherCondition.clearingUp) _drawRainbow(canvas, size);
    if (raining) _drawRain(canvas, size);
  }

  void _drawSun(Canvas canvas, Offset center) {
    for (var index = 0; index < 12; index++) {
      final angle = index * math.pi / 6 + animation * .15;
      final start = center + Offset(math.cos(angle), math.sin(angle)) * 31;
      final end = center + Offset(math.cos(angle), math.sin(angle)) * 43;
      canvas.drawLine(
        start,
        end,
        Paint()
          ..color = AppColors.sun
          ..strokeWidth = 3
          ..strokeCap = StrokeCap.round,
      );
    }
    canvas.drawCircle(center, 24, Paint()..color = AppColors.sun);
  }

  void _drawCloud(Canvas canvas, Offset position, Color color, double opacity) {
    final paint = Paint()..color = color.withValues(alpha: opacity);
    canvas
      ..drawCircle(position, 19, paint)
      ..drawCircle(position.translate(20, -9), 24, paint)
      ..drawCircle(position.translate(43, 0), 18, paint)
      ..drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(position.dx - 10, position.dy, 63, 20),
          const Radius.circular(12),
        ),
        paint,
      );
  }

  void _drawField(Canvas canvas, Size size) {
    final horizon = size.height * .64;
    final path = Path()
      ..moveTo(0, horizon)
      ..cubicTo(
        size.width * .25,
        horizon - size.height * .17,
        size.width * .55,
        horizon + size.height * .12,
        size.width,
        horizon - size.height * .1,
      )
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
    canvas.drawPath(path, Paint()..color = AppColors.weatherSceneGreen);
    canvas.drawOval(
      Rect.fromCenter(
        center: Offset(size.width * .49, size.height * .97),
        width: size.width * .92,
        height: size.height * .24,
      ),
      Paint()..color = AppColors.weatherSceneDarkGreen,
    );
  }

  void _drawFarmhouse(Canvas canvas, Size size) {
    final center = Offset(size.width * .52, size.height * .71);
    final body = Rect.fromCenter(
      center: center.translate(0, 10),
      width: 52,
      height: 34,
    );
    canvas.drawRect(body, Paint()..color = AppColors.barnRed);
    final roof = Path()
      ..moveTo(body.left - 6, body.top + 5)
      ..lineTo(center.dx, body.top - 21)
      ..lineTo(body.right + 6, body.top + 5)
      ..close();
    canvas.drawPath(roof, Paint()..color = AppColors.mapBarnRoof);
    canvas.drawRect(
      Rect.fromCenter(
        center: Offset(center.dx, body.bottom - 8),
        width: 12,
        height: 18,
      ),
      Paint()..color = AppColors.mapBarnDoor,
    );
  }

  void _drawCrops(Canvas canvas, Size size, {required bool sway}) {
    final baseY = size.height * .82;
    for (var row = 0; row < 4; row++) {
      final y = baseY + row * 15;
      final shift = sway ? math.sin(animation * math.pi * 2 + row) * 5 : 0.0;
      for (var plant = 0; plant < 9; plant++) {
        final x = plant * size.width / 8 + shift;
        canvas.drawLine(
          Offset(x, y),
          Offset(x + 2, y - 12),
          Paint()
            ..color = AppColors.mapLeaf
            ..strokeWidth = 2,
        );
      }
    }
  }

  void _drawTank(Canvas canvas, Size size, {required bool raining}) {
    final rect = Rect.fromCenter(
      center: Offset(size.width * .87, size.height * .75),
      width: 38,
      height: 30,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(rect, const Radius.circular(7)),
      Paint()..color = AppColors.mapWater,
    );
    if (raining) {
      canvas.drawRect(
        Rect.fromLTWH(rect.left + 5, rect.bottom - 9, rect.width - 10, 5),
        Paint()..color = AppColors.weatherMoisture,
      );
    }
  }

  void _drawRain(Canvas canvas, Size size) {
    for (var index = 0; index < 46; index++) {
      final x = (index * 47 + animation * 34) % size.width;
      final y = (index * 29 + animation * size.height) % (size.height * .7);
      canvas.drawLine(
        Offset(x, y),
        Offset(x - 3, y + 10),
        Paint()
          ..color = AppColors.rainBlue.withValues(alpha: .8)
          ..strokeWidth = 1.4,
      );
    }
  }

  void _drawRainbow(Canvas canvas, Size size) {
    final rect = Rect.fromCenter(
      center: Offset(size.width * .48, size.height * .48),
      width: size.width * .62,
      height: size.height * .55,
    );
    final colors = [
      AppColors.rainbowRed,
      AppColors.rainbowOrange,
      AppColors.rainbowYellow,
    ];
    for (var index = 0; index < colors.length; index++) {
      canvas.drawArc(
        rect.deflate(index * 8),
        math.pi,
        math.pi,
        false,
        Paint()
          ..color = colors[index].withValues(alpha: .72)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 5,
      );
    }
  }

  @override
  bool shouldRepaint(covariant WeatherScenePainter oldDelegate) =>
      oldDelegate.condition != condition || oldDelegate.animation != animation;
}

class _ConditionsCard extends StatelessWidget {
  const _ConditionsCard({required this.snapshot});
  final WeatherSnapshot snapshot;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final message = switch (snapshot.condition) {
      WeatherCondition.sunny => l10n.weatherSentenceSunny,
      WeatherCondition.clouds => l10n.weatherSentenceClouds,
      WeatherCondition.wind => l10n.weatherSentenceWind,
      WeatherCondition.rainshower => l10n.weatherSentenceRain,
      WeatherCondition.clearingUp => l10n.weatherSentenceClearing,
    };
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  l10n.todaysConditions,
                  style: const TextStyle(
                    fontSize: AppTextSize.titleMedium,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              const _LivePill(),
            ],
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            intl.DateFormat.yMMMMEEEEd(
              Localizations.localeOf(context).toLanguageTag(),
            ).format(DateTime.now()),
            style: const TextStyle(
              color: AppColors.muted,
              fontSize: AppTextSize.bodySmall,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            message,
            style: const TextStyle(color: AppColors.dark, height: 1.4),
          ),
          const SizedBox(height: AppSpacing.lg),
          Wrap(
            spacing: AppSpacing.sm,
            runSpacing: AppSpacing.sm,
            children: [
              _WeatherStatCard(
                icon: Icons.thermostat_rounded,
                title: l10n.temperature,
                value:
                    '${localizedNumber(context, snapshot.condition.temperature)}°',
                caption: l10n.feelsLike(
                  localizedNumber(context, snapshot.feelsLike),
                ),
                child: _Sparkline(values: snapshot.temperatureHistory),
              ),
              _WeatherStatCard(
                icon: Icons.water_drop_rounded,
                title: l10n.humidity,
                value: localizedPercent(context, snapshot.condition.humidity),
                caption: l10n.dewPoint(
                  localizedNumber(context, snapshot.condition.temperature - 7),
                ),
                child: _VerticalBar(
                  progress: snapshot.condition.humidity / 100,
                  color: AppColors.weatherMoisture,
                ),
              ),
              _WeatherStatCard(
                icon: Icons.air_rounded,
                title: l10n.wind,
                value: l10n.windSpeed(
                  localizedNumber(context, snapshot.condition.windSpeed),
                ),
                caption:
                    '${_windDirection(l10n, snapshot.windDirectionDegrees)} · ${l10n.gustsValue(localizedNumber(context, snapshot.gustSpeed))}',
                child: const Icon(
                  Icons.navigation_rounded,
                  color: AppColors.blue,
                  size: AppIconSize.medium,
                ),
              ),
              _WeatherStatCard(
                icon: Icons.umbrella_rounded,
                title: l10n.rainChance,
                value: localizedPercent(context, snapshot.condition.rainChance),
                caption: l10n.expectedRain(
                  localizedNumber(context, snapshot.expectedRainMm.round()),
                ),
                child: _MiniProgress(
                  value: snapshot.condition.rainChance / 100,
                  color: AppColors.blue,
                ),
              ),
              _WeatherStatCard(
                icon: Icons.grass_rounded,
                title: l10n.soilMoisture,
                value: localizedPercent(
                  context,
                  snapshot.condition.soilMoisture,
                ),
                caption: _soilStatus(l10n, snapshot.soilStatusKey),
                child: _MiniProgress(
                  value: snapshot.condition.soilMoisture / 100,
                  color: AppColors.green,
                ),
              ),
              _WeatherStatCard(
                icon: Icons.water_rounded,
                title: l10n.waterTank,
                value: localizedPercent(context, snapshot.waterTankPercent),
                caption: l10n.storedLitersValue(
                  localizedNumber(context, snapshot.waterStoredLiters),
                ),
                child: _MiniProgress(
                  value: snapshot.waterTankPercent / 100,
                  color: AppColors.weatherMoisture,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _WeatherStatCard extends StatelessWidget {
  const _WeatherStatCard({
    required this.icon,
    required this.title,
    required this.value,
    required this.caption,
    required this.child,
  });
  final IconData icon;
  final String title;
  final String value;
  final String caption;
  final Widget child;

  @override
  Widget build(BuildContext context) => SizedBox(
    width: AppSizes.weatherStatWidth,
    height: AppSizes.weatherStatHeight,
    child: Container(
      padding: const EdgeInsets.all(AppSpacing.sm),
      decoration: BoxDecoration(
        color: AppColors.surfaceMuted,
        borderRadius: BorderRadius.circular(AppRadius.button),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: AppColors.green, size: AppIconSize.small),
              const SizedBox(width: AppSpacing.xs),
              Expanded(
                child: Text(
                  title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: AppColors.muted,
                    fontSize: AppTextSize.caption,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            value,
            style: const TextStyle(
              color: AppColors.dark,
              fontSize: AppTextSize.titleMedium,
              fontWeight: FontWeight.w800,
            ),
          ),
          const Spacer(),
          SizedBox(height: AppSizes.miniChartHeight, child: child),
          const SizedBox(height: AppSpacing.xs),
          Text(
            caption,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: AppColors.muted,
              fontSize: AppTextSize.micro,
            ),
          ),
        ],
      ),
    ),
  );
}

class _Sparkline extends StatelessWidget {
  const _Sparkline({required this.values});
  final List<int> values;

  @override
  Widget build(BuildContext context) => CustomPaint(
    painter: _SparklinePainter(values),
    child: const SizedBox.expand(),
  );
}

class _SparklinePainter extends CustomPainter {
  const _SparklinePainter(this.values);
  final List<int> values;

  @override
  void paint(Canvas canvas, Size size) {
    if (values.length < 2) return;
    final minValue = values.reduce(math.min).toDouble();
    final range = math.max(
      1,
      values.reduce(math.max) - values.reduce(math.min),
    );
    final points = [
      for (var index = 0; index < values.length; index++)
        Offset(
          size.width * index / (values.length - 1),
          size.height - (values[index] - minValue) / range * size.height,
        ),
    ];
    final path = Path()..moveTo(points.first.dx, points.first.dy);
    for (final point in points.skip(1)) {
      path.lineTo(point.dx, point.dy);
    }
    canvas.drawPath(
      path,
      Paint()
        ..color = AppColors.orange
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(covariant _SparklinePainter oldDelegate) =>
      oldDelegate.values != values;
}

class _VerticalBar extends StatelessWidget {
  const _VerticalBar({required this.progress, required this.color});
  final double progress;
  final Color color;

  @override
  Widget build(BuildContext context) => Align(
    alignment: AlignmentDirectional.centerStart,
    child: SizedBox(
      width: AppSpacing.md,
      height: AppSizes.miniChartHeight,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(AppRadius.pill),
        child: Stack(
          alignment: Alignment.bottomCenter,
          children: [
            const ColoredBox(color: AppColors.border),
            FractionallySizedBox(
              heightFactor: progress,
              child: ColoredBox(color: color),
            ),
          ],
        ),
      ),
    ),
  );
}

class _MiniProgress extends StatelessWidget {
  const _MiniProgress({required this.value, required this.color});
  final double value;
  final Color color;

  @override
  Widget build(BuildContext context) => Align(
    alignment: Alignment.centerLeft,
    child: ClipRRect(
      borderRadius: BorderRadius.circular(AppRadius.pill),
      child: LinearProgressIndicator(
        value: value,
        minHeight: AppSpacing.xs,
        color: color,
        backgroundColor: AppColors.border,
      ),
    ),
  );
}

class _LivePill extends StatelessWidget {
  const _LivePill();

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(
      horizontal: AppSpacing.sm,
      vertical: AppSpacing.xs,
    ),
    decoration: BoxDecoration(
      color: AppColors.paleGreen,
      borderRadius: BorderRadius.circular(AppRadius.pill),
    ),
    child: Row(
      children: [
        Container(
          width: AppSpacing.xs,
          height: AppSpacing.xs,
          decoration: const BoxDecoration(
            color: AppColors.green,
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(width: AppSpacing.xs),
        Text(
          AppLocalizations.of(context).live,
          style: const TextStyle(
            color: AppColors.green,
            fontSize: AppTextSize.caption,
            fontWeight: FontWeight.w700,
          ),
        ),
      ],
    ),
  );
}

class _RecommendationCard extends StatelessWidget {
  const _RecommendationCard({required this.type, required this.onPressed});
  final WeatherRecommendationType type;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final (icon, color, surface, title, body, button) = switch (type) {
      WeatherRecommendationType.scheduleWater => (
        Icons.water_drop_rounded,
        AppColors.blue,
        AppColors.paleBlue,
        l10n.recommendWaterTitle,
        l10n.recommendWaterBody,
        l10n.schedule,
      ),
      WeatherRecommendationType.skipIrrigation => (
        Icons.umbrella_rounded,
        AppColors.recommendationOrange,
        AppColors.paleOrange,
        l10n.recommendSkipTitle,
        l10n.recommendSkipBody,
        l10n.skipIrrigation,
      ),
      WeatherRecommendationType.plantCrop => (
        Icons.eco_rounded,
        AppColors.green,
        AppColors.paleGreen,
        l10n.recommendPlantTitle,
        l10n.recommendPlantBody,
        l10n.plantCrop,
      ),
    };
    return AppCard(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: AppSizes.recommendationIcon,
            height: AppSizes.recommendationIcon,
            decoration: BoxDecoration(
              color: surface,
              borderRadius: BorderRadius.circular(AppRadius.button),
            ),
            child: Icon(icon, color: color),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: AppColors.dark,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: AppSpacing.xs),
                Text(
                  body,
                  style: const TextStyle(
                    color: AppColors.muted,
                    fontSize: AppTextSize.bodySmall,
                    height: 1.35,
                  ),
                ),
                Align(
                  alignment: AlignmentDirectional.centerEnd,
                  child: TextButton(onPressed: onPressed, child: Text(button)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _DemoToggle extends StatelessWidget {
  const _DemoToggle({required this.onPressed});
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) => Material(
    color: AppColors.dark.withValues(alpha: .45),
    borderRadius: BorderRadius.circular(AppRadius.pill),
    child: InkWell(
      onTap: onPressed,
      borderRadius: BorderRadius.circular(AppRadius.pill),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.sm,
          vertical: AppSpacing.xs,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(
              Icons.autorenew_rounded,
              size: AppIconSize.small,
              color: AppColors.white,
            ),
            const SizedBox(width: AppSpacing.xs),
            Text(
              AppLocalizations.of(context).demoCycle,
              style: const TextStyle(
                color: AppColors.white,
                fontSize: AppTextSize.caption,
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

String _conditionLabel(AppLocalizations l10n, WeatherCondition condition) =>
    switch (condition) {
      WeatherCondition.sunny => l10n.weatherSunny,
      WeatherCondition.clouds => l10n.weatherClouds,
      WeatherCondition.wind => l10n.weatherWind,
      WeatherCondition.rainshower => l10n.weatherRainshower,
      WeatherCondition.clearingUp => l10n.weatherClearingUp,
    };

String _windDirection(AppLocalizations l10n, int degrees) {
  final direction = ((degrees + 22) ~/ 45) % 8;
  return switch (direction) {
    0 => l10n.north,
    1 => l10n.northEast,
    2 => l10n.east,
    3 => l10n.southEast,
    4 => l10n.south,
    5 => l10n.southWest,
    6 => l10n.west,
    _ => l10n.northWest,
  };
}

String _soilStatus(AppLocalizations l10n, String key) =>
    key == 'wellWatered' ? l10n.wellWatered : l10n.moistureGood;
