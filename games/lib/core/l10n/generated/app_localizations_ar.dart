// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Arabic (`ar`).
class AppLocalizationsAr extends AppLocalizations {
  AppLocalizationsAr([String locale = 'ar']) : super(locale);

  @override
  String get appTitle => 'مزرعة الوادي الأخضر';

  @override
  String get home => 'الرئيسية';

  @override
  String get homeSubtitle => 'إدارة مزرعتك في مكان واحد';

  @override
  String get farm => 'المزرعة';

  @override
  String get livestockTitle => 'الماشية';

  @override
  String get livestockSubtitle => 'مزرعة الوادي الأخضر';

  @override
  String get switchToArabic => 'AR';

  @override
  String get switchToEnglish => 'EN';

  @override
  String get analytics => 'التحليلات';

  @override
  String get harvest => 'الحصاد';

  @override
  String get profile => 'الملف الشخصي';

  @override
  String get myFarm => 'مزرعتي';

  @override
  String get farmLocation => 'مزرعة الوادي الأخضر · ١٢٫٥ هكتار';

  @override
  String get overview => 'نظرة عامة';

  @override
  String get farmHouse => 'بيت المزرعة';

  @override
  String get tomatoField => 'حقل الطماطم';

  @override
  String get vegetableField => 'حقل الخضار';

  @override
  String get cornField => 'حقل الذرة';

  @override
  String get animalArea => 'منطقة الحيوانات';

  @override
  String get waterTank => 'خزان المياه';

  @override
  String get cropTomatoes => 'المحصول: طماطم';

  @override
  String get cropLettuce => 'المحاصيل: خس وجزر';

  @override
  String get cropCorn => 'المحصول: ذرة حلوة';

  @override
  String get houseSubtitle => 'المنزل · طابقان';

  @override
  String get animalsSubtitle => 'مرعى · ٤٨ حيوانًا';

  @override
  String get waterSubtitle => 'احتياطي الري';

  @override
  String get excellent => 'ممتاز';

  @override
  String get good => 'جيد';

  @override
  String get healthy => 'بصحة جيدة';

  @override
  String get allHealthy => 'الكل بصحة جيدة';

  @override
  String get growth => 'النمو';

  @override
  String get tapExplore => 'اضغط على منطقة للاستكشاف';

  @override
  String get farmSummary => '٧ مناطق · ٤ محاصيل · ٤٨ حيوانًا';

  @override
  String farmSummaryValues(String zones, String crops, String animals) {
    return '$zones مناطق · $crops محاصيل · $animals حيوانًا';
  }

  @override
  String get zoneUnavailable => 'هذه المنطقة غير متاحة الآن.';

  @override
  String get noAnimalSamples => 'لا توجد حيوانات تجريبية في هذه الفئة.';

  @override
  String get size => 'المساحة';

  @override
  String get type => 'النوع';

  @override
  String get rooms => 'الغرف';

  @override
  String get residential => 'سكني';

  @override
  String get houseSize => '٠٫١٨ هكتار';

  @override
  String get roomsValue => '٥';

  @override
  String get animalCount => 'حيوان';

  @override
  String get health => 'الصحة';

  @override
  String get feed => 'الأعلاف';

  @override
  String get production => 'الإنتاج';

  @override
  String get nextFeed => 'الوجبة التالية';

  @override
  String get level => 'المستوى';

  @override
  String get stored => 'المخزون';

  @override
  String get usedToday => 'استهلاك اليوم';

  @override
  String get storedLiters => '٨٬٢٠٠ لتر';

  @override
  String get usedLiters => '١٬٢٤٠ لتر';

  @override
  String litersValue(String value) {
    return '$value لتر';
  }

  @override
  String get waterLevel => '٨٢٪';

  @override
  String get openLivestock => 'فتح الماشية';

  @override
  String get smartWatering => 'الري الذكي';

  @override
  String get totalHerd => 'إجمالي القطيع';

  @override
  String get animals => 'حيوان';

  @override
  String get healthPercent => '٩٣٪';

  @override
  String get feedPercent => '٧٨٪';

