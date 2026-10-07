import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:games/app.dart';
import 'package:games/features/auth/presentation/widgets/farm_illustration.dart';
import 'package:games/features/farm/presentation/farm_map_view.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  testWidgets(
    'first launch can continue as guest and complete dashboard tasks',
    (tester) async {
      _setPhoneSize(tester);
      await tester.pumpWidget(const ProviderScope(child: GreenValleyApp()));
      await tester.pumpAndSettle();
      expect(find.text('Farmly'), findsOneWidget);
      expect(find.byType(FarmIllustration), findsOneWidget);

      await tester.pump(const Duration(milliseconds: 2500));
      await tester.pumpAndSettle();
      expect(find.text('Your Farm, Smarter'), findsOneWidget);

      await tester.tap(find.text('Just looking around? Continue as guest'));
      await tester.pumpAndSettle();
      expect(find.text('Quick Stats'), findsOneWidget);
      expect(find.text('Farm health'), findsOneWidget);
      expect(find.text('Tomato Field'), findsWidgets);

      await tester.ensureVisible(find.text('Water Tomato Field'));
      await tester.tap(find.text('Water Tomato Field'));
      await tester.pumpAndSettle();
      expect(find.text('1 of 4 completed'), findsOneWidget);

      await tester.tap(find.text('Farm'));
      await tester.pumpAndSettle();
      expect(find.text('My Farm'), findsOneWidget);
      expect(find.byType(FarmMapView), findsOneWidget);

      await tester.tap(find.text('AR'));
      await tester.pumpAndSettle();
      expect(find.text('مزرعتي'), findsOneWidget);
      expect(find.text('الرئيسية'), findsOneWidget);

      await tester.drag(find.byType(ListView).first, const Offset(800, 0));
      await tester.pumpAndSettle();
      await tester.ensureVisible(find.text('منطقة الحيوانات'));
      await tester.tap(find.text('منطقة الحيوانات'));
      await tester.pumpAndSettle();
      await tester.ensureVisible(find.text('فتح الماشية'));
      await tester.tap(find.text('فتح الماشية'));
      await tester.pumpAndSettle();
      expect(find.text('إجمالي القطيع'), findsOneWidget);
      await tester.ensureVisible(find.text('ماعز'));
      await tester.tap(find.text('ماعز'));
      await tester.pumpAndSettle();
      expect(find.text('ماعزك'), findsOneWidget);
      expect(find.text('بيلي'), findsOneWidget);
      await tester.tap(find.text('بيلي'));
      await tester.pumpAndSettle();
      expect(find.text('سجل التطعيمات'), findsOneWidget);
      await tester.ensureVisible(find.text('إضافة ملاحظة'));
      await tester.tap(find.text('إضافة ملاحظة'));
      await tester.pumpAndSettle();
      expect(find.text('اكتب ملاحظة عن هذا الحيوان'), findsOneWidget);
      await tester.tap(find.text('إلغاء'));
      await tester.pumpAndSettle();
      await tester.tap(find.byTooltip('رجوع'));
      await tester.pumpAndSettle();
      await tester.tap(find.byTooltip('رجوع'));
      await tester.pumpAndSettle();

      await tester.tap(find.text('الرئيسية'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('المزرعة'));
      await tester.pumpAndSettle();
      await tester.drag(find.byType(ListView).first, const Offset(800, 0));
      await tester.pumpAndSettle();
      await tester.tap(find.text('خزان المياه'));
      await tester.pumpAndSettle();
      await tester.ensureVisible(find.text('الري الذكي'));
      await tester.tap(find.text('الري الذكي'));
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pump(const Duration(milliseconds: 500));
      expect(find.byTooltip('تحديث الطقس'), findsOneWidget);
      await tester.ensureVisible(find.text('أحوال اليوم'));
      expect(find.text('أحوال اليوم'), findsOneWidget);
      await tester.ensureVisible(find.byTooltip('تحديث الطقس'));
      await tester.tap(find.byTooltip('تحديث الطقس'));
      await tester.pump(const Duration(milliseconds: 500));
      await tester.tap(find.byTooltip('رجوع'));
      await tester.pumpAndSettle();

      await tester.tap(find.text('التحليلات'));
      await tester.pumpAndSettle();
      expect(find.text('نظرة على الإنتاج'), findsOneWidget);
      await tester.tap(find.text('شهر'));
      await tester.pumpAndSettle();

      await tester.tap(find.text('الحصاد'));
      await tester.pumpAndSettle();
      expect(find.text('جدول الحصاد'), findsOneWidget);
      await tester.ensureVisible(find.text('تحديد كمحصود').first);
      await tester.tap(find.text('تحديد كمحصود').first);
      await tester.pumpAndSettle();
      expect(find.text('تم الحصاد'), findsOneWidget);

      await tester.tap(find.text('الملف الشخصي'));
      await tester.pumpAndSettle();
      expect(find.text('إعدادات المزرعة'), findsOneWidget);
      await tester.tap(find.text('الوضع الداكن'));
      await tester.pumpAndSettle();
      expect(find.text('فاتح'), findsOneWidget);
    },
  );

  testWidgets('login validates fields and persists a mock user', (
    tester,
  ) async {
    SharedPreferences.setMockInitialValues({'farmly.onboarding.seen': true});
    _setPhoneSize(tester);
    await tester.pumpWidget(const ProviderScope(child: GreenValleyApp()));
    await tester.pumpAndSettle();
    await tester.pump(const Duration(milliseconds: 2500));
    await tester.pumpAndSettle();
    expect(find.text('Welcome back'), findsOneWidget);

    await tester.tap(find.text('Create an account').last);
    await tester.pumpAndSettle();
    expect(find.text('Create an account'), findsNWidgets(2));
    await tester.tap(find.byTooltip('Back'));
    await tester.pumpAndSettle();

    final submit = find.byType(FilledButton).first;
    expect(tester.widget<FilledButton>(submit).onPressed, isNull);
    await tester.enterText(
      find.byType(TextFormField).at(0),
      'farmer@example.com',
    );
    await tester.enterText(find.byType(TextFormField).at(1), 'harvest7');
    await tester.pumpAndSettle();
    expect(tester.widget<FilledButton>(submit).onPressed, isNotNull);
    await tester.tap(submit);
    await tester.pump();
    expect(find.byType(CircularProgressIndicator), findsWidgets);
    await tester.pump(const Duration(milliseconds: 1200));
    await tester.pumpAndSettle();
    expect(find.text('Quick Stats'), findsOneWidget);

    final preferences = await SharedPreferences.getInstance();
    expect(preferences.getString('farmly.auth.email'), 'farmer@example.com');
  });
}

void _setPhoneSize(WidgetTester tester) {
  tester.view.physicalSize = const Size(1179, 2556);
  tester.view.devicePixelRatio = 3;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
}
