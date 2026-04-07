## ADDED Requirements

### Requirement: Info panel displays current molecule section
The system SHALL add a "Molécula atual" section to the existing info panel, showing detected molecule formula and name.

#### Scenario: Show detected molecule
- **WHEN** a recognized molecule is present in workspace
- **THEN** the info panel shows its formula and localized molecule name

#### Scenario: Show empty state
- **WHEN** no molecule is currently recognized
- **THEN** the info panel shows a clear empty/unknown state
