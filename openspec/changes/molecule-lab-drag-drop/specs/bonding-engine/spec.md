## ADDED Requirements

### Requirement: Bonds are created by proximity with valence constraints
The system SHALL create a bond between two atoms when their Euclidean distance is below a bond threshold, no bond already exists, and both atoms have available valence capacity.

#### Scenario: Bond created within threshold
- **WHEN** two compatible atoms are moved within the bond threshold
- **THEN** a bond entry is added with `atom1Id` and `atom2Id`

#### Scenario: Bond not created when valence full
- **WHEN** one candidate atom has reached its valence limit
- **THEN** no additional bond is created for that atom

### Requirement: Bonds are rendered visually
The system SHALL render each active bond as a line between the connected atoms on the workspace.

#### Scenario: Bond line appears
- **WHEN** a new bond is created
- **THEN** a line is displayed between the two atom positions

### Requirement: Bonds are removed on disconnection
The system SHALL remove an existing bond when connected atoms separate beyond the disconnect threshold.

#### Scenario: Bond removed after separation
- **WHEN** a bonded atom is dragged beyond disconnect threshold
- **THEN** the corresponding bond is removed from state and UI
