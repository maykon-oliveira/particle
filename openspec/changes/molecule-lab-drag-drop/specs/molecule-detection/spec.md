## ADDED Requirements

### Requirement: Molecules are detected from connected atoms
The system SHALL analyze the current atom-bond graph and derive connected components representing molecule groups.

#### Scenario: Detect one connected group
- **WHEN** three atoms are connected by bonds in one cluster
- **THEN** the detector returns one molecule component containing those three atoms

### Requirement: Known formulas are recognized
The system SHALL recognize at minimum these formulas and names: `H2O` (Água), `CO2` (Dióxido de carbono), `NH3` (Amônia), `CH4` (Metano).

#### Scenario: Recognize water
- **WHEN** the component formula resolves to H2O
- **THEN** the molecule metadata reports formula `H2O` and name `Água`

#### Scenario: Recognize methane
- **WHEN** the component formula resolves to CH4
- **THEN** the molecule metadata reports formula `CH4` and name `Metano`

### Requirement: Unknown combinations remain explicit
The system SHALL return a deterministic formula string even when the molecule is not in the known list.

#### Scenario: Unknown molecule label
- **WHEN** a component formula does not match known molecules
- **THEN** the UI shows the normalized formula and an "Unknown" molecule name
