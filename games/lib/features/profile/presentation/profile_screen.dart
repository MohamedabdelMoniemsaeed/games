import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/formatters.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/l10n/locale_provider.dart';
import '../../../core/router/app_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/theme_provider.dart';
import '../../../core/widgets/app_card.dart';
import '../../../core/widgets/section_heading.dart';
import '../../auth/presentation/providers/auth_provider.dart';
import 'providers/profile_providers.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final profile = ref.watch(profileProvider);
    final darkMode = ref.watch(themeModeProvider);
    final notifications = ref.watch(notificationsEnabledProvider);
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
              l10n.profileTitle,
              style: const TextStyle(
                fontSize: AppTextSize.farmTitle,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            profile.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) => Text('${l10n.loadFailed}\n$error'),
              data: (data) => AppCard(
                child: Row(
                  children: [
                    Container(
                      width: AppSizes.animalDetailAvatar,
                      height: AppSizes.animalDetailAvatar,
                      decoration: const BoxDecoration(
                        color: AppColors.paleGreen,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.person_rounded,
                        color: AppColors.green,
                        size: AppIconSize.section,
                      ),
                    ),
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            data.farmName,
                            style: const TextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: AppTextSize.titleMedium,
                            ),
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            l10n.farmAreaValue(
                              localizedNumber(context, data.areaHectares),
                            ),
                            style: const TextStyle(color: AppColors.muted),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.xl),
            SectionHeading(title: l10n.profileSettings),
            const SizedBox(height: AppSpacing.md),
            AppCard(
              padding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
              child: Column(
                children: [
                  _SettingRow(
                    icon: Icons.language_rounded,
                    title: l10n.language,
                    subtitle:
                        Localizations.localeOf(context).languageCode == 'en'
                              ? l10n.english
                              : l10n.arabic,
                    trailing: TextButton(
                      onPressed: ref.read(localeProvider.notifier).toggle,
                      child: Text(
                        Localizations.localeOf(context).languageCode == 'en'
                            ? l10n.switchToArabic
                            : l10n.switchToEnglish,
                      ),
                    ),
                  ),
                  const Divider(height: 1, indent: AppSpacing.lg),
                  _SettingRow(
                    icon: Icons.dark_mode_outlined,
                    title: l10n.darkMode,
                    subtitle: darkMode ? l10n.themeDark : l10n.themeLight,
                    trailing: Switch.adaptive(
                      value: darkMode,
                      onChanged: (_) =>
                          ref.read(themeModeProvider.notifier).toggle(),
                    ),
                  ),
                  const Divider(height: 1, indent: AppSpacing.lg),
                  _SettingRow(
                    icon: Icons.notifications_none_rounded,
                    title: l10n.notifications,
                    subtitle: notifications ? l10n.enabled : l10n.disabled,
                    trailing: Switch.adaptive(
                      value: notifications,
                      onChanged: (_) => ref
                          .read(notificationsEnabledProvider.notifier)
                          .toggle(),
                    ),
                  ),
                  const Divider(height: 1, indent: AppSpacing.lg),
                  _SettingRow(
                    icon: Icons.info_outline_rounded,
                    title: l10n.aboutFarmly,
                    subtitle: l10n.versionLabel,
                    trailing: const Icon(
                      Icons.chevron_right_rounded,
                      color: AppColors.muted,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () async {
                  await ref.read(authStateProvider.notifier).signOut();
                  if (context.mounted) {
                    context.go(AppRoutePaths.login);
                  }
                },
                icon: const Icon(Icons.logout_rounded),
                label: Text(l10n.signOut),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.orange,
                  minimumSize:
                      const Size.fromHeight(AppSizes.primaryButtonHeight),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SettingRow extends StatelessWidget {
  const _SettingRow({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.trailing,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final Widget trailing;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        ),
        child: Row(
          children: [
            Icon(icon, color: AppColors.green, size: AppIconSize.medium),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: AppSpacing.xxs),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      color: AppColors.muted,
                      fontSize: AppTextSize.caption,
                    ),
                  ),
                ],
              ),
            ),
            trailing,
          ],
        ),
      );
}
