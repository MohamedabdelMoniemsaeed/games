import '../domain/harvest_item.dart';

abstract interface class HarvestRepository {
  Future<List<HarvestItem>> getHarvests();
  Future<List<HarvestItem>> markHarvested(String id);
}
