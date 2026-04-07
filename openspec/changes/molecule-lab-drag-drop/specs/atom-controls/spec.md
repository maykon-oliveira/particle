## ADDED Requirements

### Requirement: Controls can create atoms for molecule workspace
The system SHALL provide controls for adding new atoms into the molecule workspace and selecting atom type among H, O, N, C.

#### Scenario: Add selected atom type
- **WHEN** the user selects type `O` and clicks "Adicionar átomo"
- **THEN** a new oxygen atom node is created in molecule state

### Requirement: Existing controls remain functional
The system SHALL preserve existing control actions for atomic simulation while adding molecule controls.

#### Scenario: Existing atom controls still work
- **WHEN** the user triggers existing proton/electron/decay actions
- **THEN** those actions continue to operate as before
