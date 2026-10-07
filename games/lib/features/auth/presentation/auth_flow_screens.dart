import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/l10n/locale_provider.dart';
import '../../../core/router/app_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/primary_button.dart';
import '../../../core/widgets/round_icon_button.dart';
import 'providers/auth_provider.dart';
import 'widgets/farm_illustration.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  Timer? _timer;
  bool _timerComplete = false;
  bool _didNavigate = false;

  @override
  void initState() {
    super.initState();
    _timer = Timer(const Duration(milliseconds: 2500), () {
      _timerComplete = true;
      _navigateWhenReady();
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _navigateWhenReady() {
    if (!_timerComplete || _didNavigate || !mounted) return;
    final auth = ref.read(authStateProvider);
    final session = auth.asData?.value;
    if (session == null) return;
    _didNavigate = true;
    final path = !session.onboardingSeen
        ? AppRoutePaths.onboarding
        : session.isAuthenticated
        ? AppRoutePaths.home
        : AppRoutePaths.login;
    context.go(path);
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(authStateProvider, (previous, next) {
      if (_timerComplete) {
        WidgetsBinding.instance.addPostFrameCallback(
          (_) => _navigateWhenReady(),
        );
      }
    });
    final l10n = AppLocalizations.of(context);
    final auth = ref.watch(authStateProvider);
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          const FarmIllustration(style: FarmIllustrationStyle.splash),
          Positioned(
            top: MediaQuery.paddingOf(context).top + AppSpacing.md,
            right: AppSpacing.lg,
            child: const _LocaleToggle(),
          ),
          Positioned(
            top: MediaQuery.paddingOf(context).top + AppSpacing.xxl,
            left: AppSpacing.lg,
            right: AppSpacing.lg,
            child: Column(
              children: [
                TweenAnimationBuilder<double>(
                  tween: Tween(begin: .2, end: 1),
                  duration: AppAnimation.splashGrow,
                  curve: Curves.elasticOut,
                  builder: (context, size, child) =>
                      Transform.scale(scale: size, child: child),
                  child: const Icon(
                    Icons.spa_rounded,
                    color: AppColors.green,
                    size: AppSizes.splashLogo,
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                Text(
                  l10n.farmly,
                  style: const TextStyle(
                    color: AppColors.dark,
                    fontSize: AppTextSize.splashTitle,
                    fontWeight: FontWeight.w800,
                    letterSpacing: -.8,
                  ),
                ),
                const SizedBox(height: AppSpacing.xs),
                Text(
                  l10n.smartFarmingSimplified,
                  style: const TextStyle(
                    color: AppColors.muted,
                    fontSize: AppTextSize.titleMedium,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: MediaQuery.paddingOf(context).bottom + AppSpacing.xxl,
            child: Center(
              child: auth.hasError
                  ? Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          l10n.authError,
                          style: const TextStyle(color: AppColors.dark),
                        ),
                        TextButton(
                          onPressed: () => ref.invalidate(authStateProvider),
                          child: Text(l10n.tryAgain),
                        ),
                      ],
                    )
                  : const SizedBox(
                      width: AppSizes.splashLoader,
                      height: AppSizes.splashLoader,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: AppColors.green,
                      ),
                    ),
            ),
          ),
        ],
      ),
    );
  }
}

class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({super.key});

  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> {
  bool _isContinuing = false;
  String? _error;

  Future<void> _start({required bool guest}) async {
    setState(() {
      _isContinuing = true;
      _error = null;
    });
    try {
      if (guest) {
        await ref.read(authStateProvider.notifier).continueAsGuest();
        if (mounted) context.go(AppRoutePaths.home);
      } else {
        await ref.read(authStateProvider.notifier).completeOnboarding();
        if (mounted) context.go(AppRoutePaths.login);
      }
    } catch (_) {
      if (mounted) {
        setState(() => _error = AppLocalizations.of(context).authError);
      }
    } finally {
      if (mounted) {
        setState(() => _isContinuing = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            const Expanded(
              flex: 5,
              child: ClipRRect(
                borderRadius: BorderRadius.vertical(
                  bottom: Radius.circular(AppRadius.map),
                ),
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    FarmIllustration(style: FarmIllustrationStyle.onboarding),
                    Positioned(
                      top: AppSpacing.lg,
                      left: AppSpacing.lg,
                      child: _FarmlyMark(),
                    ),
                    Positioned(
                      top: AppSpacing.lg,
                      right: AppSpacing.lg,
                      child: _LocaleToggle(),
                    ),
                  ],
                ),
              ),
            ),
            Expanded(
              flex: 6,
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(
                  AppSpacing.xxl,
                  AppSpacing.xxl,
                  AppSpacing.xxl,
                  AppSpacing.lg,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      l10n.onboardingTitle,
                      style: const TextStyle(
                        color: AppColors.dark,
                        fontSize: AppTextSize.farmTitle,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      l10n.onboardingSubtitle,
                      style: const TextStyle(
                        color: AppColors.muted,
                        fontSize: AppTextSize.body,
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    Wrap(
                      spacing: AppSpacing.sm,
                      runSpacing: AppSpacing.sm,
                      children: [
                        _CategoryChip(
                          icon: Icons.grass_rounded,
                          label: l10n.crops,
                        ),
                        _CategoryChip(
                          icon: Icons.pets_rounded,
                          label: l10n.livestockTitle,
                        ),
                        _CategoryChip(
                          icon: Icons.wb_sunny_rounded,
                          label: l10n.weather,
                        ),
                        _CategoryChip(
                          icon: Icons.insights_rounded,
                          label: l10n.insights,
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    PrimaryButton(
                      label: l10n.getStarted,
                      onPressed: _isContinuing
                          ? null
                          : () => _start(guest: false),
                      trailingIcon: Icons.arrow_forward_rounded,
                      isLoading: _isContinuing,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Center(
                      child: TextButton(
                        onPressed: _isContinuing
                            ? null
                            : () => _start(guest: true),
                        child: Text(l10n.continueAsGuest),
                      ),
                    ),
                    if (_error != null)
                      Center(
                        child: Text(
                          _error!,
                          style: const TextStyle(color: AppColors.orange),
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

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) =>
      const _CredentialScreen(isSignUp: false);
}

class CreateAccountScreen extends StatelessWidget {
  const CreateAccountScreen({super.key});

  @override
  Widget build(BuildContext context) => const _CredentialScreen(isSignUp: true);
}

class _CredentialScreen extends ConsumerStatefulWidget {
  const _CredentialScreen({required this.isSignUp});

  final bool isSignUp;

  @override
  ConsumerState<_CredentialScreen> createState() => _CredentialScreenState();
}

class _CredentialScreenState extends ConsumerState<_CredentialScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _passwordVisible = false;
  bool _keepSignedIn = true;
  bool _isSubmitting = false;
  String? _error;

  bool get _credentialsValid =>
      RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
          .hasMatch(_emailController.text.trim()) &&
      _passwordController.text.length >= 6;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() {
      _isSubmitting = true;
      _error = null;
    });
    try {
      final auth = ref.read(authStateProvider.notifier);
      if (widget.isSignUp) {
        await auth.signUp(_emailController.text, _passwordController.text);
      } else {
        await auth.signIn(
          _emailController.text,
          _passwordController.text,
          keepSignedIn: _keepSignedIn,
        );
      }
      if (mounted) {
        context.go(AppRoutePaths.home);
      }
    } catch (_) {
      if (mounted) {
        setState(() => _error = AppLocalizations.of(context).authError);
      }
    } finally {
      if (mounted) {
        setState(() => _isSubmitting = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(
              height: AppSizes.authHeroHeight,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  const ClipRRect(
                    borderRadius: BorderRadius.vertical(
                      bottom: Radius.circular(AppRadius.map),
                    ),
                    child: FarmIllustration(style: FarmIllustrationStyle.login),
                  ),
                  Positioned(
                    top: AppSpacing.md,
                    left: AppSpacing.lg,
                    child: RoundIconButton(
                      icon: Directionality.of(context) == TextDirection.rtl
                          ? Icons.arrow_forward_rounded
                          : Icons.arrow_back_rounded,
                      tooltip: l10n.back,
                      onPressed: () => context.go(
                        widget.isSignUp
                            ? AppRoutePaths.login
                            : AppRoutePaths.onboarding,
                      ),
                    ),
                  ),
                  const Positioned(
                    top: AppSpacing.lg,
                    right: AppSpacing.lg,
                    child: _FarmlyMark(),
                  ),
                  const Positioned(
                    bottom: AppSpacing.md,
                    left: AppSpacing.lg,
                    child: _LocaleToggle(),
                  ),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(
                  AppSpacing.xxl,
                  AppSpacing.xl,
                  AppSpacing.xxl,
                  AppSpacing.xxl,
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.isSignUp ? l10n.createAccount : l10n.welcomeBack,
                        style: const TextStyle(
                          color: AppColors.dark,
                          fontSize: AppTextSize.farmTitle,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.xs),
                      Text(
                        widget.isSignUp
                            ? l10n.createAccountSubtitle
                            : l10n.loginSubtitle,
                        style: const TextStyle(
                          color: AppColors.muted,
                          height: 1.4,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.xl),
                      _AuthTextField(
                        controller: _emailController,
                        label: l10n.email,
                        hint: l10n.emailHint,
                        icon: Icons.mail_outline_rounded,
                        keyboardType: TextInputType.emailAddress,
                        validator: (value) =>
                            RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
                                .hasMatch((value ?? '').trim())
                            ? null
                            : l10n.emailInvalid,
                        onChanged: (_) => setState(() => _error = null),
                      ),
                      const SizedBox(height: AppSpacing.md),
                      _AuthTextField(
                        controller: _passwordController,
                        label: l10n.password,
                        hint: l10n.passwordHint,
                        icon: Icons.lock_outline_rounded,
                        obscureText: !_passwordVisible,
                        validator: (value) => (value ?? '').length >= 6
                            ? null
                            : l10n.passwordInvalid,
                        onChanged: (_) => setState(() => _error = null),
                        suffix: IconButton(
                          tooltip: _passwordVisible
                              ? l10n.hidePassword
                              : l10n.showPassword,
                          onPressed: () => setState(
                            () => _passwordVisible = !_passwordVisible,
                          ),
                          icon: Icon(
                            _passwordVisible
                                ? Icons.visibility_off_rounded
                                : Icons.visibility_rounded,
                          ),
                        ),
                      ),
                      if (!widget.isSignUp)
                        Padding(
                          padding: const EdgeInsets.only(top: AppSpacing.xs),
                          child: Row(
                            children: [
                              SizedBox(
                                width: 32,
                                child: Checkbox(
                                  value: _keepSignedIn,
                                  onChanged: (value) => setState(
                                    () => _keepSignedIn = value ?? false,
                                  ),
                                  activeColor: AppColors.green,
                                ),
                              ),
                              Expanded(child: Text(l10n.keepSignedIn)),
                              TextButton(
                                onPressed: () => ScaffoldMessenger.of(context)
                                  ..hideCurrentSnackBar()
                                  ..showSnackBar(
                                    SnackBar(
                                      content: Text(l10n.resetPasswordMock),
                                    ),
                                  ),
                                child: Text(l10n.forgotPassword),
                              ),
                            ],
                          ),
                        )
                      else
                        const SizedBox(height: AppSpacing.lg),
                      if (_error != null) ...[
                        const SizedBox(height: AppSpacing.sm),
                        Text(
                          _error!,
                          style: const TextStyle(color: AppColors.orange),
                        ),
                      ],
                      const SizedBox(height: AppSpacing.md),
                      PrimaryButton(
                        label: widget.isSignUp
                            ? l10n.createAccount
                            : l10n.logIn,
                        onPressed: !_isSubmitting && _credentialsValid
                            ? _submit
                            : null,
                        trailingIcon: Icons.arrow_forward_rounded,
                        isLoading: _isSubmitting,
                      ),
                      const SizedBox(height: AppSpacing.md),
                      Center(
                        child: Wrap(
                          alignment: WrapAlignment.center,
                          crossAxisAlignment: WrapCrossAlignment.center,
                          children: [
                            Text(
                              widget.isSignUp
                                  ? l10n.alreadyHaveAccount
                                  : l10n.noAccountYet,
                            ),
                            TextButton(
                              onPressed: () => context.goNamed(
                                widget.isSignUp
                                    ? AppRouteNames.login
                                    : AppRouteNames.createAccount,
                              ),
                              child: Text(
                                widget.isSignUp
                                    ? l10n.logIn
                                    : l10n.createAccount,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AuthTextField extends StatelessWidget {
  const _AuthTextField({
    required this.controller,
    required this.label,
    required this.hint,
    required this.icon,
    this.keyboardType,
    this.obscureText = false,
    this.validator,
    this.onChanged,
    this.suffix,
  });

  final TextEditingController controller;
  final String label;
  final String hint;
  final IconData icon;
  final TextInputType? keyboardType;
  final bool obscureText;
  final FormFieldValidator<String>? validator;
  final ValueChanged<String>? onChanged;
  final Widget? suffix;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      obscureText: obscureText,
      validator: validator,
      onChanged: onChanged,
      decoration: InputDecoration(
        labelText: label,
        hintText: hint,
        prefixIcon: Icon(icon, color: AppColors.muted),
        suffixIcon: suffix,
        filled: true,
        fillColor: AppColors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.card),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.card),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.card),
          borderSide: const BorderSide(
            color: AppColors.green,
            width: AppSizes.focusedBorderStroke,
          ),
        ),
      ),
    );
  }
}

class _CategoryChip extends StatelessWidget {
  const _CategoryChip({required this.icon, required this.label});
  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) => Chip(
    avatar: Icon(icon, size: AppIconSize.small, color: AppColors.green),
    label: Text(label),
    backgroundColor: AppColors.white,
    side: const BorderSide(color: AppColors.border),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(AppRadius.chip),
    ),
  );
}

class _FarmlyMark extends StatelessWidget {
  const _FarmlyMark();

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: BoxDecoration(
      color: AppColors.white.withValues(alpha: .88),
      borderRadius: BorderRadius.circular(AppRadius.pill),
    ),
    child: Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.spa_rounded,
            color: AppColors.green,
            size: AppIconSize.mediumSmall,
          ),
          const SizedBox(width: AppSpacing.xs),
          Text(
            AppLocalizations.of(context).farmly,
            style: const TextStyle(
              color: AppColors.dark,
              fontWeight: FontWeight.w800,
            ),
          ),
        ],
      ),
    ),
  );
}

class _LocaleToggle extends ConsumerWidget {
  const _LocaleToggle();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final isEnglish = Localizations.localeOf(context).languageCode == 'en';
    return TextButton(
      onPressed: ref.read(localeProvider.notifier).toggle,
      style: TextButton.styleFrom(
        backgroundColor: AppColors.white.withValues(alpha: .88),
        foregroundColor: AppColors.green,
        minimumSize: const Size(
          AppSizes.localeToggleWidth,
          AppSizes.localeToggleHeight,
        ),
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.sm),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.pill),
        ),
      ),
      child: Text(isEnglish ? l10n.switchToArabic : l10n.switchToEnglish),
    );
  }
}
