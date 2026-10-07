import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/mock_profile_repository.dart';
import '../../data/profile_repository.dart';
import '../../domain/farm_profile.dart';

final profileRepositoryProvider = Provider<ProfileRepository>(
  (ref) => const MockProfileRepository(),
);

final profileProvider = FutureProvider<FarmProfile>(
  (ref) => ref.watch(profileRepositoryProvider).getProfile(),
);

final notificationsEnabledProvider =
    NotifierProvider<NotificationsNotifier, bool>(
  NotificationsNotifier.new,
);

class NotificationsNotifier extends Notifier<bool> {
  @override
  bool build() => true;

  void toggle() => state = !state;
}
