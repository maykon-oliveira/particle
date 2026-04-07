## ADDED Requirements

### Requirement: Element is identified automatically from proton count
The system SHALL map the current proton count to the corresponding element for elements 1–20 (Hydrogen to Calcium). The lookup SHALL return the element name, chemical symbol, and atomic number.

#### Scenario: Proton count matches known element
- **WHEN** the atom has 8 protons
- **THEN** the identified element is Oxygen (O, Z=8)

#### Scenario: Proton count maps to Calcium
- **WHEN** the atom has 20 protons
- **THEN** the identified element is Calcium (Ca, Z=20)

### Requirement: Unknown element is indicated for proton counts outside 1–20
The system SHALL display a fallback label (e.g., "Unknown element") when the proton count is 0 or exceeds 20.

#### Scenario: Zero protons
- **WHEN** the atom has 0 protons
- **THEN** the displayed element name is a placeholder such as "Unknown" or "—"

#### Scenario: Proton count above 20
- **WHEN** the atom has 21 protons
- **THEN** the displayed element name indicates an unknown or unsupported element

### Requirement: Element data covers all 20 standard elements
The system SHALL include a complete static dataset for elements 1 to 20 with at minimum: atomic number, name, and symbol.

#### Scenario: All 20 elements present
- **WHEN** the periodic table data module is loaded
- **THEN** querying proton counts 1 through 20 each returns a distinct element record with name and symbol
