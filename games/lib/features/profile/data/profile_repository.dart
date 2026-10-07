import '../domain/farm_profile.dart';

abstract interface class ProfileRepository {
  Future<FarmProfile> getProfile();
}
