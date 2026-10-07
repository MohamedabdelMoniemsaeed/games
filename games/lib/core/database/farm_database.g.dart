// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'farm_database.dart';

// ignore_for_file: type=lint
class $FieldsTable extends Fields with TableInfo<$FieldsTable, Field> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $FieldsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _nameMeta = const VerificationMeta('name');
  @override
  late final GeneratedColumn<String> name = GeneratedColumn<String>(
    'name',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
    defaultConstraints: GeneratedColumn.constraintIsAlways('UNIQUE'),
  );
  static const VerificationMeta _areaHectaresMeta = const VerificationMeta(
    'areaHectares',
  );
  @override
  late final GeneratedColumn<double> areaHectares = GeneratedColumn<double>(
    'area_hectares',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
    defaultValue: const Constant(0),
  );
  static const VerificationMeta _plantingDateMeta = const VerificationMeta(
    'plantingDate',
  );
  @override
  late final GeneratedColumn<DateTime> plantingDate = GeneratedColumn<DateTime>(
    'planting_date',
    aliasedName,
    true,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: false,
  );
  @override
  List<GeneratedColumn> get $columns => [id, name, areaHectares, plantingDate];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'fields';
  @override
  VerificationContext validateIntegrity(
    Insertable<Field> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('name')) {
      context.handle(
        _nameMeta,
        name.isAcceptableOrUnknown(data['name']!, _nameMeta),
      );
    } else if (isInserting) {
      context.missing(_nameMeta);
    }
    if (data.containsKey('area_hectares')) {
      context.handle(
        _areaHectaresMeta,
        areaHectares.isAcceptableOrUnknown(
          data['area_hectares']!,
          _areaHectaresMeta,
        ),
      );
    }
    if (data.containsKey('planting_date')) {
      context.handle(
        _plantingDateMeta,
        plantingDate.isAcceptableOrUnknown(
          data['planting_date']!,
          _plantingDateMeta,
        ),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  Field map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return Field(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      name: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}name'],
      )!,
      areaHectares: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}area_hectares'],
      )!,
      plantingDate: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}planting_date'],
      ),
    );
  }

  @override
  $FieldsTable createAlias(String alias) {
    return $FieldsTable(attachedDatabase, alias);
  }
}

class Field extends DataClass implements Insertable<Field> {
  final int id;
  final String name;
  final double areaHectares;
  final DateTime? plantingDate;
  const Field({
    required this.id,
    required this.name,
    required this.areaHectares,
    this.plantingDate,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['name'] = Variable<String>(name);
    map['area_hectares'] = Variable<double>(areaHectares);
    if (!nullToAbsent || plantingDate != null) {
      map['planting_date'] = Variable<DateTime>(plantingDate);
    }
    return map;
  }

  FieldsCompanion toCompanion(bool nullToAbsent) {
    return FieldsCompanion(
      id: Value(id),
      name: Value(name),
      areaHectares: Value(areaHectares),
      plantingDate: plantingDate == null && nullToAbsent
          ? const Value.absent()
          : Value(plantingDate),
    );
  }

  factory Field.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return Field(
      id: serializer.fromJson<int>(json['id']),
      name: serializer.fromJson<String>(json['name']),
      areaHectares: serializer.fromJson<double>(json['areaHectares']),
      plantingDate: serializer.fromJson<DateTime?>(json['plantingDate']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'name': serializer.toJson<String>(name),
      'areaHectares': serializer.toJson<double>(areaHectares),
      'plantingDate': serializer.toJson<DateTime?>(plantingDate),
    };
  }

  Field copyWith({
    int? id,
    String? name,
    double? areaHectares,
    Value<DateTime?> plantingDate = const Value.absent(),
  }) => Field(
    id: id ?? this.id,
    name: name ?? this.name,
    areaHectares: areaHectares ?? this.areaHectares,
    plantingDate: plantingDate.present ? plantingDate.value : this.plantingDate,
  );
  Field copyWithCompanion(FieldsCompanion data) {
    return Field(
      id: data.id.present ? data.id.value : this.id,
      name: data.name.present ? data.name.value : this.name,
      areaHectares: data.areaHectares.present
          ? data.areaHectares.value
          : this.areaHectares,
      plantingDate: data.plantingDate.present
          ? data.plantingDate.value
          : this.plantingDate,
    );
  }

  @override
  String toString() {
    return (StringBuffer('Field(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('areaHectares: $areaHectares, ')
          ..write('plantingDate: $plantingDate')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, name, areaHectares, plantingDate);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Field &&
          other.id == this.id &&
          other.name == this.name &&
          other.areaHectares == this.areaHectares &&
          other.plantingDate == this.plantingDate);
}

class FieldsCompanion extends UpdateCompanion<Field> {
  final Value<int> id;
  final Value<String> name;
  final Value<double> areaHectares;
  final Value<DateTime?> plantingDate;
  const FieldsCompanion({
    this.id = const Value.absent(),
    this.name = const Value.absent(),
    this.areaHectares = const Value.absent(),
    this.plantingDate = const Value.absent(),
  });
  FieldsCompanion.insert({
    this.id = const Value.absent(),
    required String name,
    this.areaHectares = const Value.absent(),
    this.plantingDate = const Value.absent(),
  }) : name = Value(name);
  static Insertable<Field> custom({
    Expression<int>? id,
    Expression<String>? name,
    Expression<double>? areaHectares,
    Expression<DateTime>? plantingDate,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (name != null) 'name': name,
      if (areaHectares != null) 'area_hectares': areaHectares,
      if (plantingDate != null) 'planting_date': plantingDate,
    });
  }

  FieldsCompanion copyWith({
    Value<int>? id,
    Value<String>? name,
    Value<double>? areaHectares,
    Value<DateTime?>? plantingDate,
  }) {
    return FieldsCompanion(
      id: id ?? this.id,
      name: name ?? this.name,
      areaHectares: areaHectares ?? this.areaHectares,
      plantingDate: plantingDate ?? this.plantingDate,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (name.present) {
      map['name'] = Variable<String>(name.value);
    }
    if (areaHectares.present) {
      map['area_hectares'] = Variable<double>(areaHectares.value);
    }
    if (plantingDate.present) {
      map['planting_date'] = Variable<DateTime>(plantingDate.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('FieldsCompanion(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('areaHectares: $areaHectares, ')
          ..write('plantingDate: $plantingDate')
          ..write(')'))
        .toString();
  }
}

class $CropsTable extends Crops with TableInfo<$CropsTable, Crop> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $CropsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _fieldIdMeta = const VerificationMeta(
    'fieldId',
  );
  @override
  late final GeneratedColumn<int> fieldId = GeneratedColumn<int>(
    'field_id',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'REFERENCES fields (id) ON DELETE CASCADE',
    ),
  );
  static const VerificationMeta _nameMeta = const VerificationMeta('name');
  @override
  late final GeneratedColumn<String> name = GeneratedColumn<String>(
    'name',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _growthPercentMeta = const VerificationMeta(
    'growthPercent',
  );
  @override
  late final GeneratedColumn<int> growthPercent = GeneratedColumn<int>(
    'growth_percent',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultValue: const Constant(0),
  );
  static const VerificationMeta _plantingDateMeta = const VerificationMeta(
    'plantingDate',
  );
  @override
  late final GeneratedColumn<DateTime> plantingDate = GeneratedColumn<DateTime>(
    'planting_date',
    aliasedName,
    true,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: false,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    fieldId,
    name,
    growthPercent,
    plantingDate,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'crops';
  @override
  VerificationContext validateIntegrity(
    Insertable<Crop> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('field_id')) {
      context.handle(
        _fieldIdMeta,
        fieldId.isAcceptableOrUnknown(data['field_id']!, _fieldIdMeta),
      );
    } else if (isInserting) {
      context.missing(_fieldIdMeta);
    }
    if (data.containsKey('name')) {
      context.handle(
        _nameMeta,
        name.isAcceptableOrUnknown(data['name']!, _nameMeta),
      );
    } else if (isInserting) {
      context.missing(_nameMeta);
    }
    if (data.containsKey('growth_percent')) {
      context.handle(
        _growthPercentMeta,
        growthPercent.isAcceptableOrUnknown(
          data['growth_percent']!,
          _growthPercentMeta,
        ),
      );
    }
    if (data.containsKey('planting_date')) {
      context.handle(
        _plantingDateMeta,
        plantingDate.isAcceptableOrUnknown(
          data['planting_date']!,
          _plantingDateMeta,
        ),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  Crop map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return Crop(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      fieldId: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}field_id'],
      )!,
      name: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}name'],
      )!,
      growthPercent: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}growth_percent'],
      )!,
      plantingDate: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}planting_date'],
      ),
    );
  }

  @override
  $CropsTable createAlias(String alias) {
    return $CropsTable(attachedDatabase, alias);
  }
}

