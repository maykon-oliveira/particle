## ADDED Requirements

### Requirement: Radioactive decay removes one proton and one neutron
The system SHALL implement a simplified radioactive decay action that decrements the proton count by 1 and the neutron count by 1. If the resulting electron count exceeds the new proton count, one electron SHALL also be removed to maintain approximate neutrality.

#### Scenario: Decay on Carbon
- **WHEN** the atom is Carbon (6p, 6n, 6e) and user triggers decay
- **THEN** the atom becomes Boron (5p, 5n, 5e)

#### Scenario: Decay adjusts electrons when they exceed new proton count
- **WHEN** the atom has 4 protons, 4 neutrons, 6 electrons and decay is triggered
- **THEN** protons become 3, neutrons become 3, and electrons are reduced to 3

### Requirement: Decay button is disabled when atom cannot decay
The system SHALL disable the decay button when proton count is 1 or neutron count is 0, to prevent an invalid atom state.

#### Scenario: Decay disabled for Hydrogen
- **WHEN** the atom has 1 proton
- **THEN** the decay button is disabled

#### Scenario: Decay disabled with zero neutrons
- **WHEN** the atom has 0 neutrons
- **THEN** the decay button is disabled

### Requirement: Decay triggers a brief visual feedback indicator
The system SHALL display a transient visual cue (e.g., a CSS flash animation or a temporary status message) when decay is triggered, to communicate the event to the user.

#### Scenario: Decay feedback appears and disappears
- **WHEN** user triggers decay
- **THEN** a visual indicator appears briefly (within 100 ms) and disappears automatically after approximately 1 second
