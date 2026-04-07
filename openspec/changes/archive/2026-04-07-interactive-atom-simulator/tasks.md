## 1. Project Scaffolding & Cleanup

- [x] 1.1 Clean up `src/App.tsx` — replace placeholder content with the simulator layout shell
- [x] 1.2 Update `src/index.css` with dark-background global styles and CSS orbit animation keyframes
- [x] 1.3 Create directory structure: `src/components/`, `src/hooks/`, `src/utils/`

## 2. Utility Modules

- [x] 2.1 Create `src/utils/periodicTable.ts` — static map of elements 1–20 (atomic number, name, symbol)
- [x] 2.2 Create `src/utils/electronDistribution.ts` — pure function that distributes electron count across K/L/M/N shells (caps: 2/8/18/32) and returns formatted configuration string

## 3. Atom State Hook

- [x] 3.1 Create `src/hooks/useAtomState.ts` — encapsulate `{ protons, neutrons, electrons }` state and actions: `addProton`, `addNeutron`, `addElectron`, `removeElectron`, `decay`, `reset`
- [x] 3.2 Implement `addProton` — increments protons and electrons together, disabled at Z=20
- [x] 3.3 Implement `addNeutron` — increments neutron count
- [x] 3.4 Implement `addElectron` — increments electron count (allows anion formation)
- [x] 3.5 Implement `removeElectron` — decrements electron count, guarded against going below 0
- [x] 3.6 Implement `decay` — decrements protons and neutrons by 1, adjusts electrons if they exceed new proton count; guarded when protons ≤ 1 or neutrons ≤ 0
- [x] 3.7 Implement `reset` — restores state to initial (1p, 0n, 1e)

## 4. AtomCanvas Component

- [x] 4.1 Create `src/components/AtomCanvas.tsx` — SVG-based atom renderer accepting `protons`, `neutrons`, `electrons` as props
- [x] 4.2 Render nucleus particles — protons as red circles, neutrons as gray circles, arranged in the center
- [x] 4.3 Render orbit rings — one `<circle>` ring per populated shell, with increasing radii (K innermost)
- [x] 4.4 Render electrons on orbits — distribute electrons around each orbit ring using angular positions
- [x] 4.5 Apply CSS keyframe rotation animation to each orbit group — inner shells faster than outer shells
- [x] 4.6 Use stable `key` props on orbit groups tied to shell index to prevent animation reset on re-render

## 5. Controls Component

- [x] 5.1 Create `src/components/Controls.tsx` — button panel accepting action callbacks and current state as props
- [x] 5.2 Add "Add Proton" button — disabled when protons ≥ 20
- [x] 5.3 Add "Add Neutron" button
- [x] 5.4 Add "Add Electron" button
- [x] 5.5 Add "Remove Electron" button — disabled when electrons ≤ 0
- [x] 5.6 Add "Simulate Decay" button — disabled when protons ≤ 1 or neutrons ≤ 0
- [x] 5.7 Add "Reset" button

## 6. Radioactive Decay Feedback

- [x] 6.1 Add `decaying` boolean state (or `useState` flag) in `useAtomState` or `App` that flips true on decay and resets after ~1 second
- [x] 6.2 Pass `decaying` flag to `AtomCanvas` or a sibling element to trigger a brief CSS flash/pulse animation

## 7. InfoPanel Component

- [x] 7.1 Create `src/components/InfoPanel.tsx` — display panel accepting atom state as props
- [x] 7.2 Display element name, symbol, and atomic number (from `periodicTable` util)
- [x] 7.3 Display mass number (protons + neutrons)
- [x] 7.4 Display electron configuration string (from `electronDistribution` util)
- [x] 7.5 Display ionic charge value and label (Neutral / Cation / Anion)

## 8. App Integration

- [x] 8.1 Wire `useAtomState` hook in `App.tsx` and pass state + actions to `AtomCanvas`, `Controls`, and `InfoPanel`
- [x] 8.2 Compose the layout: `AtomCanvas` centered, `InfoPanel` alongside, `Controls` below or in a sidebar
- [x] 8.3 Apply responsive CSS for the overall layout (centered, dark theme, min-width for readability)

## 9. Verification

- [x] 9.1 Manually verify electron distribution for H (1), Na (11), Ca (20)
- [x] 9.2 Verify charge labels: neutral, cation, anion display correctly
- [x] 9.3 Verify decay disables correctly for H and atoms with 0 neutrons
- [x] 9.4 Verify orbit CSS animation runs on load and per-shell speeds differ
- [x] 9.5 Verify decay flash feedback appears and disappears automatically
- [x] 9.6 Run `npm run dev` and confirm no TypeScript/build errors
