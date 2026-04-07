## ADDED Requirements

### Requirement: Info panel displays element identification
The system SHALL display the current element's name, chemical symbol, and atomic number in the info panel. These values SHALL update immediately when the proton count changes.

#### Scenario: Displays Oxygen info
- **WHEN** the atom has 8 protons
- **THEN** the info panel shows "Oxygen", "O", and "8"

### Requirement: Info panel displays mass number
The system SHALL display the mass number (protons + neutrons) in the info panel.

#### Scenario: Mass number calculation
- **WHEN** the atom has 6 protons and 6 neutrons
- **THEN** the info panel shows mass number 12

### Requirement: Info panel displays electron configuration
The system SHALL display the electron shell distribution string (e.g., "2, 8, 1") in the info panel, updated on every electron count change.

#### Scenario: Configuration for Sodium
- **WHEN** the atom has 11 electrons
- **THEN** the info panel shows electron configuration "2, 8, 1"

### Requirement: Info panel displays ionic charge and type
The system SHALL display the ionic charge value and label. Charge = protons − electrons. The label SHALL be "Neutral" when charge is 0, "Cation (Z+)" when positive, "Anion (Z−)" when negative.

#### Scenario: Neutral atom charge display
- **WHEN** protons == electrons
- **THEN** charge display shows "0 — Neutral"

#### Scenario: Cation charge display
- **WHEN** protons > electrons by 2
- **THEN** charge display shows "+2 — Cation"

#### Scenario: Anion charge display
- **WHEN** electrons > protons by 1
- **THEN** charge display shows "−1 — Anion"
