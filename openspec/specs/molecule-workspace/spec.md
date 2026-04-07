## ADDED Requirements

### Requirement: Molecule workspace supports multiple draggable atoms
The system SHALL provide a molecule workspace where multiple atoms can be created and moved independently. Each atom SHALL have at minimum: `id`, `type`, `x`, `y`, and `bonds` metadata.

#### Scenario: Add multiple atoms
- **WHEN** the user clicks "Adicionar átomo" three times
- **THEN** three independent atom nodes are rendered in the workspace with distinct ids and positions

#### Scenario: Drag atom with pointer events
- **WHEN** the user presses and drags one atom
- **THEN** only that atom position updates continuously following pointer movement

### Requirement: Workspace provides visual proximity feedback
The system SHALL highlight atoms that are within bonding candidate range during drag interactions.

#### Scenario: Highlight near threshold
- **WHEN** two atoms move within the bond candidate distance
- **THEN** the UI shows a clear visual highlight on candidate atoms

### Requirement: Existing atomic simulator remains available
The system SHALL preserve previously implemented atom-level features while adding molecule workspace functionality.

#### Scenario: No regression in atomic mode
- **WHEN** the user interacts with atom controls and atom visualization
- **THEN** existing behaviors (electron shells, decay, ion charge, element id) continue to work