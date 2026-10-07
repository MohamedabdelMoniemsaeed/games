class VaccinationRecord {
  const VaccinationRecord({required this.date, required this.vaccineKey});

  final DateTime date;
  final String vaccineKey;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is VaccinationRecord &&
          date == other.date &&
          vaccineKey == other.vaccineKey;

  @override
  int get hashCode => Object.hash(date, vaccineKey);
}

class AnimalDetail {
  const AnimalDetail({
    required this.tag,
    required this.weightHistoryKg,
    required this.vaccinations,
  });

  final String tag;
  final List<int> weightHistoryKg;
  final List<VaccinationRecord> vaccinations;

  AnimalDetail copyWith({
    String? tag,
    List<int>? weightHistoryKg,
    List<VaccinationRecord>? vaccinations,
  }) =>
      AnimalDetail(
        tag: tag ?? this.tag,
        weightHistoryKg: weightHistoryKg ?? this.weightHistoryKg,
        vaccinations: vaccinations ?? this.vaccinations,
      );

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AnimalDetail &&
          tag == other.tag &&
          _same(weightHistoryKg, other.weightHistoryKg) &&
          _same(vaccinations, other.vaccinations);

  @override
  int get hashCode => Object.hash(
        tag,
        Object.hashAll(weightHistoryKg),
        Object.hashAll(vaccinations),
      );
}

bool _same<T>(List<T> left, List<T> right) {
  if (left.length != right.length) return false;
  for (var index = 0; index < left.length; index++) {
    if (left[index] != right[index]) return false;
  }
  return true;
}
