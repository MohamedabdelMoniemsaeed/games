import '../domain/farm_profile.dart';
import 'profile_repository.dart';

class MockProfileRepository implements ProfileRepository {
  const MockProfileRepository();

  @override
  Future<FarmProfile> getProfile() async => const FarmProfile(
        farmName: 'Green Valley Farm',
        ownerName: 'Alex Morgan',
        areaHectares: 12.5,
        version: '1.0',
      );
}
