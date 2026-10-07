import '../domain/harvest_item.dart';
import 'harvest_repository.dart';

class MockHarvestRepository implements HarvestRepository {
  MockHarvestRepository();

  final List<HarvestItem> _items = [
    HarvestItem(
      id: 'tomatoes',
      crop: HarvestCrop.tomatoes,
      fieldNameKey: 'tomatoField',
      expectedDate: DateTime.now().add(const Duration(days: 4)),
      expectedYieldKg: 460,
      daysUntilHarvest: 4,
      isHarvested: false,
    ),
    HarvestItem(
      id: 'lettuce',
      crop: HarvestCrop.lettuce,
      fieldNameKey: 'vegetableField',
      expectedDate: DateTime.now().add(const Duration(days: 9)),
      expectedYieldKg: 320,
      daysUntilHarvest: 9,
      isHarvested: false,
    ),
    HarvestItem(
      id: 'corn',
      crop: HarvestCrop.corn,
      fieldNameKey: 'cornField',
      expectedDate: DateTime.now().add(const Duration(days: 18)),
      expectedYieldKg: 500,
      daysUntilHarvest: 18,
      isHarvested: false,
    ),
  ];

  @override
  Future<List<HarvestItem>> getHarvests() async =>
      List.unmodifiable(_items);

  @override
  Future<List<HarvestItem>> markHarvested(String id) async {
    final index = _items.indexWhere((item) => item.id == id);
    if (index < 0) throw StateError('Harvest item not found: $id');
    _items[index] = _items[index].copyWith(isHarvested: true);
    return List.unmodifiable(_items);
  }
}
