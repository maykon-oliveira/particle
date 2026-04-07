## Why

The existing application lacks interactive educational tools for visualizing atomic structure. An interactive atom simulator will provide a visually engaging, didactic experience that teaches fundamental chemistry and physics concepts (subatomic particles, electron shells, radioactive decay, ionic charge) through real-time manipulation.

## What Changes

- Introduce a full-featured interactive atom simulator as the primary application view
- Add animated SVG/Canvas rendering of atomic structure (nucleus + electron orbits)
- Add user controls to add/remove protons, neutrons, and electrons
- Add automatic element identification from proton count (elements 1–20)
- Add Bohr model electron shell distribution (K, L, M, N layers)
- Add simplified radioactive decay simulation
- Add ionic charge calculation and display
- Add a periodic table reference panel (elements 1–20)

## Capabilities

### New Capabilities

- `atom-canvas`: SVG/Canvas rendering of the atom with animated orbiting electrons and nucleus particles
- `electron-distribution`: Automatic electron shell distribution following Bohr model (K:2, L:8, M:18, N:32)
- `element-identification`: Mapping proton count to element name, symbol, and atomic number (elements 1–20)
- `atom-controls`: User interaction buttons (add proton, add neutron, add/remove electron, radioactive decay, reset)
- `info-panel`: Real-time display of element name, atomic number, electron configuration, mass number, and ionic charge
- `radioactive-decay`: Simplified alpha-like decay removing one proton and one neutron with visual feedback

### Modified Capabilities

<!-- No existing specs — this is a new application feature set -->

## Impact

- **Code**: New React components (`AtomCanvas`, `Controls`, `InfoPanel`), custom hook (`useAtomState`), utility modules (`electronDistribution`, `periodicTable`)
- **Dependencies**: No new runtime dependencies required; Vite + React already present. Optional: Tailwind CSS for styling.
- **APIs**: No external APIs; all logic is client-side
- **Assets**: No new assets required; particles rendered programmatically
