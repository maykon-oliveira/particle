## ADDED Requirements

### Requirement: Atom visual node is reusable in molecule context
The system SHALL reuse or adapt the existing atom visual representation so an atom can be rendered as a positioned node in molecule workspace.

#### Scenario: Render atom node with type styling
- **WHEN** a molecule atom of type `N` is rendered
- **THEN** the node displays consistent atom styling and type identification

### Requirement: Atom node supports interactive drag behavior
The system SHALL expose pointer interaction hooks so atom nodes can participate in drag-and-drop updates.

#### Scenario: Pointer interaction events emitted
- **WHEN** pointer drag starts and moves on an atom node
- **THEN** drag callbacks receive atom id and updated pointer positions