class Crop extends DataClass implements Insertable<Crop> {
  final int id;
  final int fieldId;
  final String name;
  final int growthPercent;
  final DateTime? plantingDate;
  const Crop({
    required this.id,
    required this.fieldId,
    required this.name,
    required this.growthPercent,
    this.plantingDate,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['field_id'] = Variable<int>(fieldId);
    map['name'] = Variable<String>(name);
    map['growth_percent'] = Variable<int>(growthPercent);
    if (!nullToAbsent || plantingDate != null) {
      map['planting_date'] = Variable<DateTime>(plantingDate);
    }
    return map;
  }

  CropsCompanion toCompanion(bool nullToAbsent) {
    return CropsCompanion(
      id: Value(id),
      fieldId: Value(fieldId),
      name: Value(name),
      growthPercent: Value(growthPercent),
      plantingDate: plantingDate == null && nullToAbsent
          ? const Value.absent()
          : Value(plantingDate),
    );
  }

  factory Crop.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return Crop(
      id: serializer.fromJson<int>(json['id']),
      fieldId: serializer.fromJson<int>(json['fieldId']),
      name: serializer.fromJson<String>(json['name']),
      growthPercent: serializer.fromJson<int>(json['growthPercent']),
      plantingDate: serializer.fromJson<DateTime?>(json['plantingDate']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'fieldId': serializer.toJson<int>(fieldId),
      'name': serializer.toJson<String>(name),
      'growthPercent': serializer.toJson<int>(growthPercent),
      'plantingDate': serializer.toJson<DateTime?>(plantingDate),
    };
  }

  Crop copyWith({
    int? id,
    int? fieldId,
    String? name,
    int? growthPercent,
    Value<DateTime?> plantingDate = const Value.absent(),
  }) => Crop(
    id: id ?? this.id,
    fieldId: fieldId ?? this.fieldId,
    name: name ?? this.name,
    growthPercent: growthPercent ?? this.growthPercent,
    plantingDate: plantingDate.present ? plantingDate.value : this.plantingDate,
  );
  Crop copyWithCompanion(CropsCompanion data) {
    return Crop(
      id: data.id.present ? data.id.value : this.id,
      fieldId: data.fieldId.present ? data.fieldId.value : this.fieldId,
      name: data.name.present ? data.name.value : this.name,
      growthPercent: data.growthPercent.present
          ? data.growthPercent.value
          : this.growthPercent,
      plantingDate: data.plantingDate.present
          ? data.plantingDate.value
          : this.plantingDate,
    );
  }

  @override
  String toString() {
    return (StringBuffer('Crop(')
          ..write('id: $id, ')
          ..write('fieldId: $fieldId, ')
          ..write('name: $name, ')
          ..write('growthPercent: $growthPercent, ')
          ..write('plantingDate: $plantingDate')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode =>
      Object.hash(id, fieldId, name, growthPercent, plantingDate);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Crop &&
          other.id == this.id &&
          other.fieldId == this.fieldId &&
          other.name == this.name &&
          other.growthPercent == this.growthPercent &&
          other.plantingDate == this.plantingDate);
}

class CropsCompanion extends UpdateCompanion<Crop> {
  final Value<int> id;
  final Value<int> fieldId;
  final Value<String> name;
  final Value<int> growthPercent;
  final Value<DateTime?> plantingDate;
  const CropsCompanion({
    this.id = const Value.absent(),
    this.fieldId = const Value.absent(),
    this.name = const Value.absent(),
    this.growthPercent = const Value.absent(),
    this.plantingDate = const Value.absent(),
  });
  CropsCompanion.insert({
    this.id = const Value.absent(),
    required int fieldId,
    required String name,
    this.growthPercent = const Value.absent(),
    this.plantingDate = const Value.absent(),
  }) : fieldId = Value(fieldId),
       name = Value(name);
  static Insertable<Crop> custom({
    Expression<int>? id,
    Expression<int>? fieldId,
    Expression<String>? name,
    Expression<int>? growthPercent,
    Expression<DateTime>? plantingDate,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (fieldId != null) 'field_id': fieldId,
      if (name != null) 'name': name,
      if (growthPercent != null) 'growth_percent': growthPercent,
      if (plantingDate != null) 'planting_date': plantingDate,
    });
  }

  CropsCompanion copyWith({
    Value<int>? id,
    Value<int>? fieldId,
    Value<String>? name,
    Value<int>? growthPercent,
    Value<DateTime?>? plantingDate,
  }) {
    return CropsCompanion(
      id: id ?? this.id,
      fieldId: fieldId ?? this.fieldId,
      name: name ?? this.name,
      growthPercent: growthPercent ?? this.growthPercent,
      plantingDate: plantingDate ?? this.plantingDate,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (fieldId.present) {
      map['field_id'] = Variable<int>(fieldId.value);
    }
    if (name.present) {
      map['name'] = Variable<String>(name.value);
    }
    if (growthPercent.present) {
      map['growth_percent'] = Variable<int>(growthPercent.value);
    }
    if (plantingDate.present) {
      map['planting_date'] = Variable<DateTime>(plantingDate.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('CropsCompanion(')
          ..write('id: $id, ')
          ..write('fieldId: $fieldId, ')
          ..write('name: $name, ')
          ..write('growthPercent: $growthPercent, ')
          ..write('plantingDate: $plantingDate')
          ..write(')'))
        .toString();
  }
}

class $AnimalsTable extends Animals with TableInfo<$AnimalsTable, Animal> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $AnimalsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _nameMeta = const VerificationMeta('name');
  @override
  late final GeneratedColumn<String> name = GeneratedColumn<String>(
    'name',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _categoryMeta = const VerificationMeta(
    'category',
  );
  @override
  late final GeneratedColumn<String> category = GeneratedColumn<String>(
    'category',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _breedMeta = const VerificationMeta('breed');
  @override
  late final GeneratedColumn<String> breed = GeneratedColumn<String>(
    'breed',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _tagMeta = const VerificationMeta('tag');
  @override
  late final GeneratedColumn<String> tag = GeneratedColumn<String>(
    'tag',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
    defaultConstraints: GeneratedColumn.constraintIsAlways('UNIQUE'),
  );
  static const VerificationMeta _birthDateMeta = const VerificationMeta(
    'birthDate',
  );
  @override
  late final GeneratedColumn<DateTime> birthDate = GeneratedColumn<DateTime>(
    'birth_date',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _healthPercentMeta = const VerificationMeta(
    'healthPercent',
  );
  @override
  late final GeneratedColumn<int> healthPercent = GeneratedColumn<int>(
    'health_percent',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    name,
    category,
    breed,
    tag,
    birthDate,
    healthPercent,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'animals';
  @override
  VerificationContext validateIntegrity(
    Insertable<Animal> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('name')) {
      context.handle(
        _nameMeta,
        name.isAcceptableOrUnknown(data['name']!, _nameMeta),
      );
    } else if (isInserting) {
      context.missing(_nameMeta);
    }
    if (data.containsKey('category')) {
      context.handle(
        _categoryMeta,
        category.isAcceptableOrUnknown(data['category']!, _categoryMeta),
      );
    } else if (isInserting) {
      context.missing(_categoryMeta);
    }
    if (data.containsKey('breed')) {
      context.handle(
        _breedMeta,
        breed.isAcceptableOrUnknown(data['breed']!, _breedMeta),
      );
    } else if (isInserting) {
      context.missing(_breedMeta);
    }
    if (data.containsKey('tag')) {
      context.handle(
        _tagMeta,
        tag.isAcceptableOrUnknown(data['tag']!, _tagMeta),
      );
    } else if (isInserting) {
      context.missing(_tagMeta);
    }
    if (data.containsKey('birth_date')) {
      context.handle(
        _birthDateMeta,
        birthDate.isAcceptableOrUnknown(data['birth_date']!, _birthDateMeta),
      );
    } else if (isInserting) {
      context.missing(_birthDateMeta);
    }
    if (data.containsKey('health_percent')) {
      context.handle(
        _healthPercentMeta,
        healthPercent.isAcceptableOrUnknown(
          data['health_percent']!,
          _healthPercentMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_healthPercentMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  Animal map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return Animal(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      name: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}name'],
      )!,
      category: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}category'],
      )!,
      breed: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}breed'],
      )!,
      tag: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}tag'],
      )!,
      birthDate: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}birth_date'],
      )!,
      healthPercent: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}health_percent'],
      )!,
    );
  }

  @override
  $AnimalsTable createAlias(String alias) {
    return $AnimalsTable(attachedDatabase, alias);
  }
}

