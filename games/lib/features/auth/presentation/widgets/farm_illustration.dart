import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';

enum FarmIllustrationStyle { splash, onboarding, login }

class FarmIllustration extends StatelessWidget {
  const FarmIllustration({required this.style, super.key});

  final FarmIllustrationStyle style;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: FarmIllustrationPainter(style),
      child: const SizedBox.expand(),
    );
  }
}

class FarmIllustrationPainter extends CustomPainter {
  const FarmIllustrationPainter(this.style);

  final FarmIllustrationStyle style;

  @override
  void paint(Canvas canvas, Size size) {
    final bounds = Offset.zero & size;
    canvas.drawRect(
      bounds,
      Paint()
        ..shader = const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [AppColors.skyTop, AppColors.skyBottom],
        ).createShader(bounds),
    );

    _circle(
      canvas,
      Offset(size.width * .78, size.height * .2),
      25,
      AppColors.sun,
    );
    _hill(canvas, size, .62, AppColors.illustrationHillBack, .30);
    _hill(canvas, size, .76, AppColors.illustrationHillFront, .37);

    if (style != FarmIllustrationStyle.splash) {
      _windmill(
        canvas,
        Offset(size.width * .2, size.height * .53),
        size.height * .28,
      );
      _windmill(
        canvas,
        Offset(size.width * .83, size.height * .47),
        size.height * .24,
      );
      _drone(canvas, Offset(size.width * .69, size.height * .32));
    }

    _tree(
      canvas,
      Offset(size.width * .13, size.height * .7),
      size.height * .11,
    );
    _tree(
      canvas,
      Offset(size.width * .91, size.height * .72),
      size.height * .12,
    );
    _barn(
      canvas,
      Offset(size.width * .52, size.height * .71),
      size.height * .23,
    );

    if (style == FarmIllustrationStyle.login) {
      _farmer(
        canvas,
        Offset(size.width * .75, size.height * .68),
        size.height * .27,
      );
    }
  }

  void _hill(Canvas canvas, Size size, double top, Color color, double height) {
    final path = Path()
      ..moveTo(0, size.height * top)
      ..cubicTo(
        size.width * .28,
        size.height * (top - height),
        size.width * .66,
        size.height * (top + height * .65),
        size.width,
        size.height * (top - height * .22),
      )
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
    canvas.drawPath(path, Paint()..color = color);
  }

  void _barn(Canvas canvas, Offset center, double height) {
    final width = height * 1.28;
    final body = Rect.fromCenter(
      center: center.translate(0, height * .2),
      width: width,
      height: height * .7,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(body, const Radius.circular(5)),
      Paint()..color = AppColors.barnRed,
    );
    final roof = Path()
      ..moveTo(body.left - width * .09, body.top + height * .09)
      ..lineTo(center.dx, body.top - height * .45)
      ..lineTo(body.right + width * .09, body.top + height * .09)
      ..close();
    canvas.drawPath(roof, Paint()..color = AppColors.mapBarnRoof);
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(
          center: Offset(center.dx, body.bottom - height * .2),
          width: width * .3,
          height: height * .4,
        ),
        const Radius.circular(3),
      ),
      Paint()..color = AppColors.mapBarnDoor,
    );
  }

  void _tree(Canvas canvas, Offset base, double height) {
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(
          center: base.translate(0, -height * .21),
          width: height * .12,
          height: height * .48,
        ),
        const Radius.circular(3),
      ),
      Paint()..color = AppColors.mapTreeTrunk,
    );
    for (var index = 0; index < 3; index++) {
      _circle(
        canvas,
        base.translate(
          (index - 1) * height * .2,
          -height * (.55 + (index == 1 ? .08 : 0)),
        ),
        height * .24,
        index.isEven ? AppColors.mapTree : AppColors.mapTreeHighlight,
      );
    }
  }

  void _windmill(Canvas canvas, Offset base, double height) {
    final towerTop = base.translate(0, -height);
    canvas.drawLine(
      base,
      towerTop,
      Paint()
        ..color = AppColors.windmill
        ..strokeWidth = 4
        ..strokeCap = StrokeCap.round,
    );
    for (var index = 0; index < 3; index++) {
      final angle = index * 2 * 3.141592653589793 / 3;
      final end = towerTop.translate(
        height * .22 * math.cos(angle),
        height * .22 * math.sin(angle),
      );
      canvas.drawLine(
        towerTop,
        end,
        Paint()
          ..color = AppColors.windmill
          ..strokeWidth = 3
          ..strokeCap = StrokeCap.round,
      );
    }
    _circle(canvas, towerTop, 4, AppColors.windmill);
  }

  void _drone(Canvas canvas, Offset center) {
    final paint = Paint()
      ..color = AppColors.drone
      ..strokeWidth = 3
      ..strokeCap = StrokeCap.round;
    canvas.drawLine(center.translate(-15, 0), center.translate(15, 0), paint);
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(center: center, width: 17, height: 8),
        const Radius.circular(4),
      ),
      Paint()..color = AppColors.drone,
    );
    for (final side in [-1.0, 1.0]) {
      canvas.drawLine(center, center.translate(side * 17, -8), paint);
      canvas.drawOval(
        Rect.fromCenter(
          center: center.translate(side * 21, -9),
          width: 15,
          height: 3,
        ),
        paint,
      );
    }
  }

  void _farmer(Canvas canvas, Offset center, double height) {
    final head = center.translate(0, -height * .48);
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(
          center: center.translate(0, -height * .1),
          width: height * .48,
          height: height * .66,
        ),
        const Radius.circular(13),
      ),
      Paint()..color = AppColors.farmerShirt,
    );
    _circle(canvas, head, height * .19, AppColors.farmerSkin);
    final hat = Path()
      ..moveTo(head.dx - height * .28, head.dy - height * .1)
      ..quadraticBezierTo(
        head.dx,
        head.dy - height * .42,
        head.dx + height * .28,
        head.dy - height * .1,
      )
      ..lineTo(head.dx + height * .34, head.dy)
      ..lineTo(head.dx - height * .34, head.dy)
      ..close();
    canvas.drawPath(hat, Paint()..color = AppColors.strawHat);
  }

  void _circle(Canvas canvas, Offset center, double radius, Color color) {
    canvas.drawCircle(center, radius, Paint()..color = color);
  }

  @override
  bool shouldRepaint(covariant FarmIllustrationPainter oldDelegate) =>
      oldDelegate.style != style;
}
