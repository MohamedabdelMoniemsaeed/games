import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'farm_database.dart';

/// Provides the app's local database and closes it with the provider scope.
final farmDatabaseProvider = Provider<FarmDatabase>((ref) {
  final database = FarmDatabase();
  ref.onDispose(database.close);
  return database;
});
