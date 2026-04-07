## Why

The current simulator already teaches atomic structure, but learners cannot explore how atoms interact to form molecules. Adding drag-and-drop molecule formation turns the app into a complete chemistry/physics lab experience and bridges the conceptual gap between isolated atoms and real compounds.

## What Changes

- Extend the existing React simulator (no rewrite) with an interactive molecule workspace
- Add draggable atoms with independent position/state using pointer events
- Add multi-atom creation flow with atom types H, O, C, N
- Add proximity-based bond creation/removal with valence constraints
- Add molecular graph state (`atoms[]`, `bonds[]`) and derived molecule detection
- Add known-molecule recognition (H2O, CO2, NH3, CH4)
- Add molecule details section to the existing info panel
- Preserve all existing atomic features: nucleus rendering, Bohr shells, element detection, ion charge, and decay

## Capabilities

### New Capabilities
- `molecule-workspace`: Multi-atom canvas with creation, drag-and-drop, and visual feedback while atoms approach each other
- `bonding-engine`: Distance-based bond lifecycle (create/remove), valence limits, and bond rendering between atoms
- `molecule-detection`: Connected-graph analysis that recognizes known molecules and outputs formula + molecule name
- `molecule-state-management`: Global molecule state model for `atoms[]` and `bonds[]`, with efficient updates during drag operations

### Modified Capabilities
- `info-panel`: Add "Current molecule" section showing detected formula and molecule name in real time
- `atom-controls`: Add controls for creating atoms (including atom type selection) without breaking existing atom controls
- `atom-canvas`: Reuse/adapt existing atom visualization as draggable atomic nodes inside the molecule workspace

## Impact

- **Code**: New modules/components (`MoleculeCanvas`, draggable `Atom`, `Bond`, `useMoleculeState`, `useMoleculeDetection`, geometry/valence utilities) plus targeted updates in existing `InfoPanel`, `Controls`, and `App` integration.
- **Architecture**: Introduces a second interaction surface (molecule workspace) while preserving the existing single-atom simulator behavior.
- **Performance**: Requires efficient distance checks and batched state updates during pointer movement to keep drag interactions smooth.
- **Dependencies**: No mandatory new dependency; implement with pointer events first. Optional light DnD library remains out of scope unless needed.
- **APIs/Data**: No backend changes; all logic stays client-side.