  @override
  String get productionPercent => '٨٤٪';

  @override
  String get twelveDaysStock => 'مخزون ١٢ يومًا';

  @override
  String get onTarget => 'ضمن الهدف';

  @override
  String get todaysFeeding => 'تغذية اليوم';

  @override
  String get oneOfThreeDone => '١ من ٣ مكتملة';

  @override
  String completedFeedingCount(String done, String total) {
    return '$done من $total مكتملة';
  }

  @override
  String get haySilage => 'تبن وعلف مخمّر';

  @override
  String get grainMix => 'خليط الحبوب';

  @override
  String get eveningFeed => 'العلف المسائي';

  @override
  String get done => 'مكتمل';

  @override
  String get upcoming => 'قادم';

  @override
  String get categories => 'الفئات';

  @override
  String get tapGroup => 'اضغط على مجموعة لعرض حيواناتها';

  @override
  String get cows => 'أبقار';

  @override
  String get chickens => 'دجاج';

  @override
  String get sheep => 'أغنام';

  @override
  String get goats => 'ماعز';

  @override
  String get yourCows => 'أبقارك';

  @override
  String get yourChickens => 'دجاجك';

  @override
  String get yourSheep => 'أغنامك';

  @override
  String get yourGoats => 'ماعزك';

  @override
  String herdTapDetails(String count) {
    return '$count في القطيع · اضغط للتفاصيل';
  }

  @override
  String get years => 'سنوات';

  @override
  String get year => 'سنة';

  @override
  String get oneAndHalfYears => 'سنة ونصف';

  @override
  String get oneYear => 'سنة واحدة';

  @override
  String yearsCount(String count) {
    return '$count سنوات';
  }

  @override
  String percentValue(String value) {
    return '$value٪';
  }

  @override
  String get nameBella => 'بيلا';

  @override
  String get nameDaisy => 'ديزي';

  @override
  String get nameMoose => 'موس';

  @override
  String get nameClucky => 'كلَكي';

  @override
  String get namePepper => 'بيبر';

  @override
  String get nameFluffy => 'فلافي';

  @override
  String get nameBilly => 'بيلي';

  @override
  String get breedHolstein => 'هولشتاين فريزيان';

  @override
  String get breedJersey => 'جيرسي';

  @override
  String get breedAngus => 'أنغوس';

  @override
  String get breedRhodeIsland => 'رود آيلاند أحمر';

  @override
  String get breedLeghorn => 'ليجهورن';

  @override
  String get breedMerino => 'ميرينو';

  @override
  String get breedBoer => 'بور';

  @override
  String get farmStats => 'ملخص المزرعة';

  @override
  String get welcome => 'صباح الخير يا مزارع';

  @override
  String get welcomeSubtitle => 'واديك يزدهر اليوم.';

  @override
  String get todayAtFarm => 'اليوم في المزرعة';

  @override
  String get farmOverview => 'نظرة سريعة على مزرعتك';

  @override
  String get farmArea => 'مساحة المزرعة';

  @override
  String farmAreaValue(String area) {
    return '$area هكتار';
  }

  @override
  String get loadFailed => 'تعذر تحميل معلومات المزرعة.';

  @override
  String get livestockCard => 'الماشية';

  @override
  String get livestockCardSubtitle => '٤٨ حيوانًا · الكل بصحة جيدة';

  @override
  String get crops => 'محاصيل';

  @override
  String get tomatoes => 'الطماطم';

  @override
  String get vegetables => 'الخضروات';

  @override
  String get sweetCorn => 'الذرة الحلوة';

  @override
  String get waterReserve => 'احتياطي المياه';

  @override
  String get tomatoGrowth => '٥٤٪';

  @override
  String get vegetableGrowth => '٨٨٪';

  @override
  String get cornGrowth => '١٨٪';

  @override
  String get farmAnalytics => 'تحليلات المزرعة';

  @override
  String get analyticsSubtitle => 'لمحة عن الأداء';

  @override
  String get harvestTitle => 'الحصاد';

