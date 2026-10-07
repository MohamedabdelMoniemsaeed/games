import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/formatters.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/l10n/localized_labels.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/round_icon_button.dart';
import '../../../core/widgets/section_heading.dart';
import '../../livestock/domain/animal.dart';
import 'providers/livestock_providers.dart';
import 'widgets/animal_card.dart';
import 'widgets/animal_category_tile.dart';
import 'widgets/feeding_card.dart';
import 'widgets/herd_summary_card.dart';

/// Livestock dashboard with category filtering and individual animal details.
class LivestockScreen extends ConsumerWidget {
  const LivestockScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final selectedCategory = ref.watch(selectedAnimalCategoryProvider);
    final summary = ref.watch(herdSummaryProvider);
    final animals = ref.watch(livestockAnimalsProvider);
    final herdSummary = summary.asData?.value;
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.md,
                AppSpacing.xs,
                AppSpacing.md,
                AppSpacing.sm,
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
                  Expanded(
                    child: Column(
                      children: [
                        Text(
                          l10n.livestockTitle,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        Text(
                          l10n.livestockSubtitle,
                          style: const TextStyle(
                            color: AppColors.muted,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: AppSizes.iconButton),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(
                  AppSpacing.lg,
                  AppSpacing.xs,
                  AppSpacing.lg,
                  AppSpacing.xxl,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    summary.when(
                      loading: () => const _LoadingCard(),
                      error: (error, stack) =>
                          _ErrorCard(error: error.toString()),
                      data: (data) => HerdSummaryCard(summary: data),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    const FeedingCard(),
                    const SizedBox(height: AppSpacing.section),
                    SectionHeading(
                      title: l10n.categories,
                      subtitle: l10n.tapGroup,
                    ),
                    const SizedBox(height: AppSpacing.md),
                    _CategorySelector(
                      selected: selectedCategory,
                      summary: herdSummary,
                      onSelect: (category) => ref
                          .read(selectedAnimalCategoryProvider.notifier)
                          .select(category),
                    ),
                    const SizedBox(height: AppSpacing.section),
                    AnimatedSwitcher(
                      duration: const Duration(milliseconds: 280),
                      child: _AnimalList(
                        key: ValueKey(selectedCategory),
                        category: selectedCategory,
                        summary: herdSummary,
                        animals: animals,
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

class _CategorySelector extends StatelessWidget {
  const _CategorySelector({
    required this.selected,
    required this.summary,
    required this.onSelect,
  });

  final AnimalCategory selected;
  final HerdSummary? summary;
  final ValueChanged<AnimalCategory> onSelect;

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: AnimalCategory.values.length,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4,
        crossAxisSpacing: AppSpacing.sm - 1,
        mainAxisSpacing: AppSpacing.sm,
        mainAxisExtent: 104,
      ),
      itemBuilder: (context, index) {
        final category = AnimalCategory.values[index];
        return AnimalCategoryTile(
          category: category,
          count: summary?.countFor(category) ?? _mockCount(category),
          selected: category == selected,
          onTap: () => onSelect(category),
        );
      },
    );
  }

  int _mockCount(AnimalCategory category) => switch (category) {
    AnimalCategory.cows => 18,
    AnimalCategory.chickens => 20,
    AnimalCategory.sheep => 6,
    AnimalCategory.goats => 4,
  };
}

class _AnimalList extends StatelessWidget {
  const _AnimalList({
    required this.category,
    required this.summary,
    required this.animals,
    super.key,
  });

  final AnimalCategory category;
  final HerdSummary? summary;
  final AsyncValue<List<Animal>> animals;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final count = summary?.countFor(category) ?? _mockCount(category);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          category.sectionTitle(l10n),
          style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800),
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(
          l10n.herdTapDetails(localizedNumber(context, count)),
          style: const TextStyle(color: AppColors.muted, fontSize: 12),
        ),
        const SizedBox(height: AppSpacing.md),
        animals.when(
          loading: () => const _LoadingCard(),
          error: (error, stack) => _ErrorCard(error: error.toString()),
          data: (items) {
            final filtered = items
                .where((animal) => animal.category == category)
                .toList();
            if (filtered.isEmpty) {
              return AppCard(child: Text(l10n.noAnimalSamples));
            }
            return Column(
              children: [
                for (final animal in filtered) ...[
                  AnimalCard(animal: animal),
                  if (animal != filtered.last)
                    const SizedBox(height: AppSpacing.sm + 1),
                ],
              ],
            );
          },
        ),
      ],
    );
  }

  int _mockCount(AnimalCategory category) => switch (category) {
    AnimalCategory.cows => 18,
    AnimalCategory.chickens => 20,
    AnimalCategory.sheep => 6,
    AnimalCategory.goats => 4,
  };
}

class _LoadingCard extends StatelessWidget {
  const _LoadingCard();

  @override
  Widget build(BuildContext context) =>
      const AppCard(child: Center(child: CircularProgressIndicator()));
}

class _ErrorCard extends StatelessWidget {
  const _ErrorCard({required this.error});
  final String error;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return AppCard(child: Text('${l10n.loadFailed}\n$error'));
  }
}