class Animal extends DataClass implements Insertable<Animal> {
  final int id;
  final String name;
  final String category;
  final String breed;
  final String tag;
  final DateTime birthDate;
  final int healthPercent;
  const Animal({
    required this.id,
    required this.name,
    required this.category,
    required this.breed,
    required this.tag,
    required this.birthDate,
    required this.healthPercent,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['name'] = Variable<String>(name);
    map['category'] = Variable<String>(category);
    map['breed'] = Variable<String>(breed);
    map['tag'] = Variable<String>(tag);
    map['birth_date'] = Variable<DateTime>(birthDate);
    map['health_percent'] = Variable<int>(healthPercent);
    return map;
  }

  AnimalsCompanion toCompanion(bool nullToAbsent) {
    return AnimalsCompanion(
      id: Value(id),
      name: Value(name),
      category: Value(category),
      breed: Value(breed),
      tag: Value(tag),
      birthDate: Value(birthDate),
      healthPercent: Value(healthPercent),
    );
  }

  factory Animal.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return Animal(
      id: serializer.fromJson<int>(json['id']),
      name: serializer.fromJson<String>(json['name']),
      category: serializer.fromJson<String>(json['category']),
      breed: serializer.fromJson<String>(json['breed']),
      tag: serializer.fromJson<String>(json['tag']),
      birthDate: serializer.fromJson<DateTime>(json['birthDate']),
      healthPercent: serializer.fromJson<int>(json['healthPercent']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'name': serializer.toJson<String>(name),
      'category': serializer.toJson<String>(category),
      'breed': serializer.toJson<String>(breed),
      'tag': serializer.toJson<String>(tag),
      'birthDate': serializer.toJson<DateTime>(birthDate),
      'healthPercent': serializer.toJson<int>(healthPercent),
    };
  }

  Animal copyWith({
    int? id,
    String? name,
    String? category,
    String? breed,
    String? tag,
    DateTime? birthDate,
    int? healthPercent,
  }) => Animal(
    id: id ?? this.id,
    name: name ?? this.name,
    category: category ?? this.category,
    breed: breed ?? this.breed,
    tag: tag ?? this.tag,
    birthDate: birthDate ?? this.birthDate,
    healthPercent: healthPercent ?? this.healthPercent,
  );
  Animal copyWithCompanion(AnimalsCompanion data) {
    return Animal(
      id: data.id.present ? data.id.value : this.id,
      name: data.name.present ? data.name.value : this.name,
      category: data.category.present ? data.category.value : this.category,
      breed: data.breed.present ? data.breed.value : this.breed,
      tag: data.tag.present ? data.tag.value : this.tag,
      birthDate: data.birthDate.present ? data.birthDate.value : this.birthDate,
      healthPercent: data.healthPercent.present
          ? data.healthPercent.value
          : this.healthPercent,
    );
  }

  @override
  String toString() {
    return (StringBuffer('Animal(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('category: $category, ')
          ..write('breed: $breed, ')
          ..write('tag: $tag, ')
          ..write('birthDate: $birthDate, ')
          ..write('healthPercent: $healthPercent')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode =>
      Object.hash(id, name, category, breed, tag, birthDate, healthPercent);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Animal &&
          other.id == this.id &&
          other.name == this.name &&
          other.category == this.category &&
          other.breed == this.breed &&
          other.tag == this.tag &&
          other.birthDate == this.birthDate &&
          other.healthPercent == this.healthPercent);
}

class AnimalsCompanion extends UpdateCompanion<Animal> {
  final Value<int> id;
  final Value<String> name;
  final Value<String> category;
  final Value<String> breed;
  final Value<String> tag;
  final Value<DateTime> birthDate;
  final Value<int> healthPercent;
  const AnimalsCompanion({
    this.id = const Value.absent(),
    this.name = const Value.absent(),
    this.category = const Value.absent(),
    this.breed = const Value.absent(),
    this.tag = const Value.absent(),
    this.birthDate = const Value.absent(),
    this.healthPercent = const Value.absent(),
  });
  AnimalsCompanion.insert({
    this.id = const Value.absent(),
    required String name,
    required String category,
    required String breed,
    required String tag,
    required DateTime birthDate,
    required int healthPercent,
  }) : name = Value(name),
       category = Value(category),
       breed = Value(breed),
       tag = Value(tag),
       birthDate = Value(birthDate),
       healthPercent = Value(healthPercent);
  static Insertable<Animal> custom({
    Expression<int>? id,
    Expression<String>? name,
    Expression<String>? category,
    Expression<String>? breed,
    Expression<String>? tag,
    Expression<DateTime>? birthDate,
    Expression<int>? healthPercent,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (name != null) 'name': name,
      if (category != null) 'category': category,
      if (breed != null) 'breed': breed,
      if (tag != null) 'tag': tag,
      if (birthDate != null) 'birth_date': birthDate,
      if (healthPercent != null) 'health_percent': healthPercent,
    });
  }

  AnimalsCompanion copyWith({
    Value<int>? id,
    Value<String>? name,
    Value<String>? category,
    Value<String>? breed,
    Value<String>? tag,
    Value<DateTime>? birthDate,
    Value<int>? healthPercent,
  }) {
    return AnimalsCompanion(
      id: id ?? this.id,
      name: name ?? this.name,
      category: category ?? this.category,
      breed: breed ?? this.breed,
      tag: tag ?? this.tag,
      birthDate: birthDate ?? this.birthDate,
      healthPercent: healthPercent ?? this.healthPercent,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (name.present) {
      map['name'] = Variable<String>(name.value);
    }
    if (category.present) {
      map['category'] = Variable<String>(category.value);
    }
    if (breed.present) {
      map['breed'] = Variable<String>(breed.value);
    }
    if (tag.present) {
      map['tag'] = Variable<String>(tag.value);
    }
    if (birthDate.present) {
      map['birth_date'] = Variable<DateTime>(birthDate.value);
    }
    if (healthPercent.present) {
      map['health_percent'] = Variable<int>(healthPercent.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('AnimalsCompanion(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('category: $category, ')
          ..write('breed: $breed, ')
          ..write('tag: $tag, ')
          ..write('birthDate: $birthDate, ')
          ..write('healthPercent: $healthPercent')
          ..write(')'))
        .toString();
  }
}

class $TasksTable extends Tasks with TableInfo<$TasksTable, Task> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $TasksTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _titleMeta = const VerificationMeta('title');
  @override
  late final GeneratedColumn<String> title = GeneratedColumn<String>(
    'title',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _isCompletedMeta = const VerificationMeta(
    'isCompleted',
  );
  @override
  late final GeneratedColumn<bool> isCompleted = GeneratedColumn<bool>(
    'is_completed',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("is_completed" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  static const VerificationMeta _dueDateMeta = const VerificationMeta(
    'dueDate',
  );
  @override
  late final GeneratedColumn<DateTime> dueDate = GeneratedColumn<DateTime>(
    'due_date',
    aliasedName,
    true,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: false,
  );
  @override
  List<GeneratedColumn> get $columns => [id, title, isCompleted, dueDate];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'tasks';
  @override
  VerificationContext validateIntegrity(
    Insertable<Task> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('title')) {
      context.handle(
        _titleMeta,
        title.isAcceptableOrUnknown(data['title']!, _titleMeta),
      );
    } else if (isInserting) {
      context.missing(_titleMeta);
    }
    if (data.containsKey('is_completed')) {
      context.handle(
        _isCompletedMeta,
        isCompleted.isAcceptableOrUnknown(
          data['is_completed']!,
          _isCompletedMeta,
        ),
      );
    }
    if (data.containsKey('due_date')) {
      context.handle(
        _dueDateMeta,
        dueDate.isAcceptableOrUnknown(data['due_date']!, _dueDateMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  Task map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return Task(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      title: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}title'],
      )!,
      isCompleted: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}is_completed'],
      )!,
      dueDate: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}due_date'],
      ),
    );
  }

  @override
  $TasksTable createAlias(String alias) {
    return $TasksTable(attachedDatabase, alias);
  }
}

class Task extends DataClass implements Insertable<Task> {
  final int id;
  final String title;
  final bool isCompleted;
  final DateTime? dueDate;
  const Task({
    required this.id,
    required this.title,
    required this.isCompleted,
    this.dueDate,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['title'] = Variable<String>(title);
    map['is_completed'] = Variable<bool>(isCompleted);
    if (!nullToAbsent || dueDate != null) {
      map['due_date'] = Variable<DateTime>(dueDate);
    }
    return map;
  }

  TasksCompanion toCompanion(bool nullToAbsent) {
    return TasksCompanion(
      id: Value(id),
      title: Value(title),
      isCompleted: Value(isCompleted),
      dueDate: dueDate == null && nullToAbsent
          ? const Value.absent()
          : Value(dueDate),
    );
  }

  factory Task.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return Task(
      id: serializer.fromJson<int>(json['id']),
      title: serializer.fromJson<String>(json['title']),
      isCompleted: serializer.fromJson<bool>(json['isCompleted']),
      dueDate: serializer.fromJson<DateTime?>(json['dueDate']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'title': serializer.toJson<String>(title),
      'isCompleted': serializer.toJson<bool>(isCompleted),
      'dueDate': serializer.toJson<DateTime?>(dueDate),
    };
  }

  Task copyWith({
    int? id,
    String? title,
    bool? isCompleted,
    Value<DateTime?> dueDate = const Value.absent(),
  }) => Task(
    id: id ?? this.id,
    title: title ?? this.title,
    isCompleted: isCompleted ?? this.isCompleted,
    dueDate: dueDate.present ? dueDate.value : this.dueDate,
  );
  Task copyWithCompanion(TasksCompanion data) {
    return Task(
      id: data.id.present ? data.id.value : this.id,
      title: data.title.present ? data.title.value : this.title,
      isCompleted: data.isCompleted.present
          ? data.isCompleted.value
          : this.isCompleted,
      dueDate: data.dueDate.present ? data.dueDate.value : this.dueDate,
    );
  }

  @override
  String toString() {
    return (StringBuffer('Task(')
          ..write('id: $id, ')
          ..write('title: $title, ')
          ..write('isCompleted: $isCompleted, ')
          ..write('dueDate: $dueDate')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, title, isCompleted, dueDate);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Task &&
          other.id == this.id &&
          other.title == this.title &&
          other.isCompleted == this.isCompleted &&
          other.dueDate == this.dueDate);
}

class TasksCompanion extends UpdateCompanion<Task> {
  final Value<int> id;
  final Value<String> title;
  final Value<bool> isCompleted;
  final Value<DateTime?> dueDate;
  const TasksCompanion({
    this.id = const Value.absent(),
    this.title = const Value.absent(),
    this.isCompleted = const Value.absent(),
    this.dueDate = const Value.absent(),
  });
  TasksCompanion.insert({
    this.id = const Value.absent(),
    required String title,
    this.isCompleted = const Value.absent(),
    this.dueDate = const Value.absent(),
  }) : title = Value(title);
  static Insertable<Task> custom({
    Expression<int>? id,
    Expression<String>? title,
    Expression<bool>? isCompleted,
    Expression<DateTime>? dueDate,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (title != null) 'title': title,
      if (isCompleted != null) 'is_completed': isCompleted,
      if (dueDate != null) 'due_date': dueDate,
    });
  }

  TasksCompanion copyWith({
    Value<int>? id,
    Value<String>? title,
    Value<bool>? isCompleted,
    Value<DateTime?>? dueDate,
  }) {
    return TasksCompanion(
      id: id ?? this.id,
      title: title ?? this.title,
      isCompleted: isCompleted ?? this.isCompleted,
      dueDate: dueDate ?? this.dueDate,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (title.present) {
      map['title'] = Variable<String>(title.value);
    }
    if (isCompleted.present) {
      map['is_completed'] = Variable<bool>(isCompleted.value);
    }
    if (dueDate.present) {
      map['due_date'] = Variable<DateTime>(dueDate.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('TasksCompanion(')
          ..write('id: $id, ')
          ..write('title: $title, ')
          ..write('isCompleted: $isCompleted, ')
          ..write('dueDate: $dueDate')
          ..write(')'))
        .toString();
  }
}

class $HarvestPlansTable extends HarvestPlans
    with TableInfo<$HarvestPlansTable, HarvestPlan> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $HarvestPlansTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _fieldNameMeta = const VerificationMeta(
    'fieldName',
  );
  @override
  late final GeneratedColumn<String> fieldName = GeneratedColumn<String>(
    'field_name',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _cropNameMeta = const VerificationMeta(
    'cropName',
  );
  @override
  late final GeneratedColumn<String> cropName = GeneratedColumn<String>(
    'crop_name',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _expectedDateMeta = const VerificationMeta(
    'expectedDate',
  );
  @override
  late final GeneratedColumn<DateTime> expectedDate = GeneratedColumn<DateTime>(
    'expected_date',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _expectedYieldKgMeta = const VerificationMeta(
    'expectedYieldKg',
  );
  @override
  late final GeneratedColumn<double> expectedYieldKg = GeneratedColumn<double>(
    'expected_yield_kg',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _isHarvestedMeta = const VerificationMeta(
    'isHarvested',
  );
  @override
  late final GeneratedColumn<bool> isHarvested = GeneratedColumn<bool>(
    'is_harvested',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("is_harvested" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  static const VerificationMeta _actualYieldKgMeta = const VerificationMeta(
    'actualYieldKg',
  );
  @override
  late final GeneratedColumn<double> actualYieldKg = GeneratedColumn<double>(
    'actual_yield_kg',
    aliasedName,
    true,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    fieldName,
    cropName,
    expectedDate,
    expectedYieldKg,
    isHarvested,
    actualYieldKg,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'harvest_plans';
  @override
  VerificationContext validateIntegrity(
    Insertable<HarvestPlan> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('field_name')) {
      context.handle(
        _fieldNameMeta,
        fieldName.isAcceptableOrUnknown(data['field_name']!, _fieldNameMeta),
      );
    } else if (isInserting) {
      context.missing(_fieldNameMeta);
    }
    if (data.containsKey('crop_name')) {
      context.handle(
        _cropNameMeta,
        cropName.isAcceptableOrUnknown(data['crop_name']!, _cropNameMeta),
      );
    } else if (isInserting) {
      context.missing(_cropNameMeta);
    }
    if (data.containsKey('expected_date')) {
      context.handle(
        _expectedDateMeta,
        expectedDate.isAcceptableOrUnknown(
          data['expected_date']!,
          _expectedDateMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_expectedDateMeta);
    }
    if (data.containsKey('expected_yield_kg')) {
      context.handle(
        _expectedYieldKgMeta,
        expectedYieldKg.isAcceptableOrUnknown(
          data['expected_yield_kg']!,
          _expectedYieldKgMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_expectedYieldKgMeta);
    }
    if (data.containsKey('is_harvested')) {
      context.handle(
        _isHarvestedMeta,
        isHarvested.isAcceptableOrUnknown(
          data['is_harvested']!,
          _isHarvestedMeta,
        ),
      );
    }
    if (data.containsKey('actual_yield_kg')) {
      context.handle(
        _actualYieldKgMeta,
        actualYieldKg.isAcceptableOrUnknown(
          data['actual_yield_kg']!,
          _actualYieldKgMeta,
        ),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  HarvestPlan map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return HarvestPlan(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      fieldName: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}field_name'],
      )!,
      cropName: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}crop_name'],
      )!,
      expectedDate: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}expected_date'],
      )!,
      expectedYieldKg: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}expected_yield_kg'],
      )!,
      isHarvested: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}is_harvested'],
      )!,
      actualYieldKg: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}actual_yield_kg'],
      ),
    );
  }

  @override
  $HarvestPlansTable createAlias(String alias) {
    return $HarvestPlansTable(attachedDatabase, alias);
  }
}

class HarvestPlan extends DataClass implements Insertable<HarvestPlan> {
  final int id;
  final String fieldName;
  final String cropName;
  final DateTime expectedDate;
  final double expectedYieldKg;
  final bool isHarvested;
  final double? actualYieldKg;
  const HarvestPlan({
    required this.id,
    required this.fieldName,
    required this.cropName,
    required this.expectedDate,
    required this.expectedYieldKg,
    required this.isHarvested,
    this.actualYieldKg,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['field_name'] = Variable<String>(fieldName);
    map['crop_name'] = Variable<String>(cropName);
    map['expected_date'] = Variable<DateTime>(expectedDate);
    map['expected_yield_kg'] = Variable<double>(expectedYieldKg);
    map['is_harvested'] = Variable<bool>(isHarvested);
    if (!nullToAbsent || actualYieldKg != null) {
      map['actual_yield_kg'] = Variable<double>(actualYieldKg);
    }
    return map;
  }

  HarvestPlansCompanion toCompanion(bool nullToAbsent) {
    return HarvestPlansCompanion(
      id: Value(id),
      fieldName: Value(fieldName),
      cropName: Value(cropName),
      expectedDate: Value(expectedDate),
      expectedYieldKg: Value(expectedYieldKg),
      isHarvested: Value(isHarvested),
      actualYieldKg: actualYieldKg == null && nullToAbsent
          ? const Value.absent()
          : Value(actualYieldKg),
    );
  }

  factory HarvestPlan.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return HarvestPlan(
      id: serializer.fromJson<int>(json['id']),
      fieldName: serializer.fromJson<String>(json['fieldName']),
      cropName: serializer.fromJson<String>(json['cropName']),
      expectedDate: serializer.fromJson<DateTime>(json['expectedDate']),
      expectedYieldKg: serializer.fromJson<double>(json['expectedYieldKg']),
      isHarvested: serializer.fromJson<bool>(json['isHarvested']),
      actualYieldKg: serializer.fromJson<double?>(json['actualYieldKg']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'fieldName': serializer.toJson<String>(fieldName),
      'cropName': serializer.toJson<String>(cropName),
      'expectedDate': serializer.toJson<DateTime>(expectedDate),
      'expectedYieldKg': serializer.toJson<double>(expectedYieldKg),
      'isHarvested': serializer.toJson<bool>(isHarvested),
      'actualYieldKg': serializer.toJson<double?>(actualYieldKg),
    };
  }

  HarvestPlan copyWith({
    int? id,
    String? fieldName,
    String? cropName,
    DateTime? expectedDate,
    double? expectedYieldKg,
    bool? isHarvested,
    Value<double?> actualYieldKg = const Value.absent(),
  }) => HarvestPlan(
    id: id ?? this.id,
    fieldName: fieldName ?? this.fieldName,
    cropName: cropName ?? this.cropName,
    expectedDate: expectedDate ?? this.expectedDate,
    expectedYieldKg: expectedYieldKg ?? this.expectedYieldKg,
    isHarvested: isHarvested ?? this.isHarvested,
    actualYieldKg: actualYieldKg.present
        ? actualYieldKg.value
        : this.actualYieldKg,
  );
  HarvestPlan copyWithCompanion(HarvestPlansCompanion data) {
    return HarvestPlan(
      id: data.id.present ? data.id.value : this.id,
      fieldName: data.fieldName.present ? data.fieldName.value : this.fieldName,
      cropName: data.cropName.present ? data.cropName.value : this.cropName,
      expectedDate: data.expectedDate.present
          ? data.expectedDate.value
          : this.expectedDate,
      expectedYieldKg: data.expectedYieldKg.present
          ? data.expectedYieldKg.value
          : this.expectedYieldKg,
      isHarvested: data.isHarvested.present
          ? data.isHarvested.value
          : this.isHarvested,
      actualYieldKg: data.actualYieldKg.present
          ? data.actualYieldKg.value
          : this.actualYieldKg,
    );
  }

  @override
  String toString() {
    return (StringBuffer('HarvestPlan(')
          ..write('id: $id, ')
          ..write('fieldName: $fieldName, ')
          ..write('cropName: $cropName, ')
          ..write('expectedDate: $expectedDate, ')
          ..write('expectedYieldKg: $expectedYieldKg, ')
          ..write('isHarvested: $isHarvested, ')
          ..write('actualYieldKg: $actualYieldKg')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    fieldName,
    cropName,
    expectedDate,
    expectedYieldKg,
    isHarvested,
    actualYieldKg,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is HarvestPlan &&
          other.id == this.id &&
          other.fieldName == this.fieldName &&
          other.cropName == this.cropName &&
          other.expectedDate == this.expectedDate &&
          other.expectedYieldKg == this.expectedYieldKg &&
          other.isHarvested == this.isHarvested &&
          other.actualYieldKg == this.actualYieldKg);
}

class HarvestPlansCompanion extends UpdateCompanion<HarvestPlan> {
  final Value<int> id;
  final Value<String> fieldName;
  final Value<String> cropName;
  final Value<DateTime> expectedDate;
  final Value<double> expectedYieldKg;
  final Value<bool> isHarvested;
  final Value<double?> actualYieldKg;
  const HarvestPlansCompanion({
    this.id = const Value.absent(),
    this.fieldName = const Value.absent(),
    this.cropName = const Value.absent(),
    this.expectedDate = const Value.absent(),
    this.expectedYieldKg = const Value.absent(),
    this.isHarvested = const Value.absent(),
    this.actualYieldKg = const Value.absent(),
  });
  HarvestPlansCompanion.insert({
    this.id = const Value.absent(),
    required String fieldName,
    required String cropName,
    required DateTime expectedDate,
    required double expectedYieldKg,
    this.isHarvested = const Value.absent(),
    this.actualYieldKg = const Value.absent(),
  }) : fieldName = Value(fieldName),
       cropName = Value(cropName),
       expectedDate = Value(expectedDate),
       expectedYieldKg = Value(expectedYieldKg);
  static Insertable<HarvestPlan> custom({
    Expression<int>? id,
    Expression<String>? fieldName,
    Expression<String>? cropName,
    Expression<DateTime>? expectedDate,
    Expression<double>? expectedYieldKg,
    Expression<bool>? isHarvested,
    Expression<double>? actualYieldKg,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (fieldName != null) 'field_name': fieldName,
      if (cropName != null) 'crop_name': cropName,
      if (expectedDate != null) 'expected_date': expectedDate,
      if (expectedYieldKg != null) 'expected_yield_kg': expectedYieldKg,
      if (isHarvested != null) 'is_harvested': isHarvested,
      if (actualYieldKg != null) 'actual_yield_kg': actualYieldKg,
    });
  }

  HarvestPlansCompanion copyWith({
    Value<int>? id,
    Value<String>? fieldName,
    Value<String>? cropName,
    Value<DateTime>? expectedDate,
    Value<double>? expectedYieldKg,
    Value<bool>? isHarvested,
    Value<double?>? actualYieldKg,
  }) {
    return HarvestPlansCompanion(
      id: id ?? this.id,
      fieldName: fieldName ?? this.fieldName,
      cropName: cropName ?? this.cropName,
      expectedDate: expectedDate ?? this.expectedDate,
      expectedYieldKg: expectedYieldKg ?? this.expectedYieldKg,
      isHarvested: isHarvested ?? this.isHarvested,
      actualYieldKg: actualYieldKg ?? this.actualYieldKg,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (fieldName.present) {
      map['field_name'] = Variable<String>(fieldName.value);
    }
    if (cropName.present) {
      map['crop_name'] = Variable<String>(cropName.value);
    }
    if (expectedDate.present) {
      map['expected_date'] = Variable<DateTime>(expectedDate.value);
    }
    if (expectedYieldKg.present) {
      map['expected_yield_kg'] = Variable<double>(expectedYieldKg.value);
    }
    if (isHarvested.present) {
      map['is_harvested'] = Variable<bool>(isHarvested.value);
    }
    if (actualYieldKg.present) {
      map['actual_yield_kg'] = Variable<double>(actualYieldKg.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('HarvestPlansCompanion(')
          ..write('id: $id, ')
          ..write('fieldName: $fieldName, ')
          ..write('cropName: $cropName, ')
          ..write('expectedDate: $expectedDate, ')
          ..write('expectedYieldKg: $expectedYieldKg, ')
          ..write('isHarvested: $isHarvested, ')
          ..write('actualYieldKg: $actualYieldKg')
          ..write(')'))
        .toString();
  }
}

class $WaterLogTable extends WaterLog
    with TableInfo<$WaterLogTable, WaterLogData> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $WaterLogTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _recordedAtMeta = const VerificationMeta(
    'recordedAt',
  );
  @override
  late final GeneratedColumn<DateTime> recordedAt = GeneratedColumn<DateTime>(
    'recorded_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _litersMeta = const VerificationMeta('liters');
  @override
  late final GeneratedColumn<double> liters = GeneratedColumn<double>(
    'liters',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _isUsageMeta = const VerificationMeta(
    'isUsage',
  );
  @override
  late final GeneratedColumn<bool> isUsage = GeneratedColumn<bool>(
    'is_usage',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("is_usage" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  static const VerificationMeta _fieldIdMeta = const VerificationMeta(
    'fieldId',
  );
  @override
  late final GeneratedColumn<int> fieldId = GeneratedColumn<int>(
    'field_id',
    aliasedName,
    true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'REFERENCES fields (id) ON DELETE SET NULL',
    ),
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    recordedAt,
    liters,
    isUsage,
    fieldId,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'water_log';
  @override
  VerificationContext validateIntegrity(
    Insertable<WaterLogData> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('recorded_at')) {
      context.handle(
        _recordedAtMeta,
        recordedAt.isAcceptableOrUnknown(data['recorded_at']!, _recordedAtMeta),
      );
    } else if (isInserting) {
      context.missing(_recordedAtMeta);
    }
    if (data.containsKey('liters')) {
      context.handle(
        _litersMeta,
        liters.isAcceptableOrUnknown(data['liters']!, _litersMeta),
      );
    } else if (isInserting) {
      context.missing(_litersMeta);
    }
    if (data.containsKey('is_usage')) {
      context.handle(
        _isUsageMeta,
        isUsage.isAcceptableOrUnknown(data['is_usage']!, _isUsageMeta),
      );
    }
    if (data.containsKey('field_id')) {
      context.handle(
        _fieldIdMeta,
        fieldId.isAcceptableOrUnknown(data['field_id']!, _fieldIdMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  WaterLogData map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return WaterLogData(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      recordedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}recorded_at'],
      )!,
      liters: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}liters'],
      )!,
      isUsage: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}is_usage'],
      )!,
      fieldId: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}field_id'],
      ),
    );
  }

  @override
  $WaterLogTable createAlias(String alias) {
    return $WaterLogTable(attachedDatabase, alias);
  }
}

class WaterLogData extends DataClass implements Insertable<WaterLogData> {
  final int id;
  final DateTime recordedAt;
  final double liters;
  final bool isUsage;
  final int? fieldId;
  const WaterLogData({
    required this.id,
    required this.recordedAt,
    required this.liters,
    required this.isUsage,
    this.fieldId,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['recorded_at'] = Variable<DateTime>(recordedAt);
    map['liters'] = Variable<double>(liters);
    map['is_usage'] = Variable<bool>(isUsage);
    if (!nullToAbsent || fieldId != null) {
      map['field_id'] = Variable<int>(fieldId);
    }
    return map;
  }

  WaterLogCompanion toCompanion(bool nullToAbsent) {
    return WaterLogCompanion(
      id: Value(id),
      recordedAt: Value(recordedAt),
      liters: Value(liters),
      isUsage: Value(isUsage),
      fieldId: fieldId == null && nullToAbsent
          ? const Value.absent()
          : Value(fieldId),
    );
  }

  factory WaterLogData.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return WaterLogData(
      id: serializer.fromJson<int>(json['id']),
      recordedAt: serializer.fromJson<DateTime>(json['recordedAt']),
      liters: serializer.fromJson<double>(json['liters']),
      isUsage: serializer.fromJson<bool>(json['isUsage']),
      fieldId: serializer.fromJson<int?>(json['fieldId']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'recordedAt': serializer.toJson<DateTime>(recordedAt),
      'liters': serializer.toJson<double>(liters),
      'isUsage': serializer.toJson<bool>(isUsage),
      'fieldId': serializer.toJson<int?>(fieldId),
    };
  }

  WaterLogData copyWith({
    int? id,
    DateTime? recordedAt,
    double? liters,
    bool? isUsage,
    Value<int?> fieldId = const Value.absent(),
  }) => WaterLogData(
    id: id ?? this.id,
    recordedAt: recordedAt ?? this.recordedAt,
    liters: liters ?? this.liters,
    isUsage: isUsage ?? this.isUsage,
    fieldId: fieldId.present ? fieldId.value : this.fieldId,
  );
  WaterLogData copyWithCompanion(WaterLogCompanion data) {
    return WaterLogData(
      id: data.id.present ? data.id.value : this.id,
      recordedAt: data.recordedAt.present
          ? data.recordedAt.value
          : this.recordedAt,
      liters: data.liters.present ? data.liters.value : this.liters,
      isUsage: data.isUsage.present ? data.isUsage.value : this.isUsage,
      fieldId: data.fieldId.present ? data.fieldId.value : this.fieldId,
    );
  }

  @override
  String toString() {
    return (StringBuffer('WaterLogData(')
          ..write('id: $id, ')
          ..write('recordedAt: $recordedAt, ')
          ..write('liters: $liters, ')
          ..write('isUsage: $isUsage, ')
          ..write('fieldId: $fieldId')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, recordedAt, liters, isUsage, fieldId);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is WaterLogData &&
          other.id == this.id &&
          other.recordedAt == this.recordedAt &&
          other.liters == this.liters &&
          other.isUsage == this.isUsage &&
          other.fieldId == this.fieldId);
}

class WaterLogCompanion extends UpdateCompanion<WaterLogData> {
  final Value<int> id;
  final Value<DateTime> recordedAt;
  final Value<double> liters;
  final Value<bool> isUsage;
  final Value<int?> fieldId;
  const WaterLogCompanion({
    this.id = const Value.absent(),
    this.recordedAt = const Value.absent(),
    this.liters = const Value.absent(),
    this.isUsage = const Value.absent(),
    this.fieldId = const Value.absent(),
  });
  WaterLogCompanion.insert({
    this.id = const Value.absent(),
    required DateTime recordedAt,
    required double liters,
    this.isUsage = const Value.absent(),
    this.fieldId = const Value.absent(),
  }) : recordedAt = Value(recordedAt),
       liters = Value(liters);
  static Insertable<WaterLogData> custom({
    Expression<int>? id,
    Expression<DateTime>? recordedAt,
    Expression<double>? liters,
    Expression<bool>? isUsage,
    Expression<int>? fieldId,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (recordedAt != null) 'recorded_at': recordedAt,
      if (liters != null) 'liters': liters,
      if (isUsage != null) 'is_usage': isUsage,
      if (fieldId != null) 'field_id': fieldId,
    });
  }

  WaterLogCompanion copyWith({
    Value<int>? id,
    Value<DateTime>? recordedAt,
    Value<double>? liters,
    Value<bool>? isUsage,
    Value<int?>? fieldId,
  }) {
    return WaterLogCompanion(
      id: id ?? this.id,
      recordedAt: recordedAt ?? this.recordedAt,
      liters: liters ?? this.liters,
      isUsage: isUsage ?? this.isUsage,
      fieldId: fieldId ?? this.fieldId,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (recordedAt.present) {
      map['recorded_at'] = Variable<DateTime>(recordedAt.value);
    }
    if (liters.present) {
      map['liters'] = Variable<double>(liters.value);
    }
    if (isUsage.present) {
      map['is_usage'] = Variable<bool>(isUsage.value);
    }
    if (fieldId.present) {
      map['field_id'] = Variable<int>(fieldId.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('WaterLogCompanion(')
          ..write('id: $id, ')
          ..write('recordedAt: $recordedAt, ')
          ..write('liters: $liters, ')
          ..write('isUsage: $isUsage, ')
          ..write('fieldId: $fieldId')
          ..write(')'))
        .toString();
  }
}

abstract class _$FarmDatabase extends GeneratedDatabase {
  _$FarmDatabase(QueryExecutor e) : super(e);
  $FarmDatabaseManager get managers => $FarmDatabaseManager(this);
  late final $FieldsTable fields = $FieldsTable(this);
  late final $CropsTable crops = $CropsTable(this);
  late final $AnimalsTable animals = $AnimalsTable(this);
  late final $TasksTable tasks = $TasksTable(this);
  late final $HarvestPlansTable harvestPlans = $HarvestPlansTable(this);
  late final $WaterLogTable waterLog = $WaterLogTable(this);
  @override
  Iterable<TableInfo<Table, Object?>> get allTables =>
      allSchemaEntities.whereType<TableInfo<Table, Object?>>();
  @override
  List<DatabaseSchemaEntity> get allSchemaEntities => [
    fields,
    crops,
    animals,
    tasks,
    harvestPlans,
    waterLog,
  ];
  @override
  StreamQueryUpdateRules get streamUpdateRules => const StreamQueryUpdateRules([
    WritePropagation(
      on: TableUpdateQuery.onTableName(
        'fields',
        limitUpdateKind: UpdateKind.delete,
      ),
      result: [TableUpdate('crops', kind: UpdateKind.delete)],
    ),
    WritePropagation(
      on: TableUpdateQuery.onTableName(
        'fields',
        limitUpdateKind: UpdateKind.delete,
      ),
      result: [TableUpdate('water_log', kind: UpdateKind.update)],
    ),
  ]);
}

typedef $$FieldsTableCreateCompanionBuilder = FieldsCompanion Function({
  Value<int> id,
  required String name,
  Value<double> areaHectares,
  Value<DateTime?> plantingDate,
});
typedef $$FieldsTableUpdateCompanionBuilder = FieldsCompanion Function({
  Value<int> id,
  Value<String> name,
  Value<double> areaHectares,
  Value<DateTime?> plantingDate,
});

final class $$FieldsTableReferences
    extends BaseReferences<_$FarmDatabase, $FieldsTable, Field> {
  $$FieldsTableReferences(super.$_db, super.$_table, super.$_typedResult);

  static MultiTypedResultKey<$CropsTable, List<Crop>> _cropsRefsTable(
    _$FarmDatabase db,
  ) => MultiTypedResultKey.fromTable(
    db.crops,
    aliasName: 'fields__id__crops__field_id',
  );

  $$CropsTableProcessedTableManager get cropsRefs {
    final manager = $$CropsTableTableManager(
      $_db,
      $_db.crops,
    ).filter((f) => f.fieldId.id.sqlEquals($_itemColumn<int>('id')!));

    final cache = $_typedResult.readTableOrNull(_cropsRefsTable($_db));
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: cache),
    );
  }

  static MultiTypedResultKey<$WaterLogTable, List<WaterLogData>>
  _waterLogRefsTable(_$FarmDatabase db) => MultiTypedResultKey.fromTable(
    db.waterLog,
    aliasName: 'fields__id__water_log__field_id',
  );

  $$WaterLogTableProcessedTableManager get waterLogRefs {
    final manager = $$WaterLogTableTableManager(
      $_db,
      $_db.waterLog,
    ).filter((f) => f.fieldId.id.sqlEquals($_itemColumn<int>('id')!));

    final cache = $_typedResult.readTableOrNull(_waterLogRefsTable($_db));
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: cache),
    );
  }
}