  @override
  String get harvestSubtitle => 'محصولك القادم ينمو';

  @override
  String get profileTitle => 'الملف الشخصي';

  @override
  String get profileSubtitle => 'إعدادات المزرعة والحساب';

  @override
  String get back => 'رجوع';

  @override
  String get fullscreenMap => 'عرض الخريطة بملء الشاشة';

  @override
  String get close => 'إغلاق';

  @override
  String get smartWaterSubtitle => 'نظام الري يعمل بكفاءة';

  @override
  String get sampleUpdated => 'بيانات المزرعة · حُدثت الآن';

  @override
  String get localName => 'مزرعة الوادي الأخضر';

  @override
  String get excellentStatus => 'ممتاز';

  @override
  String get farmly => 'فارملي';

  @override
  String get smartFarmingSimplified => 'زراعة ذكية، ببساطة';

  @override
  String get onboardingTitle => 'مزرعتك، بذكاء أكبر';

  @override
  String get onboardingSubtitle =>
      'أدر محاصيلك وحيواناتك والطقس وأداء مزرعتك من تطبيق واحد بسيط.';

  @override
  String get weather => 'الطقس';

  @override
  String get insights => 'الرؤى';

  @override
  String get getStarted => 'ابدأ الآن';

  @override
  String get continueAsGuest => 'تتصفح فقط؟ تابع كضيف';

  @override
  String get authError => 'حدث خطأ. يرجى المحاولة مرة أخرى.';

  @override
  String get createAccount => 'إنشاء حساب';

  @override
  String get createAccountSubtitle => 'أنشئ حساب فارملي للبدء.';

  @override
  String get welcomeBack => 'مرحبًا بعودتك';

  @override
  String get loginSubtitle => 'سجّل الدخول لمتابعة حقولك وقطيعك ومحصولك.';

  @override
  String get email => 'البريد الإلكتروني';

  @override
  String get emailHint => 'you@example.com';

  @override
  String get emailInvalid => 'أدخل بريدًا إلكترونيًا صالحًا.';

  @override
  String get password => 'كلمة المرور';

  @override
  String get passwordHint => '٦ أحرف على الأقل';

  @override
  String get passwordInvalid => 'استخدم ٦ أحرف على الأقل.';

  @override
  String get hidePassword => 'إخفاء كلمة المرور';

  @override
  String get showPassword => 'إظهار كلمة المرور';

  @override
  String get keepSignedIn => 'ابقني مسجلًا';

  @override
  String get resetPasswordMock =>
      'إعادة تعيين كلمة المرور غير متاحة في هذه النسخة التجريبية.';

  @override
  String get forgotPassword => 'نسيت كلمة المرور؟';

  @override
  String get alreadyHaveAccount => 'لديك حساب بالفعل؟';

  @override
  String get noAccountYet => 'ليس لديك حساب؟';

  @override
  String get logIn => 'تسجيل الدخول';

  @override
  String get quickStats => 'إحصاءات سريعة';

  @override
  String get quickActions => 'إجراءات سريعة';

  @override
  String completedTasks(String done, String total) {
    return 'أُنجز $done من $total';
  }

  @override
  String get todaysTasks => 'مهام اليوم';

  @override
  String get farmHealth => 'حالة المزرعة';

  @override
  String get sunny => 'مشمس';

  @override
  String get healthyAllAligned => 'جيدة · كل شيء متناسق';

  @override
  String get soilMoisture => 'رطوبة التربة';

  @override
  String get revenue => 'الإيرادات';

  @override
  String get tomatoNeedsWater => 'حقل الطماطم يحتاج إلى الماء';

  @override
  String get feedLivestock => 'إطعام الماشية';

  @override
  String get nextFeedToday => 'الوجبة التالية ١٢:٠٠';

  @override
  String get addTask => 'إضافة مهمة';

  @override
  String get planYourDay => 'خطط ليومك';

  @override
  String get taskAddedMock => 'أُضيفت المهمة إلى قائمتك.';

  @override
  String get waterTomatoField => 'ري حقل الطماطم';

