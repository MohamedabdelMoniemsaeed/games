# Green Valley Farm

A bilingual (English/Arabic) Material 3 farm-management app built with
Flutter. Its current stage uses local mock repositories and has no backend.

## Run

```powershell
flutter pub get
flutter run
```

The app starts with an illustrated splash screen, then shows onboarding on
first launch. Continue as a guest or sign in/create an account with any valid
email address and a password of at least six characters. Authentication and
dashboard content use local mock repositories; onboarding and the optional
signed-in session are stored with `shared_preferences`.

Use the `AR` / `EN` button during onboarding/sign-in or in the Farm header to
switch the interface and layout direction.

## Generate localizations

English and Arabic strings live in `lib/core/l10n/app_en.arb` and
`lib/core/l10n/app_ar.arb`. After editing an ARB file, generate the strongly
typed localization classes with:

```powershell
flutter gen-l10n
```

## Project structure

- `lib/core/` — app theme and design tokens, generated localization, locale
  state, named routes, and shared widgets.
- `lib/features/auth/` — mock authentication repository, persisted session
  state, and splash/onboarding/login/create-account screens.
- `lib/features/home/` — mock dashboard repository, task state, and the
  localized farm-health and activity dashboard.
- `lib/features/` — Farm, Livestock, Analytics, Harvest, and Profile grouped
  by presentation, domain, and data concerns.
- `lib/features/weather/` — animated, custom-painted weather scenes, live demo
  conditions, weather statistics, and forecast-based farm recommendations.
- Analytics, Harvest, and Profile provide localized mock-backed summaries,
  harvest status updates, and language/theme/notification settings. Livestock
  rows open animal details with health, vaccination, and weight information.
- `lib/features/*/data/mock_*_repository.dart` — local mock data sources;
  feature providers expose their data and UI selection state through Riverpod.
- `lib/features/farm/presentation/farm_map_painter.dart` — the custom-painted
  portrait farm map and its hit-testable zone geometry.
- `lib/features/weather/presentation/weather_screen.dart` — the weather
  illustration and condition-driven forecast experience.

## Validate

```powershell
flutter analyze
flutter test
```
