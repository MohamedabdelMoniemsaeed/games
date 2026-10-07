import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_ar.dart';
import 'app_localizations_en.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'generated/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('ar'),
    Locale('en'),
  ];

  /// No description provided for @appTitle.
  ///
  /// In en, this message translates to:
  /// **'Green Valley Farm'**
  String get appTitle;

  /// No description provided for @home.
  ///
  /// In en, this message translates to:
  /// **'Home'**
  String get home;

  /// No description provided for @homeSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Farm management, all in one place'**
  String get homeSubtitle;

  /// No description provided for @farm.
  ///
  /// In en, this message translates to:
  /// **'Farm'**
  String get farm;

  /// No description provided for @livestockTitle.
  ///
  /// In en, this message translates to:
  /// **'Livestock'**
  String get livestockTitle;

  /// No description provided for @livestockSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Green Valley Farm'**
  String get livestockSubtitle;

  /// No description provided for @switchToArabic.
  ///
  /// In en, this message translates to:
  /// **'AR'**
  String get switchToArabic;

  /// No description provided for @switchToEnglish.
  ///
  /// In en, this message translates to:
  /// **'EN'**
  String get switchToEnglish;

  /// No description provided for @analytics.
  ///
  /// In en, this message translates to:
  /// **'Analytics'**
  String get analytics;

  /// No description provided for @harvest.
  ///
  /// In en, this message translates to:
  /// **'Harvest'**
  String get harvest;

  /// No description provided for @profile.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get profile;

  /// No description provided for @myFarm.
  ///
  /// In en, this message translates to:
  /// **'My Farm'**
  String get myFarm;

  /// No description provided for @farmLocation.
  ///
  /// In en, this message translates to:
  /// **'Green Valley Farm · 12.5 ha'**
  String get farmLocation;

  /// No description provided for @overview.
  ///
  /// In en, this message translates to:
  /// **'Overview'**
  String get overview;

  /// No description provided for @farmHouse.
  ///
  /// In en, this message translates to:
  /// **'Farm House'**
  String get farmHouse;

  /// No description provided for @tomatoField.
  ///
  /// In en, this message translates to:
  /// **'Tomato Field'**
  String get tomatoField;

  /// No description provided for @vegetableField.
  ///
  /// In en, this message translates to:
  /// **'Vegetable Field'**
  String get vegetableField;

  /// No description provided for @cornField.
  ///
  /// In en, this message translates to:
  /// **'Corn Field'**
  String get cornField;

  /// No description provided for @animalArea.
  ///
  /// In en, this message translates to:
  /// **'Animal Area'**
  String get animalArea;

  /// No description provided for @waterTank.
  ///
  /// In en, this message translates to:
  /// **'Water Tank'**
  String get waterTank;

  /// No description provided for @cropTomatoes.
  ///
  /// In en, this message translates to:
  /// **'Crop: Tomatoes'**
  String get cropTomatoes;

  /// No description provided for @cropLettuce.
  ///
  /// In en, this message translates to:
  /// **'Crop: Lettuce + Carrots'**
  String get cropLettuce;

  /// No description provided for @cropCorn.
  ///
  /// In en, this message translates to:
  /// **'Crop: Sweet corn'**
  String get cropCorn;

  /// No description provided for @houseSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Home · 2 floors'**
  String get houseSubtitle;

  /// No description provided for @animalsSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Pasture · 48 animals'**
  String get animalsSubtitle;

  /// No description provided for @waterSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Irrigation reserve'**
  String get waterSubtitle;

  /// No description provided for @excellent.
  ///
  /// In en, this message translates to:
  /// **'Excellent'**
  String get excellent;

  /// No description provided for @good.
  ///
  /// In en, this message translates to:
  /// **'Good'**
  String get good;

  /// No description provided for @healthy.
  ///
  /// In en, this message translates to:
  /// **'Healthy'**
  String get healthy;

  /// No description provided for @allHealthy.
  ///
  /// In en, this message translates to:
  /// **'All healthy'**
  String get allHealthy;

  /// No description provided for @growth.
  ///
  /// In en, this message translates to:
  /// **'Growth'**
  String get growth;

  /// No description provided for @tapExplore.
  ///
  /// In en, this message translates to:
  /// **'Tap an area to explore'**
  String get tapExplore;

  /// No description provided for @farmSummary.
  ///
  /// In en, this message translates to:
  /// **'7 zones · 4 crops · 48 animals'**
  String get farmSummary;

  /// No description provided for @farmSummaryValues.
  ///
  /// In en, this message translates to:
  /// **'{zones} zones · {crops} crops · {animals} animals'**
  String farmSummaryValues(String zones, String crops, String animals);

  /// No description provided for @zoneUnavailable.
  ///
  /// In en, this message translates to:
  /// **'This area is not available right now.'**
  String get zoneUnavailable;

  /// No description provided for @noAnimalSamples.
  ///
  /// In en, this message translates to:
  /// **'There are no sample animals in this group.'**
  String get noAnimalSamples;

  /// No description provided for @size.
  ///
  /// In en, this message translates to:
  /// **'Size'**
  String get size;

  /// No description provided for @type.
  ///
  /// In en, this message translates to:
  /// **'Type'**
  String get type;

  /// No description provided for @rooms.
  ///
  /// In en, this message translates to:
  /// **'Rooms'**
  String get rooms;

  /// No description provided for @residential.
  ///
  /// In en, this message translates to:
  /// **'Residential'**
  String get residential;

  /// No description provided for @houseSize.
  ///
  /// In en, this message translates to:
  /// **'0.18 ha'**
  String get houseSize;

  /// No description provided for @roomsValue.
  ///
  /// In en, this message translates to:
  /// **'5'**
  String get roomsValue;

  /// No description provided for @animalCount.
  ///
  /// In en, this message translates to:
  /// **'Animals'**
  String get animalCount;

  /// No description provided for @health.
  ///
  /// In en, this message translates to:
  /// **'Health'**
  String get health;

  /// No description provided for @feed.
  ///
  /// In en, this message translates to:
  /// **'Feed'**
  String get feed;

  /// No description provided for @production.
  ///
  /// In en, this message translates to:
  /// **'Production'**
  String get production;

  /// No description provided for @nextFeed.
  ///
  /// In en, this message translates to:
  /// **'Next feed'**
  String get nextFeed;

  /// No description provided for @level.
  ///
  /// In en, this message translates to:
  /// **'Level'**
  String get level;

  /// No description provided for @stored.
  ///
  /// In en, this message translates to:
  /// **'Stored'**
  String get stored;

  /// No description provided for @usedToday.
  ///
  /// In en, this message translates to:
  /// **'Used today'**
  String get usedToday;

  /// No description provided for @storedLiters.
  ///
  /// In en, this message translates to:
  /// **'8,200 L'**
  String get storedLiters;

  /// No description provided for @usedLiters.
  ///
  /// In en, this message translates to:
  /// **'1,240 L'**
  String get usedLiters;

  /// No description provided for @litersValue.
  ///
  /// In en, this message translates to:
  /// **'{value} L'**
  String litersValue(String value);

  /// No description provided for @waterLevel.
  ///
  /// In en, this message translates to:
  /// **'82%'**
  String get waterLevel;

  /// No description provided for @openLivestock.
  ///
  /// In en, this message translates to:
  /// **'Open livestock'**
  String get openLivestock;

  /// No description provided for @smartWatering.
  ///
  /// In en, this message translates to:
  /// **'Smart watering'**
  String get smartWatering;

  /// No description provided for @totalHerd.
  ///
  /// In en, this message translates to:
  /// **'TOTAL HERD'**
  String get totalHerd;

  /// No description provided for @animals.
  ///
  /// In en, this message translates to:
  /// **'Animals'**
  String get animals;

  /// No description provided for @healthPercent.
  ///
  /// In en, this message translates to:
  /// **'93%'**
  String get healthPercent;

  /// No description provided for @feedPercent.
  ///
  /// In en, this message translates to:
  /// **'78%'**
  String get feedPercent;

  /// No description provided for @productionPercent.
  ///
  /// In en, this message translates to:
  /// **'84%'**
  String get productionPercent;

  /// No description provided for @twelveDaysStock.
  ///
  /// In en, this message translates to:
  /// **'12 days stock'**
  String get twelveDaysStock;

  /// No description provided for @onTarget.
  ///
  /// In en, this message translates to:
  /// **'On target'**
  String get onTarget;

  /// No description provided for @todaysFeeding.
  ///
  /// In en, this message translates to:
  /// **'Today\'s feeding'**
  String get todaysFeeding;

  /// No description provided for @oneOfThreeDone.
  ///
  /// In en, this message translates to:
  /// **'1 of 3 done'**
  String get oneOfThreeDone;

  /// No description provided for @completedFeedingCount.
  ///
  /// In en, this message translates to:
  /// **'{done} of {total} done'**
  String completedFeedingCount(String done, String total);

  /// No description provided for @haySilage.
  ///
  /// In en, this message translates to:
  /// **'Hay & silage'**
  String get haySilage;

  /// No description provided for @grainMix.
  ///
  /// In en, this message translates to:
  /// **'Grain mix'**
  String get grainMix;

  /// No description provided for @eveningFeed.
  ///
  /// In en, this message translates to:
  /// **'Evening feed'**
  String get eveningFeed;

  /// No description provided for @done.
  ///
  /// In en, this message translates to:
  /// **'Done'**
  String get done;

  /// No description provided for @upcoming.
  ///
  /// In en, this message translates to:
  /// **'Upcoming'**
  String get upcoming;

  /// No description provided for @categories.
  ///
  /// In en, this message translates to:
  /// **'Categories'**
  String get categories;

  /// No description provided for @tapGroup.
  ///
  /// In en, this message translates to:
  /// **'Tap a group to see its animals'**
  String get tapGroup;

  /// No description provided for @cows.
  ///
  /// In en, this message translates to:
  /// **'Cows'**
  String get cows;

  /// No description provided for @chickens.
  ///
  /// In en, this message translates to:
  /// **'Chickens'**
  String get chickens;

  /// No description provided for @sheep.
  ///
  /// In en, this message translates to:
  /// **'Sheep'**
  String get sheep;

  /// No description provided for @goats.
  ///
  /// In en, this message translates to:
  /// **'Goats'**
  String get goats;

  /// No description provided for @yourCows.
  ///
  /// In en, this message translates to:
  /// **'Your cows'**
  String get yourCows;

  /// No description provided for @yourChickens.
  ///
  /// In en, this message translates to:
  /// **'Your chickens'**
  String get yourChickens;

  /// No description provided for @yourSheep.
  ///
  /// In en, this message translates to:
  /// **'Your sheep'**
  String get yourSheep;

  /// No description provided for @yourGoats.
  ///
  /// In en, this message translates to:
  /// **'Your goats'**
  String get yourGoats;

  /// No description provided for @herdTapDetails.
  ///
  /// In en, this message translates to:
  /// **'{count} in the herd · tap one for details'**
  String herdTapDetails(String count);

  /// No description provided for @years.
  ///
  /// In en, this message translates to:
  /// **'years'**
  String get years;

  /// No description provided for @year.
  ///
  /// In en, this message translates to:
  /// **'year'**
  String get year;

  /// No description provided for @oneAndHalfYears.
  ///
  /// In en, this message translates to:
  /// **'1.5 years'**
  String get oneAndHalfYears;

  /// No description provided for @oneYear.
  ///
  /// In en, this message translates to:
  /// **'1 year'**
  String get oneYear;

  /// No description provided for @yearsCount.
  ///
  /// In en, this message translates to:
  /// **'{count} years'**
  String yearsCount(String count);

  /// No description provided for @percentValue.
  ///
  /// In en, this message translates to:
  /// **'{value}%'**
  String percentValue(String value);

  /// No description provided for @nameBella.
  ///
  /// In en, this message translates to:
  /// **'Bella'**
  String get nameBella;

  /// No description provided for @nameDaisy.
  ///
  /// In en, this message translates to:
  /// **'Daisy'**
  String get nameDaisy;

  /// No description provided for @nameMoose.
  ///
  /// In en, this message translates to:
  /// **'Moose'**
  String get nameMoose;

  /// No description provided for @nameClucky.
  ///
  /// In en, this message translates to:
  /// **'Clucky'**
  String get nameClucky;

  /// No description provided for @namePepper.
  ///
  /// In en, this message translates to:
  /// **'Pepper'**
  String get namePepper;

  /// No description provided for @nameFluffy.
  ///
  /// In en, this message translates to:
  /// **'Fluffy'**
  String get nameFluffy;

  /// No description provided for @nameBilly.
  ///
  /// In en, this message translates to:
  /// **'Billy'**
  String get nameBilly;

  /// No description provided for @breedHolstein.
  ///
  /// In en, this message translates to:
  /// **'Holstein-Friesian'**
  String get breedHolstein;

  /// No description provided for @breedJersey.
  ///
  /// In en, this message translates to:
  /// **'Jersey'**
  String get breedJersey;

  /// No description provided for @breedAngus.
  ///
  /// In en, this message translates to:
  /// **'Angus'**
  String get breedAngus;

  /// No description provided for @breedRhodeIsland.
  ///
  /// In en, this message translates to:
  /// **'Rhode Island Red'**
  String get breedRhodeIsland;

  /// No description provided for @breedLeghorn.
  ///
  /// In en, this message translates to:
  /// **'Leghorn'**
  String get breedLeghorn;

  /// No description provided for @breedMerino.
  ///
  /// In en, this message translates to:
  /// **'Merino'**
  String get breedMerino;

  /// No description provided for @breedBoer.
  ///
  /// In en, this message translates to:
  /// **'Boer'**
  String get breedBoer;

  /// No description provided for @farmStats.
  ///
  /// In en, this message translates to:
  /// **'Farm at a glance'**
  String get farmStats;

  /// No description provided for @welcome.
  ///
  /// In en, this message translates to:
  /// **'Good morning, farmer'**
  String get welcome;

  /// No description provided for @welcomeSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Your valley is thriving today.'**
  String get welcomeSubtitle;

  /// No description provided for @todayAtFarm.
  ///
  /// In en, this message translates to:
  /// **'Today at the farm'**
  String get todayAtFarm;

  /// No description provided for @farmOverview.
  ///
  /// In en, this message translates to:
  /// **'A quick look at your farm'**
  String get farmOverview;

  /// No description provided for @farmArea.
  ///
  /// In en, this message translates to:
  /// **'Farm size'**
  String get farmArea;

  /// No description provided for @farmAreaValue.
  ///
  /// In en, this message translates to:
  /// **'{area} ha'**
  String farmAreaValue(String area);

  /// No description provided for @loadFailed.
  ///
  /// In en, this message translates to:
  /// **'We couldn\'t load this farm information.'**
  String get loadFailed;

  /// No description provided for @livestockCard.
  ///
  /// In en, this message translates to:
  /// **'Livestock'**
  String get livestockCard;

  /// No description provided for @livestockCardSubtitle.
  ///
  /// In en, this message translates to:
  /// **'48 animals · all healthy'**
  String get livestockCardSubtitle;

  /// No description provided for @crops.
  ///
  /// In en, this message translates to:
  /// **'Crops'**
  String get crops;

  /// No description provided for @tomatoes.
  ///
  /// In en, this message translates to:
  /// **'Tomatoes'**
  String get tomatoes;

  /// No description provided for @vegetables.
  ///
  /// In en, this message translates to:
  /// **'Vegetables'**
  String get vegetables;

  /// No description provided for @sweetCorn.
  ///
  /// In en, this message translates to:
  /// **'Sweet corn'**
  String get sweetCorn;

  /// No description provided for @waterReserve.
  ///
  /// In en, this message translates to:
  /// **'Water reserve'**
  String get waterReserve;

  /// No description provided for @tomatoGrowth.
  ///
  /// In en, this message translates to:
  /// **'54%'**
  String get tomatoGrowth;

  /// No description provided for @vegetableGrowth.
  ///
  /// In en, this message translates to:
  /// **'88%'**
  String get vegetableGrowth;

  /// No description provided for @cornGrowth.
  ///
  /// In en, this message translates to:
  /// **'18%'**
  String get cornGrowth;

  /// No description provided for @farmAnalytics.
  ///
  /// In en, this message translates to:
  /// **'Farm analytics'**
  String get farmAnalytics;

  /// No description provided for @analyticsSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Insights at a glance'**
  String get analyticsSubtitle;

  /// No description provided for @harvestTitle.
  ///
  /// In en, this message translates to:
  /// **'Harvest'**
  String get harvestTitle;

  /// No description provided for @harvestSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Your next harvest is growing'**
  String get harvestSubtitle;

  /// No description provided for @profileTitle.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get profileTitle;

  /// No description provided for @profileSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Farm preferences & account'**
  String get profileSubtitle;

  /// No description provided for @back.
  ///
  /// In en, this message translates to:
  /// **'Back'**
  String get back;

  /// No description provided for @fullscreenMap.
  ///
  /// In en, this message translates to:
  /// **'View map fullscreen'**
  String get fullscreenMap;

  /// No description provided for @close.
  ///
  /// In en, this message translates to:
  /// **'Close'**
  String get close;

  /// No description provided for @smartWaterSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Irrigation is running efficiently'**
  String get smartWaterSubtitle;

  /// No description provided for @sampleUpdated.
  ///
  /// In en, this message translates to:
  /// **'Farm data · updated just now'**
  String get sampleUpdated;

  /// No description provided for @localName.
  ///
  /// In en, this message translates to:
  /// **'Green Valley Farm'**
  String get localName;

  /// No description provided for @excellentStatus.
  ///
  /// In en, this message translates to:
  /// **'Excellent'**
  String get excellentStatus;

  /// No description provided for @farmly.
  ///
  /// In en, this message translates to:
  /// **'Farmly'**
  String get farmly;

  /// No description provided for @smartFarmingSimplified.
  ///
  /// In en, this message translates to:
  /// **'Smart farming, simplified'**
  String get smartFarmingSimplified;

  /// No description provided for @onboardingTitle.
  ///
  /// In en, this message translates to:
  /// **'Your Farm, Smarter'**
  String get onboardingTitle;

  /// No description provided for @onboardingSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Manage your crops, animals, weather and farm performance in one simple app.'**
  String get onboardingSubtitle;

  /// No description provided for @weather.
  ///
  /// In en, this message translates to:
  /// **'Weather'**
  String get weather;

  /// No description provided for @insights.
  ///
  /// In en, this message translates to:
  /// **'Insights'**
  String get insights;

  /// No description provided for @getStarted.
  ///
  /// In en, this message translates to:
  /// **'Get Started'**
  String get getStarted;

  /// No description provided for @continueAsGuest.
  ///
  /// In en, this message translates to:
  /// **'Just looking around? Continue as guest'**
  String get continueAsGuest;

  /// No description provided for @authError.
  ///
  /// In en, this message translates to:
  /// **'Something went wrong. Please try again.'**
  String get authError;

  /// No description provided for @createAccount.
  ///
  /// In en, this message translates to:
  /// **'Create an account'**
  String get createAccount;

  /// No description provided for @createAccountSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Create your Farmly account to get started.'**
  String get createAccountSubtitle;

  /// No description provided for @welcomeBack.
  ///
  /// In en, this message translates to:
  /// **'Welcome back'**
  String get welcomeBack;

  /// No description provided for @loginSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Log in to check on your fields, herd and harvest.'**
  String get loginSubtitle;

  /// No description provided for @email.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get email;

  /// No description provided for @emailHint.
  ///
  /// In en, this message translates to:
  /// **'you@example.com'**
  String get emailHint;

  /// No description provided for @emailInvalid.
  ///
  /// In en, this message translates to:
  /// **'Enter a valid email address.'**
  String get emailInvalid;

  /// No description provided for @password.
  ///
  /// In en, this message translates to:
  /// **'Password'**
  String get password;

  /// No description provided for @passwordHint.
  ///
  /// In en, this message translates to:
  /// **'At least 6 characters'**
  String get passwordHint;

  /// No description provided for @passwordInvalid.
  ///
  /// In en, this message translates to:
  /// **'Use at least 6 characters.'**
  String get passwordInvalid;

  /// No description provided for @hidePassword.
  ///
  /// In en, this message translates to:
  /// **'Hide password'**
  String get hidePassword;

  /// No description provided for @showPassword.
  ///
  /// In en, this message translates to:
  /// **'Show password'**
  String get showPassword;

  /// No description provided for @keepSignedIn.
  ///
  /// In en, this message translates to:
  /// **'Keep me signed in'**
  String get keepSignedIn;

  /// No description provided for @resetPasswordMock.
  ///
  /// In en, this message translates to:
  /// **'Password reset is not available in this demo.'**
  String get resetPasswordMock;

  /// No description provided for @forgotPassword.
  ///
  /// In en, this message translates to:
  /// **'Forgot password?'**
  String get forgotPassword;

  /// No description provided for @alreadyHaveAccount.
  ///
  /// In en, this message translates to:
  /// **'Already have an account?'**
  String get alreadyHaveAccount;

  /// No description provided for @noAccountYet.
  ///
  /// In en, this message translates to:
  /// **'Don\'t have an account?'**
  String get noAccountYet;

  /// No description provided for @logIn.
  ///
  /// In en, this message translates to:
  /// **'Log in'**
  String get logIn;

  /// No description provided for @quickStats.
  ///
  /// In en, this message translates to:
  /// **'Quick Stats'**
  String get quickStats;

  /// No description provided for @quickActions.
  ///
  /// In en, this message translates to:
  /// **'Quick Actions'**
  String get quickActions;

  /// No description provided for @completedTasks.
  ///
  /// In en, this message translates to:
  /// **'{done} of {total} completed'**
  String completedTasks(String done, String total);

  /// No description provided for @todaysTasks.
  ///
  /// In en, this message translates to:
  /// **'Today\'s Tasks'**
  String get todaysTasks;

  /// No description provided for @farmHealth.
  ///
  /// In en, this message translates to:
  /// **'Farm health'**
  String get farmHealth;

  /// No description provided for @sunny.
  ///
  /// In en, this message translates to:
  /// **'Sunny'**
  String get sunny;

  /// No description provided for @healthyAllAligned.
  ///
  /// In en, this message translates to:
  /// **'Healthy · All aligned'**
  String get healthyAllAligned;

  /// No description provided for @soilMoisture.
  ///
  /// In en, this message translates to:
  /// **'Soil moisture'**
  String get soilMoisture;

  /// No description provided for @revenue.
  ///
  /// In en, this message translates to:
  /// **'Revenue'**
  String get revenue;

  /// No description provided for @tomatoNeedsWater.
  ///
  /// In en, this message translates to:
  /// **'Tomato field needs water'**
  String get tomatoNeedsWater;

  /// No description provided for @feedLivestock.
  ///
  /// In en, this message translates to:
  /// **'Feed livestock'**
  String get feedLivestock;

  /// No description provided for @nextFeedToday.
  ///
  /// In en, this message translates to:
  /// **'Next feed at 12:00'**
  String get nextFeedToday;

  /// No description provided for @addTask.
  ///
  /// In en, this message translates to:
  /// **'Add task'**
  String get addTask;

  /// No description provided for @planYourDay.
  ///
  /// In en, this message translates to:
  /// **'Plan your day'**
  String get planYourDay;

  /// No description provided for @taskAddedMock.
  ///
  /// In en, this message translates to:
  /// **'Task added to your list.'**
  String get taskAddedMock;

  /// No description provided for @waterTomatoField.
  ///
  /// In en, this message translates to:
  /// **'Water Tomato Field'**
  String get waterTomatoField;

  /// No description provided for @checkCornGrowth.
  ///
  /// In en, this message translates to:
  /// **'Check Corn Growth'**
  String get checkCornGrowth;

  /// No description provided for @prepareHarvest.
  ///
  /// In en, this message translates to:
  /// **'Prepare Harvest'**
  String get prepareHarvest;

  /// No description provided for @finance.
  ///
  /// In en, this message translates to:
  /// **'Finance'**
  String get finance;

  /// No description provided for @inventory.
  ///
  /// In en, this message translates to:
  /// **'Inventory'**
  String get inventory;

  /// No description provided for @suppliesRunningLow.
  ///
  /// In en, this message translates to:
  /// **'{count} supplies running low'**
  String suppliesRunningLow(String count);

  /// No description provided for @myFields.
  ///
  /// In en, this message translates to:
  /// **'My Fields'**
  String get myFields;

  /// No description provided for @allFields.
  ///
  /// In en, this message translates to:
  /// **'All fields'**
  String get allFields;

  /// No description provided for @needsWater.
  ///
  /// In en, this message translates to:
  /// **'Needs water'**
  String get needsWater;

  /// No description provided for @harvestWeight.
  ///
  /// In en, this message translates to:
  /// **'{weight} kg'**
  String harvestWeight(String weight);

  /// No description provided for @currencyValue.
  ///
  /// In en, this message translates to:
  /// **'\${amount} USD'**
  String currencyValue(String amount);

  /// No description provided for @tryAgain.
  ///
  /// In en, this message translates to:
  /// **'Try again'**
  String get tryAgain;

  /// No description provided for @weatherScreenTitle.
  ///
  /// In en, this message translates to:
  /// **'Weather'**
  String get weatherScreenTitle;

  /// No description provided for @refreshWeather.
  ///
  /// In en, this message translates to:
  /// **'Refresh weather'**
  String get refreshWeather;

  /// No description provided for @farmWeather.
  ///
  /// In en, this message translates to:
  /// **'Farm conditions'**
  String get farmWeather;

  /// No description provided for @weatherSunny.
  ///
  /// In en, this message translates to:
  /// **'Sunny'**
  String get weatherSunny;

  /// No description provided for @weatherClouds.
  ///
  /// In en, this message translates to:
  /// **'Clouds rolling in'**
  String get weatherClouds;

  /// No description provided for @weatherWind.
  ///
  /// In en, this message translates to:
  /// **'Wind picking up'**
  String get weatherWind;

  /// No description provided for @weatherRainshower.
  ///
  /// In en, this message translates to:
  /// **'Rainshower'**
  String get weatherRainshower;

  /// No description provided for @weatherClearingUp.
  ///
  /// In en, this message translates to:
  /// **'Clearing up'**
  String get weatherClearingUp;

  /// No description provided for @todaysConditions.
  ///
  /// In en, this message translates to:
  /// **'Today\'s conditions'**
  String get todaysConditions;

  /// No description provided for @live.
  ///
  /// In en, this message translates to:
  /// **'Live'**
  String get live;

  /// No description provided for @temperature.
  ///
  /// In en, this message translates to:
  /// **'Temperature'**
  String get temperature;

  /// No description provided for @feelsLike.
  ///
  /// In en, this message translates to:
  /// **'Feels like {value}°'**
  String feelsLike(String value);

  /// No description provided for @humidity.
  ///
  /// In en, this message translates to:
  /// **'Humidity'**
  String get humidity;

  /// No description provided for @dewPoint.
  ///
  /// In en, this message translates to:
  /// **'Dew point {value}°'**
  String dewPoint(String value);

  /// No description provided for @wind.
  ///
  /// In en, this message translates to:
  /// **'Wind'**
  String get wind;

  /// No description provided for @windSpeed.
  ///
  /// In en, this message translates to:
  /// **'{value} km/h'**
  String windSpeed(String value);

  /// No description provided for @gustsValue.
  ///
  /// In en, this message translates to:
  /// **'gusts {value}'**
  String gustsValue(String value);

  /// No description provided for @rainChance.
  ///
  /// In en, this message translates to:
  /// **'Rain chance'**
  String get rainChance;

  /// No description provided for @expectedRain.
  ///
  /// In en, this message translates to:
  /// **'{value} mm expected'**
  String expectedRain(String value);

  /// No description provided for @wellWatered.
  ///
  /// In en, this message translates to:
  /// **'Well watered'**
  String get wellWatered;

  /// No description provided for @moistureGood.
  ///
  /// In en, this message translates to:
  /// **'Moisture is good'**
  String get moistureGood;

  /// No description provided for @storedLitersValue.
  ///
  /// In en, this message translates to:
  /// **'{value} L stored'**
  String storedLitersValue(String value);

  /// No description provided for @weatherSentenceSunny.
  ///
  /// In en, this message translates to:
  /// **'Clear skies and a light breeze over the fields.'**
  String get weatherSentenceSunny;

  /// No description provided for @weatherSentenceClouds.
  ///
  /// In en, this message translates to:
  /// **'Clouds are gathering, with mild conditions across the farm.'**
  String get weatherSentenceClouds;

  /// No description provided for @weatherSentenceWind.
  ///
  /// In en, this message translates to:
  /// **'Strong winds are moving across the crops today.'**
  String get weatherSentenceWind;

  /// No description provided for @weatherSentenceRain.
  ///
  /// In en, this message translates to:
  /// **'Rain is falling over the farm and replenishing the soil.'**
  String get weatherSentenceRain;

  /// No description provided for @weatherSentenceClearing.
  ///
  /// In en, this message translates to:
  /// **'The rain is passing and sunshine is returning.'**
  String get weatherSentenceClearing;

  /// No description provided for @farmRecommendations.
  ///
  /// In en, this message translates to:
  /// **'Farm recommendations'**
  String get farmRecommendations;

  /// No description provided for @recommendationsSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Based on your crops and the forecast'**
  String get recommendationsSubtitle;

  /// No description provided for @recommendWaterTitle.
  ///
  /// In en, this message translates to:
  /// **'Watering recommended tomorrow morning'**
  String get recommendWaterTitle;

  /// No description provided for @recommendWaterBody.
  ///
  /// In en, this message translates to:
  /// **'Give the tomato field an early drink before the warmer afternoon.'**
  String get recommendWaterBody;

  /// No description provided for @recommendSkipTitle.
  ///
  /// In en, this message translates to:
  /// **'Rain expected Friday, skip irrigation'**
  String get recommendSkipTitle;

  /// No description provided for @recommendSkipBody.
  ///
  /// In en, this message translates to:
  /// **'Rain should provide enough moisture. Save water and review the soil after the shower.'**
  String get recommendSkipBody;

  /// No description provided for @recommendPlantTitle.
  ///
  /// In en, this message translates to:
  /// **'Good conditions for planting'**
  String get recommendPlantTitle;

  /// No description provided for @recommendPlantBody.
  ///
  /// In en, this message translates to:
  /// **'Mild temperatures and steady soil moisture make this a good planting window.'**
  String get recommendPlantBody;

  /// No description provided for @schedule.
  ///
  /// In en, this message translates to:
  /// **'Schedule'**
  String get schedule;

  /// No description provided for @skipIrrigation.
  ///
  /// In en, this message translates to:
  /// **'Skip irrigation'**
  String get skipIrrigation;

  /// No description provided for @plantCrop.
  ///
  /// In en, this message translates to:
  /// **'Plant a crop'**
  String get plantCrop;

  /// No description provided for @wateringScheduled.
  ///
  /// In en, this message translates to:
  /// **'Watering scheduled for tomorrow morning.'**
  String get wateringScheduled;

  /// No description provided for @irrigationSkipped.
  ///
  /// In en, this message translates to:
  /// **'Irrigation skipped for the forecast rain.'**
  String get irrigationSkipped;

  /// No description provided for @cropAddedToPlan.
  ///
  /// In en, this message translates to:
  /// **'Planting added to your farm plan.'**
  String get cropAddedToPlan;

  /// No description provided for @demoCycle.
  ///
  /// In en, this message translates to:
  /// **'Demo cycle'**
  String get demoCycle;

  /// No description provided for @north.
  ///
  /// In en, this message translates to:
  /// **'N'**
  String get north;

  /// No description provided for @northEast.
  ///
  /// In en, this message translates to:
  /// **'NE'**
  String get northEast;

  /// No description provided for @east.
  ///
  /// In en, this message translates to:
  /// **'E'**
  String get east;

  /// No description provided for @southEast.
  ///
  /// In en, this message translates to:
  /// **'SE'**
  String get southEast;

  /// No description provided for @south.
  ///
  /// In en, this message translates to:
  /// **'S'**
  String get south;

  /// No description provided for @southWest.
  ///
  /// In en, this message translates to:
  /// **'SW'**
  String get southWest;

  /// No description provided for @west.
  ///
  /// In en, this message translates to:
  /// **'W'**
  String get west;

  /// No description provided for @northWest.
  ///
  /// In en, this message translates to:
  /// **'NW'**
  String get northWest;

  /// No description provided for @analyticsPeriodWeek.
  ///
  /// In en, this message translates to:
  /// **'Week'**
  String get analyticsPeriodWeek;

  /// No description provided for @analyticsPeriodMonth.
  ///
  /// In en, this message translates to:
  /// **'Month'**
  String get analyticsPeriodMonth;

  /// No description provided for @analyticsPeriodSeason.
  ///
  /// In en, this message translates to:
  /// **'Season'**
  String get analyticsPeriodSeason;

  /// No description provided for @productionOverview.
  ///
  /// In en, this message translates to:
  /// **'Production overview'**
  String get productionOverview;

  /// No description provided for @cropComparison.
  ///
  /// In en, this message translates to:
  /// **'Crop comparison'**
  String get cropComparison;

  /// No description provided for @avgYield.
  ///
  /// In en, this message translates to:
  /// **'Avg. yield'**
  String get avgYield;

  /// No description provided for @waterEfficiency.
  ///
  /// In en, this message translates to:
  /// **'Water efficiency'**
  String get waterEfficiency;

  /// No description provided for @farmScore.
  ///
  /// In en, this message translates to:
  /// **'Farm score'**
  String get farmScore;

  /// No description provided for @analyticsYield.
  ///
  /// In en, this message translates to:
  /// **'Yield'**
  String get analyticsYield;

  /// No description provided for @yieldUnit.
  ///
  /// In en, this message translates to:
  /// **'kg'**
  String get yieldUnit;

  /// No description provided for @harvestSchedule.
  ///
  /// In en, this message translates to:
  /// **'Harvest schedule'**
  String get harvestSchedule;

  /// No description provided for @expectedHarvest.
  ///
  /// In en, this message translates to:
  /// **'Expected harvest'**
  String get expectedHarvest;

  /// No description provided for @markHarvested.
  ///
  /// In en, this message translates to:
  /// **'Mark harvested'**
  String get markHarvested;

  /// No description provided for @harvested.
  ///
  /// In en, this message translates to:
  /// **'Harvested'**
  String get harvested;

  /// No description provided for @daysToHarvest.
  ///
  /// In en, this message translates to:
  /// **'{count} days left'**
  String daysToHarvest(String count);

  /// No description provided for @corn.
  ///
  /// In en, this message translates to:
  /// **'Corn'**
  String get corn;

  /// No description provided for @lettuce.
  ///
  /// In en, this message translates to:
  /// **'Lettuce'**
  String get lettuce;

  /// No description provided for @profileSettings.
  ///
  /// In en, this message translates to:
  /// **'Farm settings'**
  String get profileSettings;

  /// No description provided for @darkMode.
  ///
  /// In en, this message translates to:
  /// **'Dark mode'**
  String get darkMode;

  /// No description provided for @notifications.
  ///
  /// In en, this message translates to:
  /// **'Notifications'**
  String get notifications;

  /// No description provided for @aboutFarmly.
  ///
  /// In en, this message translates to:
  /// **'About Farmly'**
  String get aboutFarmly;

  /// No description provided for @versionLabel.
  ///
  /// In en, this message translates to:
  /// **'Version 1.0 · Farmly'**
  String get versionLabel;

  /// No description provided for @signOut.
  ///
  /// In en, this message translates to:
  /// **'Sign out'**
  String get signOut;

  /// No description provided for @animalDetails.
  ///
  /// In en, this message translates to:
  /// **'Animal details'**
  String get animalDetails;

  /// No description provided for @vaccinationHistory.
  ///
  /// In en, this message translates to:
  /// **'Vaccination history'**
  String get vaccinationHistory;

  /// No description provided for @weightHistory.
  ///
  /// In en, this message translates to:
  /// **'Weight history'**
  String get weightHistory;

  /// No description provided for @addNote.
  ///
  /// In en, this message translates to:
  /// **'Add note'**
  String get addNote;

  /// No description provided for @animalHealth.
  ///
  /// In en, this message translates to:
  /// **'Health'**
  String get animalHealth;

  /// No description provided for @weightKg.
  ///
  /// In en, this message translates to:
  /// **'Weight (kg)'**
  String get weightKg;

  /// No description provided for @vaccinationDate.
  ///
  /// In en, this message translates to:
  /// **'{date} · {vaccine}'**
  String vaccinationDate(String date, String vaccine);

  /// No description provided for @noteTitle.
  ///
  /// In en, this message translates to:
  /// **'Add a note'**
  String get noteTitle;

  /// No description provided for @noteHint.
  ///
  /// In en, this message translates to:
  /// **'Write a note about this animal'**
  String get noteHint;

  /// No description provided for @cancel.
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get cancel;

  /// No description provided for @saveNote.
  ///
  /// In en, this message translates to:
  /// **'Save note'**
  String get saveNote;

  /// No description provided for @noteSaved.
  ///
  /// In en, this message translates to:
  /// **'Note saved'**
  String get noteSaved;

  /// No description provided for @themeLight.
  ///
  /// In en, this message translates to:
  /// **'Light'**
  String get themeLight;

  /// No description provided for @themeDark.
  ///
  /// In en, this message translates to:
  /// **'Dark'**
  String get themeDark;

  /// No description provided for @language.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get language;

  /// No description provided for @english.
  ///
  /// In en, this message translates to:
  /// **'English'**
  String get english;

  /// No description provided for @arabic.
  ///
  /// In en, this message translates to:
  /// **'Arabic'**
  String get arabic;

  /// No description provided for @enabled.
  ///
  /// In en, this message translates to:
  /// **'Enabled'**
  String get enabled;

  /// No description provided for @disabled.
  ///
  /// In en, this message translates to:
  /// **'Disabled'**
  String get disabled;

  /// No description provided for @needsAttention.
  ///
  /// In en, this message translates to:
  /// **'Needs attention'**
  String get needsAttention;

  /// No description provided for @rabiesVaccine.
  ///
  /// In en, this message translates to:
  /// **'Rabies vaccination'**
  String get rabiesVaccine;

  /// No description provided for @clostridialVaccine.
  ///
  /// In en, this message translates to:
  /// **'Clostridial booster'**
  String get clostridialVaccine;

  /// No description provided for @boosterVaccine.
  ///
  /// In en, this message translates to:
  /// **'Annual booster'**
  String get boosterVaccine;

  /// No description provided for @cow.
  ///
  /// In en, this message translates to:
  /// **'Cow'**
  String get cow;

  /// No description provided for @chicken.
  ///
  /// In en, this message translates to:
  /// **'Chicken'**
  String get chicken;

  /// No description provided for @sheepAnimal.
  ///
  /// In en, this message translates to:
  /// **'Sheep'**
  String get sheepAnimal;

  /// No description provided for @goat.
  ///
  /// In en, this message translates to:
  /// **'Goat'**
  String get goat;

  /// No description provided for @countAnimals.
  ///
  /// In en, this message translates to:
  /// **'{count} animals'**
  String countAnimals(String count);

  /// No description provided for @feedDone.
  ///
  /// In en, this message translates to:
  /// **'Done'**
  String get feedDone;

  /// No description provided for @statusExcellent.
  ///
  /// In en, this message translates to:
  /// **'Excellent'**
  String get statusExcellent;

  /// No description provided for @animalTag.
  ///
  /// In en, this message translates to:
  /// **'{tag}'**
  String animalTag(String tag);
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['ar', 'en'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'ar':
      return AppLocalizationsAr();
    case 'en':
      return AppLocalizationsEn();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
