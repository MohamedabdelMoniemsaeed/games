import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart' as intl;

import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/formatters.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/router/app_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/section_heading.dart';
import '../../weather/domain/weather_data.dart';
import '../../weather/presentation/providers/weather_providers.dart';
import '../domain/home_dashboard.dart';
import 'providers/home_providers.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final dashboard = ref.watch(homeDashboardProvider);
    final completed = ref.watch(completedTasksProvider);
    final weather = ref.watch(weatherProvider).asData?.value;
    final locale = Localizations.localeOf(context).toLanguageTag();
    return SafeArea(
      child: dashboard.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.xxl),
            child: Text('${l10n.loadFailed}\n$error'),
          ),
        ),
        data: (data) => SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(
            AppSpacing.lg,
            AppSpacing.md,
            AppSpacing.lg,
            AppSpacing.xxl,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _GreetingHeader(
                farmName: l10n.localName,
                date: intl.DateFormat(
                  'EEEE, MMM d',
                  locale,
                ).format(DateTime.now()),
              ),
              const SizedBox(height: AppSpacing.lg),
              _FarmHealthCard(snapshot: weather),
              const SizedBox(height: AppSpacing.xl),
              SectionHeading(title: l10n.quickStats),
              const SizedBox(height: AppSpacing.md),
              _QuickStats(stats: data.stats),
              const SizedBox(height: AppSpacing.xl),
              SectionHeading(title: l10n.quickActions),
              const SizedBox(height: AppSpacing.md),
              const _QuickActions(),
              const SizedBox(height: AppSpacing.xl),
              SectionHeading(
                title: l10n.todaysTasks,
                subtitle: l10n.completedTasks(
                  localizedNumber(context, completed.length),
                  localizedNumber(context, data.tasks.length),
                ),
              ),
              const SizedBox(height: AppSpacing.md),
              _TasksCard(tasks: data.tasks, completed: completed),
              const SizedBox(height: AppSpacing.xl),
              Row(
                children: [
                  Expanded(child: _FinanceCard(data: data)),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(child: _InventoryCard(data: data)),
                ],
              ),
              const SizedBox(height: AppSpacing.xl),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  SectionHeading(title: l10n.myFields),
                  TextButton(
                    onPressed: () => context.go(AppRoutePaths.farm),
                    child: Text(l10n.allFields),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.sm),
              _FieldsList(fields: data.fields),
            ],
          ),
        ),
      ),
    );
  }
}

class _GreetingHeader extends StatelessWidget {
  const _GreetingHeader({required this.farmName, required this.date});

  final String farmName;
  final String date;

  @override
  Widget build(BuildContext context) => Row(
    children: [
      Expanded(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              AppLocalizations.of(context).welcome,
              style: const TextStyle(
                color: AppColors.dark,
                fontSize: AppTextSize.titleLarge,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: AppSpacing.xxs),
            Text(
              '$farmName · $date',
              style: const TextStyle(
                color: AppColors.muted,
                fontSize: AppTextSize.bodySmall,
              ),
            ),
          ],
        ),
      ),
      Container(
        width: AppSizes.iconButton,
        height: AppSizes.iconButton,
        decoration: const BoxDecoration(
          color: AppColors.white,
          shape: BoxShape.circle,
        ),
        child: IconButton(
          tooltip: AppLocalizations.of(context).profile,
          onPressed: () => context.go(AppRoutePaths.profile),
          icon: const Icon(
            Icons.notifications_none_rounded,
            color: AppColors.dark,
          ),
        ),
      ),
    ],
  );
}

