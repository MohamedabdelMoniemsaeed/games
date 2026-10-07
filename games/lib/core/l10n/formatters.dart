import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';

String localizedNumber(BuildContext context, num value) {
  final locale = Localizations.localeOf(context).toLanguageTag();
  return NumberFormat.decimalPattern(locale).format(value);
}

String localizedPercent(BuildContext context, int value) {
  final formatted = localizedNumber(context, value);
  return Localizations.localeOf(context).languageCode == 'ar'
      ? '$formatted٪'
      : '$formatted%';
}
