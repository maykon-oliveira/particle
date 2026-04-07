## ADDED Requirements

### Requirement: Molecule state maintains atoms and bonds collections
The system SHALL keep molecule workspace state in structures equivalent to:
- `atoms: [{ id, type, x, y, bonds }]`
- `bonds: [{ id, atom1Id, atom2Id }]`

#### Scenario: State shape after atom creation
- **WHEN** an atom is added
- **THEN** a new atom object with required fields is inserted into `atoms`

#### Scenario: State shape after bond creation
- **WHEN** a bond is created
- **THEN** a new bond object with required fields is inserted into `bonds`

### Requirement: Valence rules are enforced
The system SHALL enforce simplified valence limits per atom type: H=1, O=2, N=3, C=4.

#### Scenario: Hydrogen max bond
- **WHEN** hydrogen already has one bond and another bond candidate appears
- **THEN** the second bond is rejected

#### Scenario: Carbon accepts up to four bonds
- **WHEN** carbon has fewer than four bonds and valid nearby atoms
- **THEN** bonding can continue until four bonds are reached
