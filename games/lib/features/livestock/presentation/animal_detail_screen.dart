import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart' as intl;

import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/formatters.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/l10n/localized_labels.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/round_icon_button.dart';
import '../../../core/widgets/section_heading.dart';
import '../domain/animal.dart';
import '../domain/animal_detail.dart';
import 'providers/livestock_providers.dart';

class AnimalDetailScreen extends ConsumerWidget {
  const AnimalDetailScreen({required this.tag, super.key});
  final String tag;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final animals = ref.watch(livestockAnimalsProvider);
    final detail = ref.watch(animalDetailProvider(tag));
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(AppSpacing.md),
              child: Row(
                children: [
                  RoundIconButton(
                    icon: Directionality.of(context) == TextDirection.rtl
                        ? Icons.arrow_forward_rounded
                        : Icons.arrow_back_rounded,
                    tooltip: l10n.back,
                    onPressed: () => context.pop(),
                  ),
                  Expanded(
                    child: Text(
                      l10n.animalDetails,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: AppTextSize.titleMedium,
                      ),
                    ),
                  ),
                  const SizedBox(width: AppSizes.iconButton),
                ],
              ),
            ),
            Expanded(
              child: animals.when(
                loading: () =>
                    const Center(child: CircularProgressIndicator()),
                error: (error, stack) => Center(child: Text('$error')),
                data: (items) {
                  final selected = items
                      .where((candidate) => candidate.tag == tag)
                      .firstOrNull;
                  if (selected == null) return Center(child: Text(l10n.loadFailed));
                  return detail.when(
                    loading: () =>
                        const Center(child: CircularProgressIndicator()),
                    error: (error, stack) => Center(child: Text('$error')),
                    data: (data) => _AnimalDetailContent(
                      animal: selected,
                      detail: data,
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AnimalDetailContent extends StatelessWidget {
  const _AnimalDetailContent({required this.animal, required this.detail});
  final Animal animal;
  final AnimalDetail detail;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        AppSpacing.xs,
        AppSpacing.lg,
        AppSpacing.xxl,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          AppCard(
            child: Column(
              children: [
                Row(
                  children: [
                    _AnimalIcon(category: animal.category),
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            animal.localizedName(l10n),
                            style: const TextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: AppTextSize.titleLarge,
                            ),
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            animal.localizedBreed(l10n),
                            style: const TextStyle(color: AppColors.muted),
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            '${animal.tag} · ${_ageLabel(l10n, animal.ageMonths)}',
                            style: const TextStyle(
                              color: AppColors.muted,
                              fontSize: AppTextSize.caption,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.lg),
                Row(
                  children: [
                    SizedBox(
                      width: AppSizes.animalHealthRing,
                      height: AppSizes.animalHealthRing,
                      child: CustomPaint(
                        painter: _AnimalHealthPainter(
                          progress: animal.healthPercent / 100,
                        ),
                        child: Center(
                          child: Text(
                            localizedPercent(context, animal.healthPercent),
                            style: const TextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: AppTextSize.titleMedium,
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
                            l10n.animalHealth,
                            style: const TextStyle(
                              color: AppColors.muted,
                              fontSize: AppTextSize.bodySmall,
                            ),
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            animal.healthPercent >= 80
                                ? l10n.healthy
                                : l10n.needsAttention,
                            style: const TextStyle(
                              color: AppColors.green,
                              fontSize: AppTextSize.titleMedium,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
          SectionHeading(title: l10n.weightHistory),
          const SizedBox(height: AppSpacing.md),
          AppCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  l10n.weightKg,
                  style: const TextStyle(
                    color: AppColors.muted,
                    fontSize: AppTextSize.bodySmall,
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                SizedBox(
                  height: AppSizes.analyticsChartHeight,
                  child: CustomPaint(
                    painter: _WeightChartPainter(detail.weightHistoryKg),
                    child: const SizedBox.expand(),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
          SectionHeading(title: l10n.vaccinationHistory),
          const SizedBox(height: AppSpacing.md),
          AppCard(
            padding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
            child: Column(
              children: [
                for (var index = 0; index < detail.vaccinations.length; index++)
                  _VaccinationRow(
                    record: detail.vaccinations[index],
                    isLast: index == detail.vaccinations.length - 1,
                  ),
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: () => _showNoteDialog(context),
              icon: const Icon(Icons.note_add_outlined),
              label: Text(l10n.addNote),
            ),
          ),
        ],
      ),
    );
  }

  String _ageLabel(AppLocalizations l10n, int months) {
    if (months == 18) return l10n.oneAndHalfYears;
    if (months == 12) return l10n.oneYear;
    return l10n.yearsCount((months ~/ 12).toString());
  }

  Future<void> _showNoteDialog(BuildContext context) async {
    final l10n = AppLocalizations.of(context);
    final controller = TextEditingController();
    final saved = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(l10n.noteTitle),
        content: TextField(
          controller: controller,
          maxLines: 4,
          decoration: InputDecoration(hintText: l10n.noteHint),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text(l10n.cancel),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text(l10n.saveNote),
          ),
        ],
      ),
    );
    controller.dispose();
    if (saved == true && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(l10n.noteSaved)),
      );
    }
  }
}

class _AnimalIcon extends StatelessWidget {
  const _AnimalIcon({required this.category});
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
      width: AppSizes.animalDetailAvatar,
      height: AppSizes.animalDetailAvatar,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: AppColors.animalAvatar,
        borderRadius: BorderRadius.circular(AppRadius.card),
      ),
      child: Text(
        emoji,
        style: const TextStyle(fontSize: AppTextSize.animalAvatarEmoji),
      ),
    );
  }
}

class _AnimalHealthPainter extends CustomPainter {
  const _AnimalHealthPainter({required this.progress});
  final double progress;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Rect.fromCircle(
      center: size.center(Offset.zero),
      radius: size.width * .42,
    );
    final base = Paint()
      ..color = AppColors.ringTrack
      ..style = PaintingStyle.stroke
      ..strokeWidth = AppSizes.ringStroke;
    canvas.drawArc(rect, -math.pi / 2, math.pi * 2, false, base);
    canvas.drawArc(
      rect,
      -math.pi / 2,
      math.pi * 2 * progress,
      false,
      Paint()
        ..color = AppColors.green
        ..style = PaintingStyle.stroke
        ..strokeWidth = AppSizes.ringStroke
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(covariant _AnimalHealthPainter oldDelegate) =>
      oldDelegate.progress != progress;
}

class _WeightChartPainter extends CustomPainter {
  const _WeightChartPainter(this.values);
  final List<int> values;

  @override
  void paint(Canvas canvas, Size size) {
    if (values.length < 2) return;
    final minimum = values.reduce(math.min);
    final range = math.max(1, values.reduce(math.max) - minimum);
    final points = [
      for (var index = 0; index < values.length; index++)
        Offset(
          size.width * index / (values.length - 1),
          size.height -
              ((values[index] - minimum) / range * size.height * .78) -
              size.height * .08,
        ),
    ];
    final path = Path()..moveTo(points.first.dx, points.first.dy);
    for (final point in points.skip(1)) {
      path.lineTo(point.dx, point.dy);
    }
    canvas.drawPath(
      path,
      Paint()
        ..color = AppColors.green
        ..strokeWidth = 3
        ..style = PaintingStyle.stroke
        ..strokeJoin = StrokeJoin.round,
    );
    for (final point in points) {
      canvas.drawCircle(point, 4, Paint()..color = AppColors.green);
    }
  }

  @override
  bool shouldRepaint(covariant _WeightChartPainter oldDelegate) =>
      oldDelegate.values != values;
}

class _VaccinationRow extends StatelessWidget {
  const _VaccinationRow({required this.record, required this.isLast});
  final VaccinationRecord record;
  final bool isLast;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final vaccine = switch (record.vaccineKey) {
      'rabiesVaccine' => l10n.rabiesVaccine,
      'clostridialVaccine' => l10n.clostridialVaccine,
      _ => l10n.boosterVaccine,
    };
    final date = intl.DateFormat.yMMMd(
      Localizations.localeOf(context).toLanguageTag(),
    ).format(record.date);
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: AppSpacing.sm,
          ),
          child: Row(
            children: [
              const Icon(
                Icons.verified_user_outlined,
                color: AppColors.green,
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Text(
                  l10n.vaccinationDate(date, vaccine),
                  style: const TextStyle(fontSize: AppTextSize.bodySmall),
                ),
              ),
            ],
          ),
        ),
        if (!isLast) const Divider(height: 1, indent: AppSpacing.lg),
      ],
    );
  }
}