  @override
  String get checkCornGrowth => 'فحص نمو الذرة';

  @override
  String get prepareHarvest => 'تجهيز الحصاد';

  @override
  String get finance => 'المالية';

  @override
  String get inventory => 'المخزون';

  @override
  String suppliesRunningLow(String count) {
    return '$count من المستلزمات قاربت على النفاد';
  }

  @override
  String get myFields => 'حقولي';

  @override
  String get allFields => 'كل الحقول';

  @override
  String get needsWater => 'يحتاج إلى الماء';

  @override
  String harvestWeight(String weight) {
    return '$weight كجم';
  }

  @override
  String currencyValue(String amount) {
    return '$amount دولار أمريكي';
  }

  @override
  String get tryAgain => 'حاول مرة أخرى';

  @override
  String get weatherScreenTitle => 'الطقس';

  @override
  String get refreshWeather => 'تحديث الطقس';

  @override
  String get farmWeather => 'أحوال المزرعة';

  @override
  String get weatherSunny => 'مشمس';

  @override
  String get weatherClouds => 'غيوم قادمة';

  @override
  String get weatherWind => 'اشتداد الرياح';

  @override
  String get weatherRainshower => 'زخات مطر';

  @override
  String get weatherClearingUp => 'انقشاع الغيوم';

  @override
  String get todaysConditions => 'أحوال اليوم';

  @override
  String get live => 'مباشر';

  @override
  String get temperature => 'درجة الحرارة';

  @override
  String feelsLike(String value) {
    return 'المحسوسة $value°';
  }

  @override
  String get humidity => 'الرطوبة';

  @override
  String dewPoint(String value) {
    return 'نقطة الندى $value°';
  }

  @override
  String get wind => 'الرياح';

  @override
  String windSpeed(String value) {
    return '$value كم/س';
  }

  @override
  String gustsValue(String value) {
    return 'هبّات $value';
  }

  @override
  String get rainChance => 'احتمال المطر';

  @override
  String expectedRain(String value) {
    return 'متوقع $value مم';
  }

  @override
  String get wellWatered => 'التربة مروية جيدًا';

  @override
  String get moistureGood => 'رطوبة جيدة';

  @override
  String storedLitersValue(String value) {
    return '$value لتر مخزنة';
  }

  @override
  String get weatherSentenceSunny => 'سماء صافية ونسيم خفيف فوق الحقول.';

  @override
  String get weatherSentenceClouds =>
      'تتجمع الغيوم مع أجواء معتدلة في المزرعة.';

  @override
  String get weatherSentenceWind => 'رياح قوية تعبر المحاصيل اليوم.';

  @override
  String get weatherSentenceRain =>
      'تهطل الأمطار على المزرعة وتجدد رطوبة التربة.';

  @override
  String get weatherSentenceClearing => 'ينحسر المطر وتعود أشعة الشمس.';

  @override
  String get farmRecommendations => 'توصيات المزرعة';

  @override
  String get recommendationsSubtitle => 'بناءً على محاصيلك وتوقعات الطقس';

  @override
  String get recommendWaterTitle => 'يُنصح بالري صباح الغد';

  @override
  String get recommendWaterBody =>
      'اسقِ حقل الطماطم مبكرًا قبل ارتفاع حرارة فترة الظهيرة.';

  @override
  String get recommendSkipTitle => 'أمطار متوقعة الجمعة، أوقف الري';

  @override
  String get recommendSkipBody =>
      'يوفر المطر رطوبة كافية. وفّر المياه وافحص التربة بعد الهطول.';

  @override
  String get recommendPlantTitle => 'ظروف مناسبة للزراعة';

  @override
  String get recommendPlantBody =>
      'الحرارة المعتدلة ورطوبة التربة المستقرة توفران وقتًا مناسبًا للزراعة.';

  @override
  String get schedule => 'جدولة';

  @override
  String get skipIrrigation => 'إيقاف الري';

  @override
  String get plantCrop => 'زراعة محصول';

  @override
  String get wateringScheduled => 'تمت جدولة الري لصباح الغد.';