class $$FieldsTableFilterComposer
    extends Composer<_$FarmDatabase, $FieldsTable> {
  $$FieldsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get areaHectares => $composableBuilder(
    column: $table.areaHectares,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get plantingDate => $composableBuilder(
    column: $table.plantingDate,
    builder: (column) => ColumnFilters(column),
  );

  Expression<bool> cropsRefs(
    Expression<bool> Function($$CropsTableFilterComposer f) f,
  ) {
    final $$CropsTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.id,
      referencedTable: $db.crops,
      getReferencedColumn: (t) => t.fieldId,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$CropsTableFilterComposer(
            $db: $db,
            $table: $db.crops,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return f(composer);
  }

  Expression<bool> waterLogRefs(
    Expression<bool> Function($$WaterLogTableFilterComposer f) f,
  ) {
    final $$WaterLogTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.id,
      referencedTable: $db.waterLog,
      getReferencedColumn: (t) => t.fieldId,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$WaterLogTableFilterComposer(
            $db: $db,
            $table: $db.waterLog,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return f(composer);
  }
}

class $$FieldsTableOrderingComposer
    extends Composer<_$FarmDatabase, $FieldsTable> {
  $$FieldsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get areaHectares => $composableBuilder(
    column: $table.areaHectares,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get plantingDate => $composableBuilder(
    column: $table.plantingDate,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$FieldsTableAnnotationComposer
    extends Composer<_$FarmDatabase, $FieldsTable> {
  $$FieldsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get name =>
      $composableBuilder(column: $table.name, builder: (column) => column);

  GeneratedColumn<double> get areaHectares => $composableBuilder(
    column: $table.areaHectares,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get plantingDate => $composableBuilder(
    column: $table.plantingDate,
    builder: (column) => column,
  );

  Expression<T> cropsRefs<T extends Object>(
    Expression<T> Function($$CropsTableAnnotationComposer a) f,
  ) {
    final $$CropsTableAnnotationComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.id,
      referencedTable: $db.crops,
      getReferencedColumn: (t) => t.fieldId,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$CropsTableAnnotationComposer(
            $db: $db,
            $table: $db.crops,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return f(composer);
  }

  Expression<T> waterLogRefs<T extends Object>(
    Expression<T> Function($$WaterLogTableAnnotationComposer a) f,
  ) {
    final $$WaterLogTableAnnotationComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.id,
      referencedTable: $db.waterLog,
      getReferencedColumn: (t) => t.fieldId,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$WaterLogTableAnnotationComposer(
            $db: $db,
            $table: $db.waterLog,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return f(composer);
  }
}

class $$FieldsTableTableManager
    extends
        RootTableManager<
          _$FarmDatabase,
          $FieldsTable,
          Field,
          $$FieldsTableFilterComposer,
          $$FieldsTableOrderingComposer,
          $$FieldsTableAnnotationComposer,
          $$FieldsTableCreateCompanionBuilder,
          $$FieldsTableUpdateCompanionBuilder,
          (Field, $$FieldsTableReferences),
          Field,
          PrefetchHooks Function({bool cropsRefs, bool waterLogRefs})
        > {
  $$FieldsTableTableManager(_$FarmDatabase db, $FieldsTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$FieldsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$FieldsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$FieldsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> name = const Value.absent(),
                Value<double> areaHectares = const Value.absent(),
                Value<DateTime?> plantingDate = const Value.absent(),
              }) => FieldsCompanion(
                id: id,
                name: name,
                areaHectares: areaHectares,
                plantingDate: plantingDate,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String name,
                Value<double> areaHectares = const Value.absent(),
                Value<DateTime?> plantingDate = const Value.absent(),
              }) => FieldsCompanion.insert(
                id: id,
                name: name,
                areaHectares: areaHectares,
                plantingDate: plantingDate,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$FieldsTable, Field>(table),
                  $$FieldsTableReferences(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: ({cropsRefs = false, waterLogRefs = false}) {
            return PrefetchHooks(
              db: db,
              explicitlyWatchedTables: [
                if (cropsRefs) db.crops,
                if (waterLogRefs) db.waterLog,
              ],
              addJoins: null,
              getPrefetchedDataCallback: (items) async {
                return [
                  if (cropsRefs)
                    await $_getPrefetchedData<Field, $FieldsTable, Crop>(
                      currentTable: table,
                      referencedTable: $$FieldsTableReferences._cropsRefsTable(
                        db,
                      ),
                      managerFromTypedResult: (p0) =>
                          $$FieldsTableReferences(db, table, p0).cropsRefs,
                      referencedItemsForCurrentItem: (item, referencedItems) =>
                          referencedItems.where((e) => e.fieldId == item.id),
                      typedResults: items,
                    ),
                  if (waterLogRefs)
                    await $_getPrefetchedData<
                      Field,
                      $FieldsTable,
                      WaterLogData
                    >(
                      currentTable: table,
                      referencedTable: $$FieldsTableReferences
                          ._waterLogRefsTable(db),
                      managerFromTypedResult: (p0) =>
                          $$FieldsTableReferences(db, table, p0).waterLogRefs,
                      referencedItemsForCurrentItem: (item, referencedItems) =>
                          referencedItems.where((e) => e.fieldId == item.id),
                      typedResults: items,
                    ),
                ];
              },
            );
          },
        ),
      );
}

typedef $$FieldsTableProcessedTableManager =
    ProcessedTableManager<
      _$FarmDatabase,
      $FieldsTable,
      Field,
      $$FieldsTableFilterComposer,
      $$FieldsTableOrderingComposer,
      $$FieldsTableAnnotationComposer,
      $$FieldsTableCreateCompanionBuilder,
      $$FieldsTableUpdateCompanionBuilder,
      (Field, $$FieldsTableReferences),
      Field,
      PrefetchHooks Function({bool cropsRefs, bool waterLogRefs})
    >;
typedef $$CropsTableCreateCompanionBuilder = CropsCompanion Function({
  Value<int> id,
  required int fieldId,
  required String name,
  Value<int> growthPercent,
  Value<DateTime?> plantingDate,
});
typedef $$CropsTableUpdateCompanionBuilder = CropsCompanion Function({
  Value<int> id,
  Value<int> fieldId,
  Value<String> name,
  Value<int> growthPercent,
  Value<DateTime?> plantingDate,
});

final class $$CropsTableReferences
    extends BaseReferences<_$FarmDatabase, $CropsTable, Crop> {
  $$CropsTableReferences(super.$_db, super.$_table, super.$_typedResult);

  static $FieldsTable _fieldIdTable(_$FarmDatabase db) =>
      db.fields.createAlias('crops__field_id__fields__id');

  $$FieldsTableProcessedTableManager get fieldId {
    final $_column = $_itemColumn<int>('field_id')!;

    final manager = $$FieldsTableTableManager(
      $_db,
      $_db.fields,
    ).filter((f) => f.id.sqlEquals($_column));
    final item = $_typedResult.readTableOrNull(_fieldIdTable($_db));
    if (item == null) return manager;
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: [item]),
    );
  }
}

class $$CropsTableFilterComposer extends Composer<_$FarmDatabase, $CropsTable> {
  $$CropsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get growthPercent => $composableBuilder(
    column: $table.growthPercent,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get plantingDate => $composableBuilder(
    column: $table.plantingDate,
    builder: (column) => ColumnFilters(column),
  );

  $$FieldsTableFilterComposer get fieldId {
    final $$FieldsTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fieldId,
      referencedTable: $db.fields,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FieldsTableFilterComposer(
            $db: $db,
            $table: $db.fields,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$CropsTableOrderingComposer
    extends Composer<_$FarmDatabase, $CropsTable> {
  $$CropsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get growthPercent => $composableBuilder(
    column: $table.growthPercent,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get plantingDate => $composableBuilder(
    column: $table.plantingDate,
    builder: (column) => ColumnOrderings(column),
  );

  $$FieldsTableOrderingComposer get fieldId {
    final $$FieldsTableOrderingComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fieldId,
      referencedTable: $db.fields,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FieldsTableOrderingComposer(
            $db: $db,
            $table: $db.fields,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$CropsTableAnnotationComposer
    extends Composer<_$FarmDatabase, $CropsTable> {
  $$CropsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get name =>
      $composableBuilder(column: $table.name, builder: (column) => column);

  GeneratedColumn<int> get growthPercent => $composableBuilder(
    column: $table.growthPercent,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get plantingDate => $composableBuilder(
    column: $table.plantingDate,
    builder: (column) => column,
  );

  $$FieldsTableAnnotationComposer get fieldId {
    final $$FieldsTableAnnotationComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fieldId,
      referencedTable: $db.fields,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FieldsTableAnnotationComposer(
            $db: $db,
            $table: $db.fields,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$CropsTableTableManager
    extends
        RootTableManager<
          _$FarmDatabase,
          $CropsTable,
          Crop,
          $$CropsTableFilterComposer,
          $$CropsTableOrderingComposer,
          $$CropsTableAnnotationComposer,
          $$CropsTableCreateCompanionBuilder,
          $$CropsTableUpdateCompanionBuilder,
          (Crop, $$CropsTableReferences),
          Crop,
          PrefetchHooks Function({bool fieldId})
        > {
  $$CropsTableTableManager(_$FarmDatabase db, $CropsTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$CropsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$CropsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$CropsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<int> fieldId = const Value.absent(),
                Value<String> name = const Value.absent(),
                Value<int> growthPercent = const Value.absent(),
                Value<DateTime?> plantingDate = const Value.absent(),
              }) => CropsCompanion(
                id: id,
                fieldId: fieldId,
                name: name,
                growthPercent: growthPercent,
                plantingDate: plantingDate,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required int fieldId,
                required String name,
                Value<int> growthPercent = const Value.absent(),
                Value<DateTime?> plantingDate = const Value.absent(),
              }) => CropsCompanion.insert(
                id: id,
                fieldId: fieldId,
                name: name,
                growthPercent: growthPercent,
                plantingDate: plantingDate,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$CropsTable, Crop>(table),
                  $$CropsTableReferences(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: ({fieldId = false}) {
            return PrefetchHooks(
              db: db,
              explicitlyWatchedTables: [],
              addJoins:
                  <
                    T extends TableManagerState<
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic
                    >
                  >(state) {
                    if (fieldId) {
                      state = state.withJoin(
                        currentTable: table,
                        currentColumn: table.fieldId,
                        referencedTable: $$CropsTableReferences._fieldIdTable(
                          db,
                        ),
                        referencedColumn: $$CropsTableReferences
                            ._fieldIdTable(db)
                            .id,
                      ) as T;
                    }

                    return state;
                  },
              getPrefetchedDataCallback: (items) async {
                return [];
              },
            );
          },
        ),
      );
}

typedef $$CropsTableProcessedTableManager =
    ProcessedTableManager<
      _$FarmDatabase,
      $CropsTable,
      Crop,
      $$CropsTableFilterComposer,
      $$CropsTableOrderingComposer,
      $$CropsTableAnnotationComposer,
      $$CropsTableCreateCompanionBuilder,
      $$CropsTableUpdateCompanionBuilder,
      (Crop, $$CropsTableReferences),
      Crop,
      PrefetchHooks Function({bool fieldId})
    >;
typedef $$AnimalsTableCreateCompanionBuilder = AnimalsCompanion Function({
  Value<int> id,
  required String name,
  required String category,
  required String breed,
  required String tag,
  required DateTime birthDate,
  required int healthPercent,
});
typedef $$AnimalsTableUpdateCompanionBuilder = AnimalsCompanion Function({
  Value<int> id,
  Value<String> name,
  Value<String> category,
  Value<String> breed,
  Value<String> tag,
  Value<DateTime> birthDate,
  Value<int> healthPercent,
});

class $$AnimalsTableFilterComposer
    extends Composer<_$FarmDatabase, $AnimalsTable> {
  $$AnimalsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get category => $composableBuilder(
    column: $table.category,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get breed => $composableBuilder(
    column: $table.breed,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get tag => $composableBuilder(
    column: $table.tag,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get birthDate => $composableBuilder(
    column: $table.birthDate,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get healthPercent => $composableBuilder(
    column: $table.healthPercent,
    builder: (column) => ColumnFilters(column),
  );
}

class $$AnimalsTableOrderingComposer
    extends Composer<_$FarmDatabase, $AnimalsTable> {
  $$AnimalsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get category => $composableBuilder(
    column: $table.category,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get breed => $composableBuilder(
    column: $table.breed,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get tag => $composableBuilder(
    column: $table.tag,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get birthDate => $composableBuilder(
    column: $table.birthDate,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get healthPercent => $composableBuilder(
    column: $table.healthPercent,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$AnimalsTableAnnotationComposer
    extends Composer<_$FarmDatabase, $AnimalsTable> {
  $$AnimalsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get name =>
      $composableBuilder(column: $table.name, builder: (column) => column);

  GeneratedColumn<String> get category =>
      $composableBuilder(column: $table.category, builder: (column) => column);

  GeneratedColumn<String> get breed =>
      $composableBuilder(column: $table.breed, builder: (column) => column);

  GeneratedColumn<String> get tag =>
      $composableBuilder(column: $table.tag, builder: (column) => column);

  GeneratedColumn<DateTime> get birthDate =>
      $composableBuilder(column: $table.birthDate, builder: (column) => column);

  GeneratedColumn<int> get healthPercent => $composableBuilder(
    column: $table.healthPercent,
    builder: (column) => column,
  );
}

class $$AnimalsTableTableManager
    extends
        RootTableManager<
          _$FarmDatabase,
          $AnimalsTable,
          Animal,
          $$AnimalsTableFilterComposer,
          $$AnimalsTableOrderingComposer,
          $$AnimalsTableAnnotationComposer,
          $$AnimalsTableCreateCompanionBuilder,
          $$AnimalsTableUpdateCompanionBuilder,
          (Animal, BaseReferences<_$FarmDatabase, $AnimalsTable, Animal>),
          Animal,
          PrefetchHooks Function()
        > {
  $$AnimalsTableTableManager(_$FarmDatabase db, $AnimalsTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$AnimalsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$AnimalsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$AnimalsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> name = const Value.absent(),
                Value<String> category = const Value.absent(),
                Value<String> breed = const Value.absent(),
                Value<String> tag = const Value.absent(),
                Value<DateTime> birthDate = const Value.absent(),
                Value<int> healthPercent = const Value.absent(),
              }) => AnimalsCompanion(
                id: id,
                name: name,
                category: category,
                breed: breed,
                tag: tag,
                birthDate: birthDate,
                healthPercent: healthPercent,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String name,
                required String category,
                required String breed,
                required String tag,
                required DateTime birthDate,
                required int healthPercent,
              }) => AnimalsCompanion.insert(
                id: id,
                name: name,
                category: category,
                breed: breed,
                tag: tag,
                birthDate: birthDate,
                healthPercent: healthPercent,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$AnimalsTable, Animal>(table),
                  BaseReferences<_$FarmDatabase, $AnimalsTable, Animal>(
                    db,
                    table,
                    e,
                  ),
                ),
              )
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$AnimalsTableProcessedTableManager =
    ProcessedTableManager<
      _$FarmDatabase,
      $AnimalsTable,
      Animal,
      $$AnimalsTableFilterComposer,
      $$AnimalsTableOrderingComposer,
      $$AnimalsTableAnnotationComposer,
      $$AnimalsTableCreateCompanionBuilder,
      $$AnimalsTableUpdateCompanionBuilder,
      (Animal, BaseReferences<_$FarmDatabase, $AnimalsTable, Animal>),
      Animal,
      PrefetchHooks Function()
    >;
typedef $$TasksTableCreateCompanionBuilder = TasksCompanion Function({
  Value<int> id,
  required String title,
  Value<bool> isCompleted,
  Value<DateTime?> dueDate,
});
typedef $$TasksTableUpdateCompanionBuilder = TasksCompanion Function({
  Value<int> id,
  Value<String> title,
  Value<bool> isCompleted,
  Value<DateTime?> dueDate,
});

class $$TasksTableFilterComposer extends Composer<_$FarmDatabase, $TasksTable> {
  $$TasksTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get title => $composableBuilder(
    column: $table.title,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get isCompleted => $composableBuilder(
    column: $table.isCompleted,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get dueDate => $composableBuilder(
    column: $table.dueDate,
    builder: (column) => ColumnFilters(column),
  );
}

class $$TasksTableOrderingComposer
    extends Composer<_$FarmDatabase, $TasksTable> {
  $$TasksTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get title => $composableBuilder(
    column: $table.title,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get isCompleted => $composableBuilder(
    column: $table.isCompleted,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get dueDate => $composableBuilder(
    column: $table.dueDate,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$TasksTableAnnotationComposer
    extends Composer<_$FarmDatabase, $TasksTable> {
  $$TasksTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get title =>
      $composableBuilder(column: $table.title, builder: (column) => column);

  GeneratedColumn<bool> get isCompleted => $composableBuilder(
    column: $table.isCompleted,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get dueDate =>
      $composableBuilder(column: $table.dueDate, builder: (column) => column);
}

class $$TasksTableTableManager
    extends
        RootTableManager<
          _$FarmDatabase,
          $TasksTable,
          Task,
          $$TasksTableFilterComposer,
          $$TasksTableOrderingComposer,
          $$TasksTableAnnotationComposer,
          $$TasksTableCreateCompanionBuilder,
          $$TasksTableUpdateCompanionBuilder,
          (Task, BaseReferences<_$FarmDatabase, $TasksTable, Task>),
          Task,
          PrefetchHooks Function()
        > {
  $$TasksTableTableManager(_$FarmDatabase db, $TasksTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$TasksTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$TasksTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$TasksTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> title = const Value.absent(),
                Value<bool> isCompleted = const Value.absent(),
                Value<DateTime?> dueDate = const Value.absent(),
              }) => TasksCompanion(
                id: id,
                title: title,
                isCompleted: isCompleted,
                dueDate: dueDate,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String title,
                Value<bool> isCompleted = const Value.absent(),
                Value<DateTime?> dueDate = const Value.absent(),
              }) => TasksCompanion.insert(
                id: id,
                title: title,
                isCompleted: isCompleted,
                dueDate: dueDate,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$TasksTable, Task>(table),
                  BaseReferences<_$FarmDatabase, $TasksTable, Task>(
                    db,
                    table,
                    e,
                  ),
                ),
              )
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$TasksTableProcessedTableManager =
    ProcessedTableManager<
      _$FarmDatabase,
      $TasksTable,
      Task,
      $$TasksTableFilterComposer,
      $$TasksTableOrderingComposer,
      $$TasksTableAnnotationComposer,
      $$TasksTableCreateCompanionBuilder,
      $$TasksTableUpdateCompanionBuilder,
      (Task, BaseReferences<_$FarmDatabase, $TasksTable, Task>),
      Task,
      PrefetchHooks Function()
    >;
typedef $$HarvestPlansTableCreateCompanionBuilder =
    HarvestPlansCompanion Function({
      Value<int> id,
      required String fieldName,
      required String cropName,
      required DateTime expectedDate,
      required double expectedYieldKg,
      Value<bool> isHarvested,
      Value<double?> actualYieldKg,
    });
typedef $$HarvestPlansTableUpdateCompanionBuilder =
    HarvestPlansCompanion Function({
      Value<int> id,
      Value<String> fieldName,
      Value<String> cropName,
      Value<DateTime> expectedDate,
      Value<double> expectedYieldKg,
      Value<bool> isHarvested,
      Value<double?> actualYieldKg,
    });

class $$HarvestPlansTableFilterComposer
    extends Composer<_$FarmDatabase, $HarvestPlansTable> {
  $$HarvestPlansTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get fieldName => $composableBuilder(
    column: $table.fieldName,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get cropName => $composableBuilder(
    column: $table.cropName,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get expectedDate => $composableBuilder(
    column: $table.expectedDate,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get expectedYieldKg => $composableBuilder(
    column: $table.expectedYieldKg,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get isHarvested => $composableBuilder(
    column: $table.isHarvested,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get actualYieldKg => $composableBuilder(
    column: $table.actualYieldKg,
    builder: (column) => ColumnFilters(column),
  );
}

class $$HarvestPlansTableOrderingComposer
    extends Composer<_$FarmDatabase, $HarvestPlansTable> {
  $$HarvestPlansTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get fieldName => $composableBuilder(
    column: $table.fieldName,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get cropName => $composableBuilder(
    column: $table.cropName,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get expectedDate => $composableBuilder(
    column: $table.expectedDate,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get expectedYieldKg => $composableBuilder(
    column: $table.expectedYieldKg,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get isHarvested => $composableBuilder(
    column: $table.isHarvested,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get actualYieldKg => $composableBuilder(
    column: $table.actualYieldKg,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$HarvestPlansTableAnnotationComposer
    extends Composer<_$FarmDatabase, $HarvestPlansTable> {
  $$HarvestPlansTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get fieldName =>
      $composableBuilder(column: $table.fieldName, builder: (column) => column);

  GeneratedColumn<String> get cropName =>
      $composableBuilder(column: $table.cropName, builder: (column) => column);

  GeneratedColumn<DateTime> get expectedDate => $composableBuilder(
    column: $table.expectedDate,
    builder: (column) => column,
  );

  GeneratedColumn<double> get expectedYieldKg => $composableBuilder(
    column: $table.expectedYieldKg,
    builder: (column) => column,
  );

  GeneratedColumn<bool> get isHarvested => $composableBuilder(
    column: $table.isHarvested,
    builder: (column) => column,
  );

  GeneratedColumn<double> get actualYieldKg => $composableBuilder(
    column: $table.actualYieldKg,
    builder: (column) => column,
  );
}

class $$HarvestPlansTableTableManager
    extends
        RootTableManager<
          _$FarmDatabase,
          $HarvestPlansTable,
          HarvestPlan,
          $$HarvestPlansTableFilterComposer,
          $$HarvestPlansTableOrderingComposer,
          $$HarvestPlansTableAnnotationComposer,
          $$HarvestPlansTableCreateCompanionBuilder,
          $$HarvestPlansTableUpdateCompanionBuilder,
          (
            HarvestPlan,
            BaseReferences<_$FarmDatabase, $HarvestPlansTable, HarvestPlan>,
          ),
          HarvestPlan,
          PrefetchHooks Function()
        > {
  $$HarvestPlansTableTableManager(_$FarmDatabase db, $HarvestPlansTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$HarvestPlansTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$HarvestPlansTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$HarvestPlansTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> fieldName = const Value.absent(),
                Value<String> cropName = const Value.absent(),
                Value<DateTime> expectedDate = const Value.absent(),
                Value<double> expectedYieldKg = const Value.absent(),
                Value<bool> isHarvested = const Value.absent(),
                Value<double?> actualYieldKg = const Value.absent(),
              }) => HarvestPlansCompanion(
                id: id,
                fieldName: fieldName,
                cropName: cropName,
                expectedDate: expectedDate,
                expectedYieldKg: expectedYieldKg,
                isHarvested: isHarvested,
                actualYieldKg: actualYieldKg,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String fieldName,
                required String cropName,
                required DateTime expectedDate,
                required double expectedYieldKg,
                Value<bool> isHarvested = const Value.absent(),
                Value<double?> actualYieldKg = const Value.absent(),
              }) => HarvestPlansCompanion.insert(
                id: id,
                fieldName: fieldName,
                cropName: cropName,
                expectedDate: expectedDate,
                expectedYieldKg: expectedYieldKg,
                isHarvested: isHarvested,
                actualYieldKg: actualYieldKg,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$HarvestPlansTable, HarvestPlan>(table),
                  BaseReferences<
                    _$FarmDatabase,
                    $HarvestPlansTable,
                    HarvestPlan
                  >(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$HarvestPlansTableProcessedTableManager =
    ProcessedTableManager<
      _$FarmDatabase,
      $HarvestPlansTable,
      HarvestPlan,
      $$HarvestPlansTableFilterComposer,
      $$HarvestPlansTableOrderingComposer,
      $$HarvestPlansTableAnnotationComposer,
      $$HarvestPlansTableCreateCompanionBuilder,
      $$HarvestPlansTableUpdateCompanionBuilder,
      (
        HarvestPlan,
        BaseReferences<_$FarmDatabase, $HarvestPlansTable, HarvestPlan>,
      ),
      HarvestPlan,
      PrefetchHooks Function()
    >;
typedef $$WaterLogTableCreateCompanionBuilder = WaterLogCompanion Function({
  Value<int> id,
  required DateTime recordedAt,
  required double liters,
  Value<bool> isUsage,
  Value<int?> fieldId,
});
typedef $$WaterLogTableUpdateCompanionBuilder = WaterLogCompanion Function({
  Value<int> id,
  Value<DateTime> recordedAt,
  Value<double> liters,
  Value<bool> isUsage,
  Value<int?> fieldId,
});

final class $$WaterLogTableReferences
    extends BaseReferences<_$FarmDatabase, $WaterLogTable, WaterLogData> {
  $$WaterLogTableReferences(super.$_db, super.$_table, super.$_typedResult);

  static $FieldsTable _fieldIdTable(_$FarmDatabase db) =>
      db.fields.createAlias('water_log__field_id__fields__id');

  $$FieldsTableProcessedTableManager? get fieldId {
    final $_column = $_itemColumn<int>('field_id');
    if ($_column == null) return null;
    final manager = $$FieldsTableTableManager(
      $_db,
      $_db.fields,
    ).filter((f) => f.id.sqlEquals($_column));
    final item = $_typedResult.readTableOrNull(_fieldIdTable($_db));
    if (item == null) return manager;
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: [item]),
    );
  }
}

class $$WaterLogTableFilterComposer
    extends Composer<_$FarmDatabase, $WaterLogTable> {
  $$WaterLogTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get recordedAt => $composableBuilder(
    column: $table.recordedAt,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get liters => $composableBuilder(
    column: $table.liters,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get isUsage => $composableBuilder(
    column: $table.isUsage,
    builder: (column) => ColumnFilters(column),
  );

  $$FieldsTableFilterComposer get fieldId {
    final $$FieldsTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fieldId,
      referencedTable: $db.fields,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FieldsTableFilterComposer(
            $db: $db,
            $table: $db.fields,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$WaterLogTableOrderingComposer
    extends Composer<_$FarmDatabase, $WaterLogTable> {
  $$WaterLogTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get recordedAt => $composableBuilder(
    column: $table.recordedAt,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get liters => $composableBuilder(
    column: $table.liters,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get isUsage => $composableBuilder(
    column: $table.isUsage,
    builder: (column) => ColumnOrderings(column),
  );

  $$FieldsTableOrderingComposer get fieldId {
    final $$FieldsTableOrderingComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fieldId,
      referencedTable: $db.fields,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FieldsTableOrderingComposer(
            $db: $db,
            $table: $db.fields,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$WaterLogTableAnnotationComposer
    extends Composer<_$FarmDatabase, $WaterLogTable> {
  $$WaterLogTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<DateTime> get recordedAt => $composableBuilder(
    column: $table.recordedAt,
    builder: (column) => column,
  );

  GeneratedColumn<double> get liters =>
      $composableBuilder(column: $table.liters, builder: (column) => column);

  GeneratedColumn<bool> get isUsage =>
      $composableBuilder(column: $table.isUsage, builder: (column) => column);

  $$FieldsTableAnnotationComposer get fieldId {
    final $$FieldsTableAnnotationComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fieldId,
      referencedTable: $db.fields,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FieldsTableAnnotationComposer(
            $db: $db,
            $table: $db.fields,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$WaterLogTableTableManager
    extends
        RootTableManager<
          _$FarmDatabase,
          $WaterLogTable,
          WaterLogData,
          $$WaterLogTableFilterComposer,
          $$WaterLogTableOrderingComposer,
          $$WaterLogTableAnnotationComposer,
          $$WaterLogTableCreateCompanionBuilder,
          $$WaterLogTableUpdateCompanionBuilder,
          (WaterLogData, $$WaterLogTableReferences),
          WaterLogData,
          PrefetchHooks Function({bool fieldId})
        > {
  $$WaterLogTableTableManager(_$FarmDatabase db, $WaterLogTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$WaterLogTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$WaterLogTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$WaterLogTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<DateTime> recordedAt = const Value.absent(),
                Value<double> liters = const Value.absent(),
                Value<bool> isUsage = const Value.absent(),
                Value<int?> fieldId = const Value.absent(),
              }) => WaterLogCompanion(
                id: id,
                recordedAt: recordedAt,
                liters: liters,
                isUsage: isUsage,
                fieldId: fieldId,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required DateTime recordedAt,
                required double liters,
                Value<bool> isUsage = const Value.absent(),
                Value<int?> fieldId = const Value.absent(),
              }) => WaterLogCompanion.insert(
                id: id,
                recordedAt: recordedAt,
                liters: liters,
                isUsage: isUsage,
                fieldId: fieldId,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$WaterLogTable, WaterLogData>(table),
                  $$WaterLogTableReferences(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: ({fieldId = false}) {
            return PrefetchHooks(
              db: db,
              explicitlyWatchedTables: [],
              addJoins:
                  <
                    T extends TableManagerState<
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic
                    >
                  >(state) {
                    if (fieldId) {
                      state = state.withJoin(
                        currentTable: table,
                        currentColumn: table.fieldId,
                        referencedTable: $$WaterLogTableReferences
                            ._fieldIdTable(db),
                        referencedColumn: $$WaterLogTableReferences
                            ._fieldIdTable(db)
                            .id,
                      ) as T;
                    }

                    return state;
                  },
              getPrefetchedDataCallback: (items) async {
                return [];
              },
            );
          },
        ),
      );
}

typedef $$WaterLogTableProcessedTableManager =
    ProcessedTableManager<
      _$FarmDatabase,
      $WaterLogTable,
      WaterLogData,
      $$WaterLogTableFilterComposer,
      $$WaterLogTableOrderingComposer,
      $$WaterLogTableAnnotationComposer,
      $$WaterLogTableCreateCompanionBuilder,
      $$WaterLogTableUpdateCompanionBuilder,
      (WaterLogData, $$WaterLogTableReferences),
      WaterLogData,
      PrefetchHooks Function({bool fieldId})
    >;

class $FarmDatabaseManager {
  final _$FarmDatabase _db;
  $FarmDatabaseManager(this._db);
  $$FieldsTableTableManager get fields =>
      $$FieldsTableTableManager(_db, _db.fields);
  $$CropsTableTableManager get crops =>
      $$CropsTableTableManager(_db, _db.crops);
  $$AnimalsTableTableManager get animals =>
      $$AnimalsTableTableManager(_db, _db.animals);
  $$TasksTableTableManager get tasks =>
      $$TasksTableTableManager(_db, _db.tasks);
  $$HarvestPlansTableTableManager get harvestPlans =>
      $$HarvestPlansTableTableManager(_db, _db.harvestPlans);
  $$WaterLogTableTableManager get waterLog =>
      $$WaterLogTableTableManager(_db, _db.waterLog);
}
