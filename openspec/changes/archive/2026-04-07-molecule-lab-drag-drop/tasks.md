## 1. Foundation and Data Model

- [x] 1.1 Add molecule domain types (`AtomType`, `MoleculeAtom`, `Bond`) and shared constants (valence map, thresholds)
- [x] 1.2 Add utility for Euclidean distance calculation between atom coordinates
- [x] 1.3 Add utility to count bonds per atom and check valence availability
- [x] 1.4 Add utility to normalize formula strings from atom counts (deterministic ordering)

## 2. Molecule State Hook

- [x] 2.1 Create `useMoleculeState` hook with `atoms[]` and `bonds[]` collections
- [x] 2.2 Implement action to add atom with selected type (H/O/N/C) and initial position
- [x] 2.3 Implement action to update atom position during drag (`moveAtom(id, x, y)`)
- [x] 2.4 Implement bond creation logic with proximity + valence checks
- [x] 2.5 Implement bond removal logic when atoms separate beyond disconnect threshold
- [x] 2.6 Implement derived proximity candidates for visual highlight while dragging
- [x] 2.7 Implement reset action for molecule workspace state

## 3. Molecule Detection Hook

- [x] 3.1 Create `useMoleculeDetection` hook (or pure utility) using connected-component analysis on `atoms` + `bonds`
- [x] 3.2 Implement known molecule lookup table (`H2O`, `CO2`, `NH3`, `CH4`)
- [x] 3.3 Return structured detection result with formula, known name, and unknown fallback

## 4. Molecule Canvas and Rendering

- [x] 4.1 Create `MoleculeCanvas` component with SVG workspace for atoms and bond lines
- [x] 4.2 Render bond lines from `bonds[]` connecting atom coordinates
- [x] 4.3 Render atom nodes with reusable atom visual style and type label
- [x] 4.4 Add pointer-based drag handlers (`pointerdown`, `pointermove`, `pointerup`, capture/release)
- [x] 4.5 Wire dragging to state updates and live bond lifecycle checks
- [x] 4.6 Add candidate highlight feedback when atoms are near bond threshold
- [x] 4.7 Add smooth visual transition for bond create/remove events

## 5. Integrate with Existing UI

- [x] 5.1 Extend existing `Controls` with atom type selector (H/O/N/C)
- [x] 5.2 Add "Adicionar átomo" action in `Controls` and wire to `useMoleculeState`
- [x] 5.3 Extend existing `InfoPanel` with "Molécula atual" section (name + formula)
- [x] 5.4 Integrate `MoleculeCanvas` into `App` without removing existing atom simulator section
- [x] 5.5 Ensure existing atom controls and atom visualization still function unchanged

## 6. Validation and Quality

- [x] 6.1 Verify valence limits: H=1, O=2, N=3, C=4
- [x] 6.2 Verify auto-bond creation under threshold and auto-removal above disconnect threshold
- [x] 6.3 Verify molecule detection for `H2O`, `CO2`, `NH3`, `CH4`
- [x] 6.4 Verify unknown molecule fallback formula behavior
- [x] 6.5 Verify drag responsiveness with multiple atoms and no UI stutter
- [x] 6.6 Verify regression safety: existing atomic features (Bohr layers, decay, ion charge, element id) remain correct
- [x] 6.7 Run project validation command (`bunx tsc --noEmit` and app run) to confirm no build/type errors

