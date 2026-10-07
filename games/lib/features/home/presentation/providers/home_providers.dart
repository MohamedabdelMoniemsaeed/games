import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/home_repository.dart';
import '../../data/mock_home_repository.dart';
import '../../domain/home_dashboard.dart';

final homeRepositoryProvider = Provider<HomeRepository>(
  (ref) => const MockHomeRepository(),
);

final homeDashboardProvider = FutureProvider<HomeDashboardData>(
  (ref) => ref.watch(homeRepositoryProvider).getDashboard(),
);

final completedTasksProvider =
    NotifierProvider<CompletedTasksNotifier, Set<String>>(
  CompletedTasksNotifier.new,
);

class CompletedTasksNotifier extends Notifier<Set<String>> {
  @override
  Set<String> build() => const {};

  void toggle(String taskId) {
    final updated = Set<String>.of(state);
    if (!updated.add(taskId)) updated.remove(taskId);
    state = Set.unmodifiable(updated);
  }
}
