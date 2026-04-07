## ADDED Requirements

### Requirement: Electrons are distributed across shells following Bohr model capacity rules
The system SHALL distribute electrons across shells K, L, M, N with maximum capacities 2, 8, 18, 32 respectively. Shells SHALL be filled in order from K outward. No shell SHALL exceed its capacity.

#### Scenario: Hydrogen distribution
- **WHEN** the atom has 1 electron
- **THEN** the distribution is K:1

#### Scenario: Sodium distribution
- **WHEN** the atom has 11 electrons
- **THEN** the distribution is K:2, L:8, M:1

#### Scenario: Calcium distribution
- **WHEN** the atom has 20 electrons
- **THEN** the distribution is K:2, L:8, M:8, N:2

### Requirement: Electron distribution is recalculated on every state change
The system SHALL recompute the shell distribution every time the electron count changes. The distribution function SHALL be a pure function of the electron count.

#### Scenario: Distribution updates after adding an electron
- **WHEN** an electron is added to a Hydrogen atom (1 → 2 electrons)
- **THEN** the distribution updates from K:1 to K:2

#### Scenario: Distribution updates after removing an electron
- **WHEN** an electron is removed from a Helium atom (2 → 1 electron)
- **THEN** the distribution updates from K:2 to K:1

### Requirement: Distribution string is formatted for display
The system SHALL produce a human-readable electron configuration string (e.g., "2,8,1") from the shell distribution for use in the info panel.

#### Scenario: Format for Sodium
- **WHEN** the atom has 11 electrons
- **THEN** the formatted string is "2, 8, 1"