class _FarmHealthCard extends StatelessWidget {
  const _FarmHealthCard({required this.snapshot});
  final WeatherSnapshot? snapshot;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [AppColors.heroGreen, AppColors.fieldDarkGreen],
        ),
        borderRadius: BorderRadius.circular(AppRadius.card),
        boxShadow: const [
          BoxShadow(
            color: AppColors.cardBorderShadow,
            blurRadius: 15,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  l10n.farmHealth,
                  style: const TextStyle(
                    color: AppColors.white,
                    fontSize: AppTextSize.titleMedium,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              InkWell(
                onTap: () => context.pushNamed(AppRouteNames.weather),
                borderRadius: BorderRadius.circular(AppRadius.pill),
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.sm,
                    vertical: AppSpacing.xs,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.white.withValues(alpha: .16),
                    borderRadius: BorderRadius.circular(AppRadius.pill),
                  ),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.wb_sunny_rounded,
                        color: AppColors.sun,
                        size: AppIconSize.small,
                      ),
                      const SizedBox(width: AppSpacing.xs),
                      Text(
                        '${localizedNumber(context, snapshot?.condition.temperature ?? 28)}°C · ${_weatherLabel(l10n, snapshot?.condition ?? WeatherCondition.sunny)}',
                        style: const TextStyle(
                          color: AppColors.white,
                          fontSize: AppTextSize.caption,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Row(
            children: [
              SizedBox(
                width: AppSizes.healthRing,
                height: AppSizes.healthRing,
                child: CustomPaint(
                  painter: _HealthRingPainter(),
                  child: Center(
                    child: Text(
                      localizedPercent(context, 92),
                      style: const TextStyle(
                        color: AppColors.white,
                        fontSize: AppTextSize.titleMedium,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      l10n.healthyAllAligned,
                      style: const TextStyle(
                        color: AppColors.white,
                        fontSize: AppTextSize.titleSmall,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Wrap(
                      spacing: AppSpacing.sm,
                      runSpacing: AppSpacing.xs,
                      children: [
                        _HeroStatChip(
                          icon: Icons.water_drop_outlined,
                          label:
                              '${localizedPercent(context, 72)} ${l10n.soilMoisture}',
                        ),
                        _HeroStatChip(
                          icon: Icons.pets_rounded,
                          label:
                              '${localizedNumber(context, 48)} ${l10n.animals}',
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _weatherLabel(
    AppLocalizations l10n,
    WeatherCondition condition,
  ) =>
      switch (condition) {
        WeatherCondition.sunny => l10n.weatherSunny,
        WeatherCondition.clouds => l10n.weatherClouds,
        WeatherCondition.wind => l10n.weatherWind,
        WeatherCondition.rainshower => l10n.weatherRainshower,
        WeatherCondition.clearingUp => l10n.weatherClearingUp,
      };
}

class _HeroStatChip extends StatelessWidget {
  const _HeroStatChip({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(
      horizontal: AppSpacing.sm,
      vertical: AppSpacing.xs,
    ),
    decoration: BoxDecoration(
      color: AppColors.white.withValues(alpha: .14),
      borderRadius: BorderRadius.circular(AppRadius.pill),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: AppIconSize.small, color: AppColors.white),
        const SizedBox(width: AppSpacing.xs),
        Text(
          label,
          style: const TextStyle(
            color: AppColors.white,
            fontSize: AppTextSize.tiny,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    ),
  );
}

class _HealthRingPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final rect = Rect.fromCircle(
      center: size.center(Offset.zero),
      radius: size.width * .42,
    );
    final track = Paint()
      ..color = AppColors.white.withValues(alpha: .26)
      ..style = PaintingStyle.stroke
      ..strokeWidth = AppSizes.ringStroke;
    canvas.drawArc(rect, -math.pi / 2, math.pi * 2, false, track);
    canvas.drawArc(
      rect,
      -math.pi / 2,
      math.pi * 2 * .92,
      false,
      Paint()
        ..color = AppColors.white
        ..style = PaintingStyle.stroke
        ..strokeWidth = AppSizes.ringStroke
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(covariant _HealthRingPainter oldDelegate) => false;
}

class _QuickStats extends StatelessWidget {
  const _QuickStats({required this.stats});
  final List<DashboardStat> stats;

  @override
  Widget build(BuildContext context) => GridView.builder(
    shrinkWrap: true,
    physics: const NeverScrollableScrollPhysics(),
    itemCount: stats.length,
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 2,
      crossAxisSpacing: AppSpacing.md,
      mainAxisSpacing: AppSpacing.md,
      mainAxisExtent: AppSizes.statTileHeight,
    ),
    itemBuilder: (context, index) => _StatCard(stat: stats[index]),
  );
}

class _StatCard extends StatelessWidget {
  const _StatCard({required this.stat});
  final DashboardStat stat;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final value = switch (stat.metric) {
      DashboardMetric.crops ||
      DashboardMetric.animals => localizedNumber(context, stat.value),
      DashboardMetric.soilMoisture => localizedPercent(context, stat.value),
      DashboardMetric.harvest => l10n.harvestWeight(
          localizedNumber(context, stat.value),
        ),
    };
    final (label, icon, color) = switch (stat.metric) {
      DashboardMetric.crops => (
        l10n.crops,
        Icons.grass_rounded,
        AppColors.green,
      ),
      DashboardMetric.animals => (
        l10n.animals,
        Icons.pets_rounded,
        AppColors.orange,
      ),
      DashboardMetric.soilMoisture => (
        l10n.soilMoisture,
        Icons.water_drop_rounded,
        AppColors.blue,
      ),
      DashboardMetric.harvest => (
        l10n.harvest,
        Icons.agriculture_rounded,
        AppColors.green,
      ),
    };
    return AppCard(
      padding: const EdgeInsets.all(AppSpacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: AppIconSize.medium),
              const Spacer(),
              _TrendChip(percent: stat.trendPercent),
            ],
          ),
          const Spacer(),
          Text(
            value,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: AppColors.dark,
              fontSize: AppTextSize.titleLarge,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: AppSpacing.xxs),
          Text(
            label,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: AppColors.muted,
              fontSize: AppTextSize.bodySmall,
            ),
          ),
        ],
      ),
    );
  }
}

class _TrendChip extends StatelessWidget {
  const _TrendChip({required this.percent});
  final int percent;

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(
      horizontal: AppSpacing.xs,
      vertical: AppSpacing.xxs,
    ),
    decoration: BoxDecoration(
      color: AppColors.paleGreen,
      borderRadius: BorderRadius.circular(AppRadius.pill),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Icon(Icons.trending_up_rounded, size: 12, color: AppColors.green),
        Text(
          localizedPercent(context, percent),
          style: const TextStyle(
            color: AppColors.green,
            fontSize: AppTextSize.micro,
            fontWeight: FontWeight.w700,
          ),
        ),
      ],
    ),
  );
}

class _QuickActions extends StatelessWidget {
  const _QuickActions();

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return SizedBox(
      height: AppSizes.actionTileHeight,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          _ActionTile(
            icon: Icons.water_drop_rounded,
            title: l10n.smartWatering,
            hint: l10n.tomatoNeedsWater,
            color: AppColors.blue,
            onTap: () => context.go(AppRoutePaths.farm),
          ),
          const SizedBox(width: AppSpacing.md),
          _ActionTile(
            icon: Icons.restaurant_rounded,
            title: l10n.feedLivestock,
            hint: l10n.nextFeedToday,
            color: AppColors.orange,
            onTap: () => context.pushNamed(AppRouteNames.livestock),
          ),
          const SizedBox(width: AppSpacing.md),
          _ActionTile(
            icon: Icons.add_task_rounded,
            title: l10n.addTask,
            hint: l10n.planYourDay,
            color: AppColors.green,
            onTap: () =>
                ScaffoldMessenger.of(context)
                    .showSnackBar(SnackBar(content: Text(l10n.taskAddedMock))),
          ),
        ],
      ),
    );
  }
}

class _ActionTile extends StatelessWidget {
  const _ActionTile({
    required this.icon,
    required this.title,
    required this.hint,
    required this.color,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String hint;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => SizedBox(
    width: AppSizes.actionTileWidth,
    child: Material(
      color: AppColors.white,
      borderRadius: BorderRadius.circular(AppRadius.card),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppRadius.card),
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.md),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, color: color, size: AppIconSize.large),
              Text(
                title,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  color: AppColors.dark,
                  fontWeight: FontWeight.w800,
                  fontSize: AppTextSize.bodySmall,
                ),
              ),
              Text(
                hint,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  color: AppColors.muted,
                  fontSize: AppTextSize.tiny,
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}

class _TasksCard extends ConsumerWidget {
  const _TasksCard({required this.tasks, required this.completed});
  final List<FarmTask> tasks;
  final Set<String> completed;

  @override
  Widget build(BuildContext context, WidgetRef ref) => AppCard(
    padding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
    child: Column(
      children: [
        for (var index = 0; index < tasks.length; index++) ...[
          _TaskRow(
            task: tasks[index],
            isDone: completed.contains(tasks[index].id),
            onTap: () => ref
                .read(completedTasksProvider.notifier)
                .toggle(tasks[index].id),
          ),
          if (index != tasks.length - 1)
            const Divider(height: 1, indent: AppSpacing.lg),
        ],
      ],
    ),
  );
}

class _TaskRow extends StatelessWidget {
  const _TaskRow({
    required this.task,
    required this.isDone,
    required this.onTap,
  });

  final FarmTask task;
  final bool isDone;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final title = switch (task.type) {
      FarmTaskType.waterTomatoes => l10n.waterTomatoField,
      FarmTaskType.checkCorn => l10n.checkCornGrowth,
      FarmTaskType.feedLivestock => l10n.feedLivestock,
      FarmTaskType.prepareHarvest => l10n.prepareHarvest,
    };
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        ),
        child: Row(
          children: [
            AnimatedContainer(
              duration: AppAnimation.quick,
              width: AppSizes.checkbox,
              height: AppSizes.checkbox,
              decoration: BoxDecoration(
                color: isDone ? AppColors.green : AppColors.white,
                borderRadius: BorderRadius.circular(AppRadius.small),
                border: Border.all(
                  color: isDone ? AppColors.green : AppColors.border,
                  width: 1.5,
                ),
              ),
              child: isDone
                  ? const Icon(
                      Icons.check_rounded,
                      color: AppColors.white,
                      size: AppIconSize.small,
                    )
                  : null,
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: AnimatedDefaultTextStyle(
                duration: AppAnimation.quick,
                style: TextStyle(
                  color: isDone ? AppColors.muted : AppColors.dark,
                  fontSize: AppTextSize.body,
                  decoration: isDone ? TextDecoration.lineThrough : null,
                ),
                child: Text(title),
              ),
            ),
            Icon(
              isDone ? Icons.check_circle_rounded : Icons.circle_outlined,
              color: isDone ? AppColors.green : AppColors.border,
              size: AppIconSize.medium,
            ),
          ],
        ),
      ),
    );
  }
}

class _FinanceCard extends StatelessWidget {
  const _FinanceCard({required this.data});
  final HomeDashboardData data;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return AppCard(
      padding: const EdgeInsets.all(AppSpacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(
            Icons.account_balance_wallet_rounded,
            color: AppColors.financeBlue,
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            l10n.finance,
            style: const TextStyle(
              color: AppColors.muted,
              fontSize: AppTextSize.bodySmall,
            ),
          ),
          const SizedBox(height: AppSpacing.xs),
          FittedBox(
            fit: BoxFit.scaleDown,
            alignment: AlignmentDirectional.centerStart,
            child: Text(
              l10n.currencyValue(
                localizedNumber(context, data.financeBalance),
              ),
              style: const TextStyle(
                color: AppColors.dark,
                fontSize: AppTextSize.titleMedium,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.xs),
          _TrendChip(percent: data.financeTrend),
        ],
      ),
    );
  }
}

class _InventoryCard extends StatelessWidget {
  const _InventoryCard({required this.data});
  final HomeDashboardData data;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return AppCard(
      padding: const EdgeInsets.all(AppSpacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.inventory_2_outlined, color: AppColors.orange),
          const SizedBox(height: AppSpacing.sm),
          Text(
            l10n.inventory,
            style: const TextStyle(
              color: AppColors.muted,
              fontSize: AppTextSize.bodySmall,
            ),
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            l10n.suppliesRunningLow(
              localizedNumber(context, data.lowInventoryCount),
            ),
            maxLines: 2,
            style: const TextStyle(
              color: AppColors.dark,
              fontSize: AppTextSize.bodySmall,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: AppSpacing.xs),
          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.sm,
              vertical: AppSpacing.xxs,
            ),
            decoration: BoxDecoration(
              color: AppColors.warningSurface,
              borderRadius: BorderRadius.circular(AppRadius.pill),
            ),
            child: Text(
              localizedNumber(context, data.lowInventoryCount),
              style: const TextStyle(
                color: AppColors.warningText,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _FieldsList extends StatelessWidget {
  const _FieldsList({required this.fields});
  final List<FarmField> fields;

  @override
  Widget build(BuildContext context) => SizedBox(
    height: AppSizes.fieldCardHeight,
    child: ListView.separated(
      scrollDirection: Axis.horizontal,
      itemCount: fields.length,
      separatorBuilder: (context, index) =>
          const SizedBox(width: AppSpacing.md),
      itemBuilder: (context, index) => _FieldCard(field: fields[index]),
    ),
  );
}

class _FieldCard extends StatelessWidget {
  const _FieldCard({required this.field});
  final FarmField field;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final title = switch (field.type) {
      FarmFieldType.tomato => l10n.tomatoField,
      FarmFieldType.corn => l10n.cornField,
      FarmFieldType.vegetables => l10n.vegetableField,
    };
    return SizedBox(
      width: AppSizes.fieldCardWidth,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(AppRadius.card),
        child: Stack(
          fit: StackFit.expand,
          children: [
            CustomPaint(painter: _FieldScenePainter(field.type)),
            Positioned(
              left: AppSpacing.md,
              right: AppSpacing.md,
              top: AppSpacing.md,
              child: Align(
                alignment: AlignmentDirectional.topEnd,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.sm,
                    vertical: AppSpacing.xs,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.white,
                    borderRadius: BorderRadius.circular(AppRadius.pill),
                  ),
                  child: Text(
                    localizedPercent(context, field.growthPercent),
                    style: const TextStyle(
                      color: AppColors.green,
                      fontSize: AppTextSize.caption,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, AppColors.fieldImageShade],
                  ),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        color: AppColors.white,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xxs),
                    Text(
                      field.isHealthy ? l10n.healthy : l10n.needsWater,
                      style: const TextStyle(
                        color: AppColors.faintWhite,
                        fontSize: AppTextSize.caption,
                      ),
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

class _FieldScenePainter extends CustomPainter {
  const _FieldScenePainter(this.type);
  final FarmFieldType type;

  @override
  void paint(Canvas canvas, Size size) {
    final base = switch (type) {
      FarmFieldType.tomato => AppColors.mapTomatoSoil,
      FarmFieldType.corn => AppColors.mapCornDark,
      FarmFieldType.vegetables => AppColors.mapVegetableBed,
    };
    canvas.drawRect(Offset.zero & size, Paint()..color = base);
    final random = math.Random(type.index + 17);
    for (var row = 0; row < 5; row++) {
      final y = size.height * (.2 + row * .13);
      for (var column = 0; column < 8; column++) {
        final x = size.width * (.06 + column * .13);
        final radius = 4 + random.nextDouble() * 4;
        final plantColor = type == FarmFieldType.tomato
            ? AppColors.mapTomatoLeaf
            : type == FarmFieldType.corn
            ? AppColors.mapCornLight
            : AppColors.mapLettuceLight;
        canvas.drawOval(
          Rect.fromCenter(
            center: Offset(x + random.nextDouble() * 5, y),
            width: radius * 1.7,
            height: radius,
          ),
          Paint()..color = plantColor,
        );
        if (type == FarmFieldType.tomato && column % 3 == 1) {
          canvas.drawCircle(
            Offset(x + radius * .5, y + radius),
            2,
            Paint()..color = AppColors.mapTomato,
          );
        }
      }
    }
  }

  @override
  bool shouldRepaint(covariant _FieldScenePainter oldDelegate) =>
      oldDelegate.type != type;
}
