import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_metrics.dart';
import '../../../core/l10n/generated/app_localizations.dart';
import '../../../core/widgets/round_icon_button.dart';
import '../domain/farm_zone.dart';
import 'farm_map_painter.dart';
import 'providers/farm_providers.dart';

/// The animated, tappable farm plan shared by the farm and map preview.
class FarmMapView extends ConsumerWidget {
  const FarmMapView({
    this.showFullscreenButton = true,
    this.fullscreen = false,
    this.onFullscreen,
    super.key,
  });

  final bool showFullscreenButton;
  final bool fullscreen;
  final VoidCallback? onFullscreen;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selected = ref.watch(selectedZoneProvider);
    final rtl = Directionality.of(context) == TextDirection.rtl;
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = fullscreen
            ? math.min(
                constraints.maxWidth,
                constraints.maxHeight / AppSizes.farmMapAspectRatio,
              )
            : constraints.maxWidth;
        final height = width * AppSizes.farmMapAspectRatio;
        final zoom = selected == FarmZone.overview ||
                selected == FarmZone.farmHouse
            ? 1.0
            : 2.05;
        final focus = zoom == 1
            ? const Offset(.5, .5)
            : FarmMapPainter.focusPoint(selected);
        final displayFocusX = rtl ? 1 - focus.dx : focus.dx;
        final translateX = width / 2 - width * displayFocusX * zoom;
        final translateY = height / 2 - height * focus.dy * zoom;
        final l10n = AppLocalizations.of(context);
        return ClipRRect(
          borderRadius: BorderRadius.circular(AppRadius.map),
          child: SizedBox(
            width: width,
            height: height,
            child: Stack(
              fit: StackFit.expand,
              children: [
                TweenAnimationBuilder<double>(
                  tween: Tween<double>(end: zoom),
                  duration: const Duration(milliseconds: 650),
                  curve: Curves.easeInOutCubic,
                  builder: (context, animatedZoom, child) {
                    final x =
                        width / 2 - width * displayFocusX * animatedZoom;
                    final y = height / 2 - height * focus.dy * animatedZoom;
                    return Transform(
                      alignment: Alignment.topLeft,
                      transform: Matrix4.identity()
                        ..translateByDouble(x, y, 0, 1)
                        ..scaleByDouble(animatedZoom, animatedZoom, 1, 1),
                      child: child,
                    );
                  },
                  child: CustomPaint(
                    size: Size(width, height),
                    painter: FarmMapPainter(selectedZone: selected, rtl: rtl),
                  ),
                ),
                Positioned.fill(
                  child: GestureDetector(
                    behavior: HitTestBehavior.opaque,
                    onTapUp: (details) {
                      final mapX =
                          (details.localPosition.dx - translateX) /
                              (width * zoom);
                      final mapY =
                          (details.localPosition.dy - translateY) /
                              (height * zoom);
                      final zone = FarmMapPainter.zoneAt(
                        Offset(rtl ? 1 - mapX : mapX, mapY),
                      );
                      if (zone != null) {
                        ref.read(selectedZoneProvider.notifier).select(zone);
                      }
                    },
                  ),
                ),
                if (showFullscreenButton && onFullscreen != null)
                  Positioned(
                    top: AppSpacing.md,
                    right: AppSpacing.md,
                    child: RoundIconButton(
                      icon: Icons.fullscreen_rounded,
                      tooltip: l10n.fullscreenMap,
                      onPressed: onFullscreen!,
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}