  @override
  String get irrigationSkipped => 'تم إيقاف الري بسبب المطر المتوقع.';

  @override
  String get cropAddedToPlan => 'أُضيفت الزراعة إلى خطة مزرعتك.';

  @override
  String get demoCycle => 'تجربة الطقس';

  @override
  String get north => 'ش';

  @override
  String get northEast => 'ش ق';

  @override
  String get east => 'ق';

  @override
  String get southEast => 'ج ق';

  @override
  String get south => 'ج';

  @override
  String get southWest => 'ج غ';

  @override
  String get west => 'غ';

  @override
  String get northWest => 'ش غ';

  @override
  String get analyticsPeriodWeek => 'أسبوع';

  @override
  String get analyticsPeriodMonth => 'شهر';

  @override
  String get analyticsPeriodSeason => 'موسم';

  @override
  String get productionOverview => 'نظرة على الإنتاج';

  @override
  String get cropComparison => 'مقارنة المحاصيل';

  @override
  String get avgYield => 'متوسط الإنتاج';

  @override
  String get waterEfficiency => 'كفاءة المياه';

  @override
  String get farmScore => 'تقييم المزرعة';

  @override
  String get analyticsYield => 'الإنتاج';

  @override
  String get yieldUnit => 'كجم';

  @override
  String get harvestSchedule => 'جدول الحصاد';

  @override
  String get expectedHarvest => 'الحصاد المتوقع';

  @override
  String get markHarvested => 'تحديد كمحصود';

  @override
  String get harvested => 'تم الحصاد';

  @override
  String daysToHarvest(String count) {
    return 'متبقي $count يومًا';
  }

  @override
  String get corn => 'الذرة';

  @override
  String get lettuce => 'الخس';

  @override
  String get profileSettings => 'إعدادات المزرعة';

  @override
  String get darkMode => 'الوضع الداكن';

  @override
  String get notifications => 'الإشعارات';

  @override
  String get aboutFarmly => 'حول فارملي';

  @override
  String get versionLabel => 'الإصدار ١٫٠ · فارملي';

  @override
  String get signOut => 'تسجيل الخروج';

  @override
  String get animalDetails => 'تفاصيل الحيوان';

  @override
  String get vaccinationHistory => 'سجل التطعيمات';

  @override
  String get weightHistory => 'سجل الوزن';

  @override
  String get addNote => 'إضافة ملاحظة';

  @override
  String get animalHealth => 'الصحة';

  @override
  String get weightKg => 'الوزن (كجم)';

  @override
  String vaccinationDate(String date, String vaccine) {
    return '$date · $vaccine';
  }

  @override
  String get noteTitle => 'إضافة ملاحظة';

  @override
  String get noteHint => 'اكتب ملاحظة عن هذا الحيوان';

  @override
  String get cancel => 'إلغاء';

  @override
  String get saveNote => 'حفظ الملاحظة';

  @override
  String get noteSaved => 'تم حفظ الملاحظة';

  @override
  String get themeLight => 'فاتح';

  @override
  String get themeDark => 'داكن';

  @override
  String get language => 'اللغة';

  @override
  String get english => 'الإنجليزية';

  @override
  String get arabic => 'العربية';

  @override
  String get enabled => 'مفعّلة';

  @override
  String get disabled => 'متوقفة';

  @override
  String get needsAttention => 'تحتاج إلى عناية';

  @override
  String get rabiesVaccine => 'تطعيم داء الكلب';

  @override
  String get clostridialVaccine => 'جرعة الكلوستريديا';

  @override
  String get boosterVaccine => 'جرعة تنشيطية سنوية';

  @override
  String get cow => 'بقرة';

  @override
  String get chicken => 'دجاجة';

  @override
  String get sheepAnimal => 'خروف';

  @override
  String get goat => 'ماعز';

  @override
  String countAnimals(String count) {
    return '$count حيوان';
  }

  @override
  String get feedDone => 'مكتمل';

  @override
  String get statusExcellent => 'ممتاز';

  @override
  String animalTag(String tag) {
    return '$tag';
  }
}
