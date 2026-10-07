// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'Green Valley Farm';

  @override
  String get home => 'Home';

  @override
  String get homeSubtitle => 'Farm management, all in one place';

  @override
  String get farm => 'Farm';

  @override
  String get livestockTitle => 'Livestock';

  @override
  String get livestockSubtitle => 'Green Valley Farm';

  @override
  String get switchToArabic => 'AR';

  @override
  String get switchToEnglish => 'EN';

  @override
  String get analytics => 'Analytics';

  @override
  String get harvest => 'Harvest';

  @override
  String get profile => 'Profile';

  @override
  String get myFarm => 'My Farm';

  @override
  String get farmLocation => 'Green Valley Farm · 12.5 ha';

  @override
  String get overview => 'Overview';

  @override
  String get farmHouse => 'Farm House';

  @override
  String get tomatoField => 'Tomato Field';

  @override
  String get vegetableField => 'Vegetable Field';

  @override
  String get cornField => 'Corn Field';

  @override
  String get animalArea => 'Animal Area';

  @override
  String get waterTank => 'Water Tank';

  @override
  String get cropTomatoes => 'Crop: Tomatoes';

  @override
  String get cropLettuce => 'Crop: Lettuce + Carrots';

  @override
  String get cropCorn => 'Crop: Sweet corn';

  @override
  String get houseSubtitle => 'Home · 2 floors';

  @override
  String get animalsSubtitle => 'Pasture · 48 animals';

  @override
  String get waterSubtitle => 'Irrigation reserve';

  @override
  String get excellent => 'Excellent';

  @override
  String get good => 'Good';

  @override
  String get healthy => 'Healthy';

  @override
  String get allHealthy => 'All healthy';

  @override
  String get growth => 'Growth';

  @override
  String get tapExplore => 'Tap an area to explore';

  @override
  String get farmSummary => '7 zones · 4 crops · 48 animals';

  @override
  String farmSummaryValues(String zones, String crops, String animals) {
    return '$zones zones · $crops crops · $animals animals';
  }

  @override
  String get zoneUnavailable => 'This area is not available right now.';

  @override
  String get noAnimalSamples => 'There are no sample animals in this group.';

  @override
  String get size => 'Size';

  @override
  String get type => 'Type';

  @override
  String get rooms => 'Rooms';

  @override
  String get residential => 'Residential';

  @override
  String get houseSize => '0.18 ha';

  @override
  String get roomsValue => '5';

  @override
  String get animalCount => 'Animals';

  @override
  String get health => 'Health';

  @override
  String get feed => 'Feed';

  @override
  String get production => 'Production';

  @override
  String get nextFeed => 'Next feed';

  @override
  String get level => 'Level';

  @override
  String get stored => 'Stored';

  @override
  String get usedToday => 'Used today';

  @override
  String get storedLiters => '8,200 L';

  @override
  String get usedLiters => '1,240 L';

  @override
  String litersValue(String value) {
    return '$value L';
  }

  @override
  String get waterLevel => '82%';

  @override
  String get openLivestock => 'Open livestock';

  @override
  String get smartWatering => 'Smart watering';

  @override
  String get totalHerd => 'TOTAL HERD';

  @override
  String get animals => 'Animals';

  @override
  String get healthPercent => '93%';

  @override
  String get feedPercent => '78%';

  @override
  String get productionPercent => '84%';

  @override
  String get twelveDaysStock => '12 days stock';

  @override
  String get onTarget => 'On target';

  @override
  String get todaysFeeding => 'Today\'s feeding';

  @override
  String get oneOfThreeDone => '1 of 3 done';

  @override
  String completedFeedingCount(String done, String total) {
    return '$done of $total done';
  }

  @override
  String get haySilage => 'Hay & silage';

  @override
  String get grainMix => 'Grain mix';

  @override
  String get eveningFeed => 'Evening feed';

  @override
  String get done => 'Done';

  @override
  String get upcoming => 'Upcoming';

  @override
  String get categories => 'Categories';

  @override
  String get tapGroup => 'Tap a group to see its animals';

  @override
  String get cows => 'Cows';

  @override
  String get chickens => 'Chickens';

  @override
  String get sheep => 'Sheep';

  @override
  String get goats => 'Goats';

  @override
  String get yourCows => 'Your cows';

  @override
  String get yourChickens => 'Your chickens';

  @override
  String get yourSheep => 'Your sheep';

  @override
  String get yourGoats => 'Your goats';

  @override
  String herdTapDetails(String count) {
    return '$count in the herd · tap one for details';
  }

  @override
  String get years => 'years';

  @override
  String get year => 'year';

  @override
  String get oneAndHalfYears => '1.5 years';

  @override
  String get oneYear => '1 year';

  @override
  String yearsCount(String count) {
    return '$count years';
  }

  @override
  String percentValue(String value) {
    return '$value%';
  }

  @override
  String get nameBella => 'Bella';

  @override
  String get nameDaisy => 'Daisy';

  @override
  String get nameMoose => 'Moose';

  @override
  String get nameClucky => 'Clucky';

  @override
  String get namePepper => 'Pepper';

  @override
  String get nameFluffy => 'Fluffy';

  @override
  String get nameBilly => 'Billy';

  @override
  String get breedHolstein => 'Holstein-Friesian';

  @override
  String get breedJersey => 'Jersey';

  @override
  String get breedAngus => 'Angus';

  @override
  String get breedRhodeIsland => 'Rhode Island Red';

  @override
  String get breedLeghorn => 'Leghorn';

  @override
  String get breedMerino => 'Merino';

  @override
  String get breedBoer => 'Boer';

  @override
  String get farmStats => 'Farm at a glance';

  @override
  String get welcome => 'Good morning, farmer';

  @override
  String get welcomeSubtitle => 'Your valley is thriving today.';

  @override
  String get todayAtFarm => 'Today at the farm';

  @override
  String get farmOverview => 'A quick look at your farm';

  @override
  String get farmArea => 'Farm size';

  @override
  String farmAreaValue(String area) {
    return '$area ha';
  }

  @override
  String get loadFailed => 'We couldn\'t load this farm information.';

  @override
  String get livestockCard => 'Livestock';

  @override
  String get livestockCardSubtitle => '48 animals · all healthy';

  @override
  String get crops => 'Crops';

  @override
  String get tomatoes => 'Tomatoes';

  @override
  String get vegetables => 'Vegetables';

  @override
  String get sweetCorn => 'Sweet corn';

  @override
  String get waterReserve => 'Water reserve';

  @override
  String get tomatoGrowth => '54%';

  @override
  String get vegetableGrowth => '88%';

  @override
  String get cornGrowth => '18%';

  @override
  String get farmAnalytics => 'Farm analytics';

  @override
  String get analyticsSubtitle => 'Insights at a glance';

  @override
  String get harvestTitle => 'Harvest';

  @override
  String get harvestSubtitle => 'Your next harvest is growing';

  @override
  String get profileTitle => 'Profile';

  @override
  String get profileSubtitle => 'Farm preferences & account';

  @override
  String get back => 'Back';

  @override
  String get fullscreenMap => 'View map fullscreen';

  @override
  String get close => 'Close';

  @override
  String get smartWaterSubtitle => 'Irrigation is running efficiently';

  @override
  String get sampleUpdated => 'Farm data · updated just now';

  @override
  String get localName => 'Green Valley Farm';

  @override
  String get excellentStatus => 'Excellent';

  @override
  String get farmly => 'Farmly';

  @override
  String get smartFarmingSimplified => 'Smart farming, simplified';

  @override
  String get onboardingTitle => 'Your Farm, Smarter';

  @override
  String get onboardingSubtitle =>
      'Manage your crops, animals, weather and farm performance in one simple app.';

  @override
  String get weather => 'Weather';

  @override
  String get insights => 'Insights';

  @override
  String get getStarted => 'Get Started';

  @override
  String get continueAsGuest => 'Just looking around? Continue as guest';

  @override
  String get authError => 'Something went wrong. Please try again.';

  @override
  String get createAccount => 'Create an account';

  @override
  String get createAccountSubtitle =>
      'Create your Farmly account to get started.';

  @override
  String get welcomeBack => 'Welcome back';

  @override
  String get loginSubtitle =>
      'Log in to check on your fields, herd and harvest.';

  @override
  String get email => 'Email';

  @override
  String get emailHint => 'you@example.com';

  @override
  String get emailInvalid => 'Enter a valid email address.';

  @override
  String get password => 'Password';

  @override
  String get passwordHint => 'At least 6 characters';

  @override
  String get passwordInvalid => 'Use at least 6 characters.';

  @override
  String get hidePassword => 'Hide password';

  @override
  String get showPassword => 'Show password';

  @override
  String get keepSignedIn => 'Keep me signed in';

  @override
  String get resetPasswordMock =>
      'Password reset is not available in this demo.';

  @override
  String get forgotPassword => 'Forgot password?';

  @override
  String get alreadyHaveAccount => 'Already have an account?';

  @override
  String get noAccountYet => 'Don\'t have an account?';

  @override
  String get logIn => 'Log in';

  @override
  String get quickStats => 'Quick Stats';

  @override
  String get quickActions => 'Quick Actions';

  @override
  String completedTasks(String done, String total) {
    return '$done of $total completed';
  }

  @override
  String get todaysTasks => 'Today\'s Tasks';

  @override
  String get farmHealth => 'Farm health';

  @override
  String get sunny => 'Sunny';

  @override
  String get healthyAllAligned => 'Healthy · All aligned';

  @override
  String get soilMoisture => 'Soil moisture';

  @override
  String get revenue => 'Revenue';

  @override
  String get tomatoNeedsWater => 'Tomato field needs water';

  @override
  String get feedLivestock => 'Feed livestock';

  @override
  String get nextFeedToday => 'Next feed at 12:00';

  @override
  String get addTask => 'Add task';

  @override
  String get planYourDay => 'Plan your day';

  @override
  String get taskAddedMock => 'Task added to your list.';

  @override
  String get waterTomatoField => 'Water Tomato Field';

  @override
  String get checkCornGrowth => 'Check Corn Growth';

  @override
  String get prepareHarvest => 'Prepare Harvest';

  @override
  String get finance => 'Finance';

  @override
  String get inventory => 'Inventory';

  @override
  String suppliesRunningLow(String count) {
    return '$count supplies running low';
  }

  @override
  String get myFields => 'My Fields';

  @override
  String get allFields => 'All fields';

  @override
  String get needsWater => 'Needs water';

  @override
  String harvestWeight(String weight) {
    return '$weight kg';
  }

  @override
  String currencyValue(String amount) {
    return '\$$amount USD';
  }

  @override
  String get tryAgain => 'Try again';

  @override
  String get weatherScreenTitle => 'Weather';

  @override
  String get refreshWeather => 'Refresh weather';

  @override
  String get farmWeather => 'Farm conditions';

  @override
  String get weatherSunny => 'Sunny';

  @override
  String get weatherClouds => 'Clouds rolling in';

  @override
  String get weatherWind => 'Wind picking up';

  @override
  String get weatherRainshower => 'Rainshower';

  @override
  String get weatherClearingUp => 'Clearing up';

  @override
  String get todaysConditions => 'Today\'s conditions';

  @override
  String get live => 'Live';

  @override
  String get temperature => 'Temperature';

  @override
  String feelsLike(String value) {
    return 'Feels like $value°';
  }

  @override
  String get humidity => 'Humidity';

  @override
  String dewPoint(String value) {
    return 'Dew point $value°';
  }

  @override
  String get wind => 'Wind';

  @override
  String windSpeed(String value) {
    return '$value km/h';
  }

  @override
  String gustsValue(String value) {
    return 'gusts $value';
  }

  @override
  String get rainChance => 'Rain chance';

  @override
  String expectedRain(String value) {
    return '$value mm expected';
  }

  @override
  String get wellWatered => 'Well watered';

  @override
  String get moistureGood => 'Moisture is good';

  @override
  String storedLitersValue(String value) {
    return '$value L stored';
  }

  @override
  String get weatherSentenceSunny =>
      'Clear skies and a light breeze over the fields.';

  @override
  String get weatherSentenceClouds =>
      'Clouds are gathering, with mild conditions across the farm.';

  @override
  String get weatherSentenceWind =>
      'Strong winds are moving across the crops today.';

  @override
  String get weatherSentenceRain =>
      'Rain is falling over the farm and replenishing the soil.';

  @override
  String get weatherSentenceClearing =>
      'The rain is passing and sunshine is returning.';

  @override
  String get farmRecommendations => 'Farm recommendations';

  @override
  String get recommendationsSubtitle => 'Based on your crops and the forecast';

  @override
  String get recommendWaterTitle => 'Watering recommended tomorrow morning';

  @override
  String get recommendWaterBody =>
      'Give the tomato field an early drink before the warmer afternoon.';

  @override
  String get recommendSkipTitle => 'Rain expected Friday, skip irrigation';

  @override
  String get recommendSkipBody =>
      'Rain should provide enough moisture. Save water and review the soil after the shower.';

  @override
  String get recommendPlantTitle => 'Good conditions for planting';

  @override
  String get recommendPlantBody =>
      'Mild temperatures and steady soil moisture make this a good planting window.';

  @override
  String get schedule => 'Schedule';

  @override
  String get skipIrrigation => 'Skip irrigation';

  @override
  String get plantCrop => 'Plant a crop';

  @override
  String get wateringScheduled => 'Watering scheduled for tomorrow morning.';

  @override
  String get irrigationSkipped => 'Irrigation skipped for the forecast rain.';

  @override
  String get cropAddedToPlan => 'Planting added to your farm plan.';

  @override
  String get demoCycle => 'Demo cycle';

  @override
  String get north => 'N';

  @override
  String get northEast => 'NE';

  @override
  String get east => 'E';

  @override
  String get southEast => 'SE';

  @override
  String get south => 'S';

  @override
  String get southWest => 'SW';

  @override
  String get west => 'W';

  @override
  String get northWest => 'NW';

  @override
  String get analyticsPeriodWeek => 'Week';

  @override
  String get analyticsPeriodMonth => 'Month';

  @override
  String get analyticsPeriodSeason => 'Season';

  @override
  String get productionOverview => 'Production overview';

  @override
  String get cropComparison => 'Crop comparison';

  @override
  String get avgYield => 'Avg. yield';

  @override
  String get waterEfficiency => 'Water efficiency';

  @override
  String get farmScore => 'Farm score';

  @override
  String get analyticsYield => 'Yield';

  @override
  String get yieldUnit => 'kg';

  @override
  String get harvestSchedule => 'Harvest schedule';

  @override
  String get expectedHarvest => 'Expected harvest';

  @override
  String get markHarvested => 'Mark harvested';

  @override
  String get harvested => 'Harvested';

  @override
  String daysToHarvest(String count) {
    return '$count days left';
  }

  @override
  String get corn => 'Corn';

  @override
  String get lettuce => 'Lettuce';

  @override
  String get profileSettings => 'Farm settings';

  @override
  String get darkMode => 'Dark mode';

  @override
  String get notifications => 'Notifications';

  @override
  String get aboutFarmly => 'About Farmly';

  @override
  String get versionLabel => 'Version 1.0 · Farmly';

  @override
  String get signOut => 'Sign out';

  @override
  String get animalDetails => 'Animal details';

  @override
  String get vaccinationHistory => 'Vaccination history';

  @override
  String get weightHistory => 'Weight history';

  @override
  String get addNote => 'Add note';

  @override
  String get animalHealth => 'Health';

  @override
  String get weightKg => 'Weight (kg)';

  @override
  String vaccinationDate(String date, String vaccine) {
    return '$date · $vaccine';
  }

  @override
  String get noteTitle => 'Add a note';

  @override
  String get noteHint => 'Write a note about this animal';

  @override
  String get cancel => 'Cancel';

  @override
  String get saveNote => 'Save note';

  @override
  String get noteSaved => 'Note saved';

  @override
  String get themeLight => 'Light';

  @override
  String get themeDark => 'Dark';

  @override
  String get language => 'Language';

  @override
  String get english => 'English';

  @override
  String get arabic => 'Arabic';

  @override
  String get enabled => 'Enabled';

  @override
  String get disabled => 'Disabled';

  @override
  String get needsAttention => 'Needs attention';

  @override
  String get rabiesVaccine => 'Rabies vaccination';

  @override
  String get clostridialVaccine => 'Clostridial booster';

  @override
  String get boosterVaccine => 'Annual booster';

  @override
  String get cow => 'Cow';

  @override
  String get chicken => 'Chicken';

  @override
  String get sheepAnimal => 'Sheep';

  @override
  String get goat => 'Goat';

  @override
  String countAnimals(String count) {
    return '$count animals';
  }

  @override
  String get feedDone => 'Done';

  @override
  String get statusExcellent => 'Excellent';

  @override
  String animalTag(String tag) {
    return '$tag';
  }
}
