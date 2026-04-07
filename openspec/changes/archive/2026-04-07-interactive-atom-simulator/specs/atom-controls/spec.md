## ADDED Requirements

### Requirement: User can add a proton
The system SHALL provide a button that, when clicked, increments the proton count by 1 and simultaneously increments the electron count by 1 to keep the atom neutral.

#### Scenario: Add proton to Hydrogen
- **WHEN** the atom is Hydrogen (1p, 1e) and user clicks "Add Proton"
- **THEN** proton count becomes 2, electron count becomes 2, element updates to Helium

#### Scenario: Add proton button is disabled at maximum
- **WHEN** the proton count is 20 (Calcium)
- **THEN** the "Add Proton" button is disabled

### Requirement: User can add a neutron
The system SHALL provide a button that increments the neutron count by 1.

#### Scenario: Add neutron
- **WHEN** user clicks "Add Neutron"
- **THEN** neutron count increases by 1

### Requirement: User can add an electron
The system SHALL provide a button that increments the electron count by 1, creating an anion if electrons exceed protons.

#### Scenario: Add electron creates anion
- **WHEN** the atom is neutral (protons == electrons) and user clicks "Add Electron"
- **THEN** electron count increases by 1 and charge display shows a negative value

### Requirement: User can remove an electron
The system SHALL provide a button that decrements the electron count by 1, creating a cation if electrons drop below protons. The button SHALL be disabled when electron count is 0.

#### Scenario: Remove electron creates cation
- **WHEN** the atom is neutral and user clicks "Remove Electron"
- **THEN** electron count decreases by 1 and charge display shows a positive value

#### Scenario: Remove electron disabled at zero
- **WHEN** the electron count is 0
- **THEN** the "Remove Electron" button is disabled

### Requirement: User can reset the atom
The system SHALL provide a reset button that restores the atom to its initial state (1 proton, 0 neutrons, 1 electron — Hydrogen neutral).

#### Scenario: Reset clears custom state
- **WHEN** user has set the atom to Carbon (6p, 6n, 6e) and clicks "Reset"
- **THEN** the atom returns to 1 proton, 0 neutrons, 1 electron
