import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../domain/farm_zone.dart';

/// Paints the complete top-down farm, its zone focus and the selected outline.
class FarmMapPainter extends CustomPainter {
  const FarmMapPainter({required this.selectedZone, required this.rtl});

  static const mapSize = Size(760, 1000);
  static const zoneBounds = <FarmZone, Rect>{
    FarmZone.farmHouse: Rect.fromLTWH(20, 20, 320, 270),
    FarmZone.tomatoField: Rect.fromLTWH(360, 20, 380, 270),
    FarmZone.vegetableField: Rect.fromLTWH(20, 355, 320, 370),
    FarmZone.cornField: Rect.fromLTWH(390, 355, 350, 370),
    FarmZone.animalArea: Rect.fromLTWH(20, 800, 380, 180),
    FarmZone.waterTank: Rect.fromLTWH(420, 800, 320, 180),
  };

  final FarmZone selectedZone;
  final bool rtl;

  static Offset focusPoint(FarmZone zone) {
    final bounds = zoneBounds[zone];
    return bounds == null
        ? const Offset(.5, .5)
        : Offset(
            bounds.center.dx / mapSize.width,
            bounds.center.dy / mapSize.height,
          );
  }

  static FarmZone? zoneAt(Offset point) {
    for (final entry in zoneBounds.entries) {
      final normalizedRect = Rect.fromLTRB(
        entry.value.left / mapSize.width,
        entry.value.top / mapSize.height,
        entry.value.right / mapSize.width,
        entry.value.bottom / mapSize.height,
      );
      if (normalizedRect.contains(point)) return entry.key;
    }
    return FarmZone.overview;
  }

  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.scale(size.width / mapSize.width, size.height / mapSize.height);
    if (rtl) {
      canvas.translate(mapSize.width, 0);
      canvas.scale(-1, 1);
    }
    _fill(canvas, Offset.zero & mapSize, AppColors.mapGrass);
    _paintRoads(canvas);
    _paintFarmHouse(canvas);
    _paintTomatoField(canvas);
    _paintVegetableField(canvas);
    _paintCornField(canvas);
    _paintAnimalArea(canvas);
    _paintWaterArea(canvas);
    _paintRoadsideDetails(canvas);
    if (selectedZone != FarmZone.overview &&
        selectedZone != FarmZone.farmHouse) {
      _paintDimming(canvas);
    }
    _paintZoneBorders(canvas);
    _paintSelection(canvas);
    canvas.restore();
  }

  void _paintRoads(Canvas canvas) {
    final edge = Paint()..color = AppColors.mapRoadEdge;
    final surface = Paint()..color = AppColors.mapRoad;
    for (final bounds in [
      const Rect.fromLTWH(0, 295, 760, 54),
      const Rect.fromLTWH(0, 735, 760, 56),
      const Rect.fromLTWH(340, 0, 30, 1000),
    ]) {
      canvas.drawRect(bounds, edge);
    }
    canvas.drawRect(const Rect.fromLTWH(0, 302, 760, 40), surface);
    canvas.drawRect(const Rect.fromLTWH(0, 742, 760, 42), surface);
    canvas.drawRect(const Rect.fromLTWH(345, 0, 20, 1000), surface);
    for (var x = 14.0; x < 760; x += 76) {
      _fill(canvas, Rect.fromLTWH(x, 320, 34, 3), AppColors.mapRoadMarking);
      _fill(canvas, Rect.fromLTWH(x, 761, 34, 3), AppColors.mapRoadMarking);
    }
    _paintTractor(canvas, const Offset(374, 766));
  }

  void _paintFarmHouse(Canvas canvas) {
    _roundRect(
      canvas,
      const Rect.fromLTWH(20, 20, 320, 270),
      AppColors.mapHouseGrass,
      22,
    );
    _paintTree(canvas, const Offset(52, 55), .9);
    _paintTree(canvas, const Offset(305, 57), .76);
    _paintTree(canvas, const Offset(52, 248), .72);
    _roundRect(
      canvas,
      const Rect.fromLTWH(108, 86, 135, 112),
      AppColors.mapHouseWall,
      6,
    );
    final roof = Path()
      ..moveTo(91, 93)
      ..lineTo(175, 31)
      ..lineTo(260, 93)
      ..close();
    canvas.drawPath(roof, Paint()..color = AppColors.mapRoof);
    canvas.drawLine(
      const Offset(175, 37),
      const Offset(175, 97),
      Paint()
        ..color = AppColors.mapRoofHighlight
        ..strokeWidth = 3,
    );
    _roundRect(
      canvas,
      const Rect.fromLTWH(161, 137, 31, 61),
      AppColors.mapDoor,
      4,
    );
    for (final x in [124.0, 206.0]) {
      _roundRect(canvas, Rect.fromLTWH(x, 112, 24, 24), AppColors.mapWindow, 3);
    }
    _roundRect(
      canvas,
      const Rect.fromLTWH(98, 210, 150, 34),
      AppColors.mapDriveway,
      6,
    );
    _roundRect(
      canvas,
      const Rect.fromLTWH(125, 215, 55, 22),
      AppColors.mapCar,
      6,
    );
    _circle(canvas, const Offset(138, 244), 7, AppColors.mapDarkWheel);
    _circle(canvas, const Offset(170, 244), 7, AppColors.mapDarkWheel);
    _roundRect(
      canvas,
      const Rect.fromLTWH(54, 166, 47, 43),
      AppColors.mapGardenBed,
      6,
    );
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        _circle(
          canvas,
          Offset(64 + j * 12, 176 + i * 11),
          2,
          AppColors.mapSeed,
        );
      }
    }
    _roundRect(
      canvas,
      const Rect.fromLTWH(269, 165, 22, 54),
      AppColors.mapWaterValve,
      4,
    );
    _circle(canvas, const Offset(280, 160), 6, AppColors.mapDeepLeaf);
  }

  void _paintTomatoField(Canvas canvas) {
    _roundRect(
      canvas,
      const Rect.fromLTWH(360, 20, 380, 270),
      AppColors.mapTomatoSoil,
      20,
    );
    for (var row = 0; row < 8; row++) {
      final y = 44.0 + row * 29;
      _line(canvas, Offset(377, y), Offset(724, y), AppColors.mapRowSoil, 4);
      for (var col = 0; col < 17; col++) {
        final x = 384.0 + col * 20;
        _circle(canvas, Offset(x, y - 4), 4.3, AppColors.mapTomatoLeaf);
        _circle(canvas, Offset(x - 2, y + 3), 2, AppColors.mapTomatoHighlight);
        if ((row + col) % 3 == 0) {
          _circle(canvas, Offset(x + 4, y + 3), 2.3, AppColors.mapTomato);
        }
      }
    }
    _paintTree(canvas, const Offset(725, 35), .36);
  }

  void _paintVegetableField(Canvas canvas) {
    _roundRect(
      canvas,
      const Rect.fromLTWH(20, 355, 320, 370),
      AppColors.mapSoil,
      20,
    );
    _roundRect(
      canvas,
      const Rect.fromLTWH(43, 378, 274, 124),
      AppColors.mapVegetableBed,
      14,
    );
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 6; col++) {
        final center = Offset(74 + col * 43, 405 + row * 36);
        _circle(canvas, center, 14, AppColors.mapLettuce);
        _circle(canvas, center.translate(-4, -3), 9, AppColors.mapLettuceLight);
        _circle(
          canvas,
          center.translate(4, 3),
          6,
          AppColors.mapLettuceHighlight,
        );
      }
    }
    _roundRect(
      canvas,
      const Rect.fromLTWH(43, 526, 274, 172),
      AppColors.mapVegetableBed,
      14,
    );
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 11; col++) {
        final center = Offset(57 + col * 23, 542 + row * 25);
        _line(
          canvas,
          center.translate(-5, 0),
          center.translate(5, 0),
          AppColors.mapCarrot,
          3,
        );
        _circle(canvas, center.translate(0, -4), 2.3, AppColors.mapCarrotTop);
        _circle(canvas, center.translate(0, 4), 2.3, AppColors.mapCarrotTop);
      }
    }
  }

  void _paintCornField(Canvas canvas) {
    _roundRect(
      canvas,
      const Rect.fromLTWH(390, 355, 350, 370),
      AppColors.mapCorn,
      20,
    );
    for (var col = 0; col < 11; col++) {
      final x = 408.0 + col * 31;
      _line(
        canvas,
        Offset(x, 375),
        Offset(x, 705),
        col.isEven ? AppColors.mapCornDark : AppColors.mapCornLight,
        9,
      );
      for (var y = 389.0; y < 700; y += 31) {
        _line(
          canvas,
          Offset(x - 4, y),
          Offset(x + 5, y + 7),
          AppColors.mapCornLeaf,
          3,
        );
      }
    }
  }

  void _paintAnimalArea(Canvas canvas) {
    _roundRect(
      canvas,
      const Rect.fromLTWH(20, 800, 380, 180),
      AppColors.mapPasture,
      18,
    );
    final fence = Paint()
      ..color = AppColors.mapFence
      ..strokeWidth = 4;
    for (final y in [815.0, 965.0]) {
      canvas.drawLine(Offset(31, y), Offset(389, y), fence);
    }
    for (var x = 35.0; x <= 388; x += 36) {
      canvas.drawLine(Offset(x, 810), Offset(x, 970), fence);
    }
    _roundRect(
      canvas,
      const Rect.fromLTWH(47, 824, 92, 73),
      AppColors.mapRoof,
      4,
    );
    final barnRoof = Path()
      ..moveTo(37, 831)
      ..lineTo(93, 792)
      ..lineTo(149, 831)
      ..close();
    canvas.drawPath(barnRoof, Paint()..color = AppColors.mapBarnRoof);
    _roundRect(
      canvas,
      const Rect.fromLTWH(81, 858, 25, 39),
      AppColors.mapBarnDoor,
      2,
    );
    _paintHay(canvas, const Offset(233, 937));
    _paintCow(canvas, const Offset(202, 851), .78);
    _paintCow(canvas, const Offset(302, 882), .62);
    _paintCow(canvas, const Offset(266, 925), .5);
    _paintChicken(canvas, const Offset(162, 927));
    _paintChicken(canvas, const Offset(167, 908));
    _circle(canvas, const Offset(62, 924), 9, AppColors.mapEgg);
    _circle(canvas, const Offset(85, 936), 9, AppColors.mapEgg);
  }

  void _paintWaterArea(Canvas canvas) {
    _roundRect(
      canvas,
      const Rect.fromLTWH(420, 800, 320, 180),
      AppColors.mapOrchard,
      18,
    );
    _circle(canvas, const Offset(510, 877), 53, AppColors.mapWaterEdge);
    _circle(canvas, const Offset(510, 870), 43, AppColors.mapWater);
    _circle(canvas, const Offset(659, 922), 43, AppColors.mapWaterEdge);
    _circle(canvas, const Offset(659, 916), 35, AppColors.mapWater);
    _roundRect(
      canvas,
      const Rect.fromLTWH(561, 832, 86, 59),
      AppColors.mapBuilding,
      6,
    );
    _roundRect(
      canvas,
      const Rect.fromLTWH(571, 816, 65, 19),
      AppColors.mapBuildingRoof,
      5,
    );
    _roundRect(
      canvas,
      const Rect.fromLTWH(593, 849, 22, 42),
      AppColors.mapBuildingDoor,
      4,
    );
    _paintTree(canvas, const Offset(719, 824), .44);
  }

  void _paintRoadsideDetails(Canvas canvas) {
    _paintTree(canvas, const Offset(26, 310), .5);
    _paintTree(canvas, const Offset(727, 310), .47);
    _paintTree(canvas, const Offset(31, 770), .45);
    _paintTree(canvas, const Offset(727, 770), .45);
    _paintTree(canvas, const Offset(376, 310), .5);
  }

  void _paintDimming(Canvas canvas) {
    final dim = Paint()..color = AppColors.dark.withValues(alpha: .35);
    for (final entry in zoneBounds.entries) {
      if (entry.key != selectedZone) {
        canvas.drawRRect(
          RRect.fromRectAndRadius(entry.value, const Radius.circular(22)),
          dim,
        );
      }
    }
  }

  void _paintZoneBorders(Canvas canvas) {
    for (final bounds in zoneBounds.values) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(bounds, const Radius.circular(22)),
        Paint()
          ..color = AppColors.white.withValues(alpha: .42)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 3,
      );
    }
  }

  void _paintSelection(Canvas canvas) {
    final bounds = zoneBounds[selectedZone];
    if (bounds == null) return;
    canvas.drawRRect(
      RRect.fromRectAndRadius(bounds, const Radius.circular(22)),
      Paint()
        ..color = AppColors.white
        ..style = PaintingStyle.stroke
        ..strokeWidth = 8,
    );
  }

  void _paintTree(Canvas canvas, Offset center, double scale) {
    _roundRect(
      canvas,
      Rect.fromCenter(
        center: center.translate(0, 8 * scale),
        width: 8 * scale,
        height: 20 * scale,
      ),
      AppColors.mapTreeTrunk,
      3,
    );
    _circle(canvas, center, 18 * scale, AppColors.mapTree);
    _circle(
      canvas,
      center.translate(-7 * scale, -4 * scale),
      9 * scale,
      AppColors.mapTreeHighlight,
    );
  }

  void _paintCow(Canvas canvas, Offset center, double scale) {
    canvas.save();
    canvas.translate(center.dx, center.dy);
    canvas.scale(scale);
    _roundRect(
      canvas,
      const Rect.fromLTWH(-27, -15, 49, 31),
      AppColors.white,
      13,
    );
    _circle(canvas, const Offset(22, -2), 12, AppColors.white);
    _circle(canvas, const Offset(-10, -4), 8, AppColors.mapCowSpot);
    _circle(canvas, const Offset(9, 7), 7, AppColors.mapCowSpot);
    _line(
      canvas,
      const Offset(-17, 12),
      const Offset(-18, 23),
      AppColors.mapCowLeg,
      4,
    );
    _line(
      canvas,
      const Offset(12, 12),
      const Offset(13, 23),
      AppColors.mapCowLeg,
      4,
    );
    _circle(canvas, const Offset(27, -4), 2, AppColors.dark);
    canvas.restore();
  }

  void _paintChicken(Canvas canvas, Offset center) {
    _circle(canvas, center, 9, AppColors.mapChicken);
    _circle(canvas, center.translate(8, -7), 6, AppColors.mapChicken);
    _circle(canvas, center.translate(9, -8), 1.5, AppColors.dark);
    final beak = Path()
      ..moveTo(center.dx + 13, center.dy - 8)
      ..lineTo(center.dx + 19, center.dy - 6)
      ..lineTo(center.dx + 13, center.dy - 4)
      ..close();
    canvas.drawPath(beak, Paint()..color = AppColors.orange);
  }

  void _paintHay(Canvas canvas, Offset center) {
    final hay = Path()
      ..moveTo(center.dx - 22, center.dy + 10)
      ..quadraticBezierTo(
        center.dx,
        center.dy - 24,
        center.dx + 23,
        center.dy + 10,
      )
      ..close();
    canvas.drawPath(hay, Paint()..color = AppColors.mapHay);
    canvas.drawArc(
      Rect.fromCenter(center: center.translate(0, 10), width: 45, height: 26),
      math.pi,
      math.pi,
      false,
      Paint()
        ..color = AppColors.mapHayLine
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3,
    );
  }

  void _paintTractor(Canvas canvas, Offset center) {
    _roundRect(
      canvas,
      Rect.fromCenter(center: center.translate(0, -2), width: 35, height: 18),
      AppColors.mapTractor,
      5,
    );
    _roundRect(
      canvas,
      Rect.fromLTWH(center.dx - 3, center.dy - 19, 14, 13),
      AppColors.mapTractor,
      3,
    );
    _circle(canvas, center.translate(-8, 9), 7, AppColors.mapTractorWheel);
    _circle(canvas, center.translate(12, 9), 5, AppColors.mapTractorWheel);
  }

  void _fill(Canvas canvas, Rect rect, Color color) {
    canvas.drawRect(rect, Paint()..color = color);
  }

  void _roundRect(Canvas canvas, Rect rect, Color color, double radius) {
    canvas.drawRRect(
      RRect.fromRectAndRadius(rect, Radius.circular(radius)),
      Paint()..color = color,
    );
  }

  void _circle(Canvas canvas, Offset center, double radius, Color color) {
    canvas.drawCircle(center, radius, Paint()..color = color);
  }

  void _line(
    Canvas canvas,
    Offset start,
    Offset end,
    Color color,
    double width,
  ) {
    canvas.drawLine(
      start,
      end,
      Paint()
        ..color = color
        ..strokeWidth = width
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(covariant FarmMapPainter oldDelegate) =>
      oldDelegate.selectedZone != selectedZone || oldDelegate.rtl != rtl;
}
