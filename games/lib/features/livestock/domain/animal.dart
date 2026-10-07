enum AnimalCategory { cows, chickens, sheep, goats }

enum AnimalName { bella, daisy, moose, clucky, pepper, fluffy, billy }

enum AnimalBreed {
  holstein,
  jersey,
  angus,
  rhodeIslandRed,
  leghorn,
  merino,
  boer,
}

class Animal {
  const Animal({
    required this.name,
    required this.breed,
    required this.tag,
    required this.ageMonths,
    required this.category,
    required this.healthPercent,
    this.displayName,
    this.displayBreed,
    this.birthDate,
  });

  final AnimalName name;
  final AnimalBreed breed;
  final String tag;
  final int ageMonths;
  final AnimalCategory category;
  final int healthPercent;
  final String? displayName;
  final String? displayBreed;
  final DateTime? birthDate;

  Animal copyWith({
    AnimalName? name,
    AnimalBreed? breed,
    String? tag,
    int? ageMonths,
    AnimalCategory? category,
    int? healthPercent,
    String? displayName,
    String? displayBreed,
    DateTime? birthDate,
  }) {
    return Animal(
      name: name ?? this.name,
      breed: breed ?? this.breed,
      tag: tag ?? this.tag,
      ageMonths: ageMonths ?? this.ageMonths,
      category: category ?? this.category,
      healthPercent: healthPercent ?? this.healthPercent,
      displayName: displayName ?? this.displayName,
      displayBreed: displayBreed ?? this.displayBreed,
      birthDate: birthDate ?? this.birthDate,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Animal &&
          name == other.name &&
          breed == other.breed &&
          tag == other.tag &&
          ageMonths == other.ageMonths &&
          category == other.category &&
          healthPercent == other.healthPercent &&
          displayName == other.displayName &&
          displayBreed == other.displayBreed &&
          birthDate == other.birthDate;

  @override
  int get hashCode => Object.hash(
        name,
        breed,
        tag,
        ageMonths,
        category,
        healthPercent,
        displayName,
        displayBreed,
        birthDate,
      );
}

class HerdSummary {
  const HerdSummary({
    required this.cows,
    required this.chickens,
    required this.sheep,
    required this.goats,
    required this.healthPercent,
    required this.feedPercent,
    required this.productionPercent,
  });

  final int cows;
  final int chickens;
  final int sheep;
  final int goats;
  final int healthPercent;
  final int feedPercent;
  final int productionPercent;

  int get total => cows + chickens + sheep + goats;

  int countFor(AnimalCategory category) => switch (category) {
        AnimalCategory.cows => cows,
        AnimalCategory.chickens => chickens,
        AnimalCategory.sheep => sheep,
        AnimalCategory.goats => goats,
      };

  HerdSummary copyWith({
    int? cows,
    int? chickens,
    int? sheep,
    int? goats,
    int? healthPercent,
    int? feedPercent,
    int? productionPercent,
  }) {
    return HerdSummary(
      cows: cows ?? this.cows,
      chickens: chickens ?? this.chickens,
      sheep: sheep ?? this.sheep,
      goats: goats ?? this.goats,
      healthPercent: healthPercent ?? this.healthPercent,
      feedPercent: feedPercent ?? this.feedPercent,
      productionPercent: productionPercent ?? this.productionPercent,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is HerdSummary &&
          cows == other.cows &&
          chickens == other.chickens &&
          sheep == other.sheep &&
          goats == other.goats &&
          healthPercent == other.healthPercent &&
          feedPercent == other.feedPercent &&
          productionPercent == other.productionPercent;

  @override
  int get hashCode =>   Object.hash(
    cows,
        chickens,
        sheep,
        goats,
        healthPercent,
        feedPercent,
        productionPercent,
      );
}

enum FeedType { haySilage, grainMix, eveningFeed }

class FeedingEvent {
  const FeedingEvent({
    required this.time,
    required this.type,
    required this.isComplete,
  });

  final String time;
  final FeedType type;
  final bool isComplete;

  FeedingEvent copyWith({
    String? time,
    FeedType? type,
    bool? isComplete,
  }) {
    return FeedingEvent(
      time: time ?? this.time,
      type: type ?? this.type,
      isComplete: isComplete ?? this.isComplete,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is FeedingEvent &&
          time == other.time &&
          type == other.type &&
          isComplete == other.isComplete;

  @override
  int get hashCode => Object.hash(time, type, isComplete);
}
