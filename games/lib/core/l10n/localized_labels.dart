import '../../features/farm/domain/farm_zone.dart';
import '../../features/livestock/domain/animal.dart';
import 'generated/app_localizations.dart';

extension FarmZoneLabels on FarmZone {
  String label(AppLocalizations l10n) => switch (this) {
        FarmZone.overview => l10n.overview,
        FarmZone.farmHouse => l10n.farmHouse,
        FarmZone.tomatoField => l10n.tomatoField,
        FarmZone.vegetableField => l10n.vegetableField,
        FarmZone.cornField => l10n.cornField,
        FarmZone.animalArea => l10n.animalArea,
        FarmZone.waterTank => l10n.waterTank,
      };
}

extension AnimalCategoryLabels on AnimalCategory {
  String get titleKey => switch (this) {
        AnimalCategory.cows => 'cows',
        AnimalCategory.chickens => 'chickens',
        AnimalCategory.sheep => 'sheep',
        AnimalCategory.goats => 'goats',
      };

  String title(AppLocalizations l10n) => switch (this) {
        AnimalCategory.cows => l10n.cows,
        AnimalCategory.chickens => l10n.chickens,
        AnimalCategory.sheep => l10n.sheep,
        AnimalCategory.goats => l10n.goats,
      };

  String sectionTitle(AppLocalizations l10n) => switch (this) {
        AnimalCategory.cows => l10n.yourCows,
        AnimalCategory.chickens => l10n.yourChickens,
        AnimalCategory.sheep => l10n.yourSheep,
        AnimalCategory.goats => l10n.yourGoats,
      };
}

extension AnimalLabels on AnimalName {
  String label(AppLocalizations l10n) => switch (this) {
        AnimalName.bella => l10n.nameBella,
        AnimalName.daisy => l10n.nameDaisy,
        AnimalName.moose => l10n.nameMoose,
        AnimalName.clucky => l10n.nameClucky,
        AnimalName.pepper => l10n.namePepper,
        AnimalName.fluffy => l10n.nameFluffy,
        AnimalName.billy => l10n.nameBilly,
      };
}

extension AnimalBreedLabels on AnimalBreed {
  String label(AppLocalizations l10n) => switch (this) {
        AnimalBreed.holstein => l10n.breedHolstein,
        AnimalBreed.jersey => l10n.breedJersey,
        AnimalBreed.angus => l10n.breedAngus,
        AnimalBreed.rhodeIslandRed => l10n.breedRhodeIsland,
        AnimalBreed.leghorn => l10n.breedLeghorn,
        AnimalBreed.merino => l10n.breedMerino,
        AnimalBreed.boer => l10n.breedBoer,
      };
}

extension AnimalValueLabels on Animal {
  String localizedName(AppLocalizations l10n) =>
      displayName ?? name.label(l10n);

  String localizedBreed(AppLocalizations l10n) =>
      displayBreed ?? breed.label(l10n);
}
