## Context

The particle workspace is a React + Vite + TypeScript project. Currently it contains a basic `App.tsx` and an `APITester.tsx` shell. The goal is to introduce a self-contained interactive atom simulator as the default application view. All logic is client-side; no backend is needed. The simulator is educational, not a physics engine — correctness means following Bohr model rules, not quantum mechanics.

## Goals / Non-Goals

**Goals:**
- Render an SVG-based atom with animated orbiting electrons and a nucleus composed of protons/neutrons
- Implement Bohr electron shell distribution (K:2, L:8, M:18, N:32) recalculated on every state change
- Identify the current element by proton count for elements 1–20
- Provide user controls: add proton, add neutron, add electron, remove electron, simulate decay, reset
- Display ionic charge (cation/anion/neutral) in real time
- Implement simplified radioactive decay: −1 proton, −1 neutron, auto-adjust electrons
- Animate electron orbits continuously with per-shell speed variation
- Keep all state in a single custom hook (`useAtomState`)
- Use only existing dependencies (React, TypeScript, Vite); no additional runtime packages required

**Non-Goals:**
- Accurate quantum mechanical orbital shapes (s, p, d, f subshells)
- 3-D rendering
- Elements beyond Z=20 (Calcium)
- Network requests or persistence
- Mobile-native gestures (responsive layout is sufficient)
- Full interactive periodic table (a read-only reference panel for 1–20 is enough)

## Decisions

### SVG over Canvas API
**Decision:** Use SVG elements rendered inside a React component rather than an imperative Canvas 2D context.

**Rationale:** SVG integrates naturally with React's declarative model. Each electron, orbit ring, and nucleus particle maps to a React element, making state-driven re-renders straightforward without manual clear/redraw loops. CSS animations (`@keyframes rotate`) can handle continuous orbit rotation without `requestAnimationFrame` imperative code.

**Alternatives considered:**
- *Canvas 2D*: Requires an imperative animation loop, refs, and manual hit-testing. Harder to maintain declaratively.
- *WebGL/Three.js*: Significant overhead for a 2-D educational visualization.

### CSS `@keyframes` for orbit animation, not JS animation loop
**Decision:** Each orbit ring group gets a CSS animation `rotateOrbit` with a duration inversely proportional to shell index (inner shells faster).

**Rationale:** Eliminates the need for `requestAnimationFrame` bookkeeping. React re-renders only on state changes (user interactions), not on every animation frame — better performance and simpler code.

**Alternatives considered:**
- *Framer Motion*: Would add a runtime dependency and is overkill for simple rotations.
- *requestAnimationFrame hook*: Works but couples rendering to frame rate unnecessarily.

### Single `useAtomState` hook for all atom state
**Decision:** Encapsulate `{ protons, neutrons, electrons }` and all mutation actions inside one custom hook exported from `src/hooks/useAtomState.ts`.

**Rationale:** Keeps component tree clean — `App` owns state and passes it down via props. No context or global store needed for a single-page tool of this scope.

### Electron count follows protons by default (neutral start)
**Decision:** When a proton is added, one electron is also automatically added to keep the atom neutral. Users can then add/remove electrons independently to form ions.

**Rationale:** Matches chemistry intuition: elements are neutral by default. Simplifies onboarding.

### Periodic table data as a static TypeScript map
**Decision:** Define `ELEMENTS: Record<number, {name, symbol, category}>` as a plain TS constant in `src/utils/periodicTable.ts`.

**Rationale:** No JSON import or fetch needed. 20 entries fits in ~30 lines; easily readable and maintainable.

## Risks / Trade-offs

- **SVG performance with many electrons**: At Z=20 (Calcium, 20 electrons across 3 shells) the SVG has ~40 elements (20 electrons + 20 orbit-position markers). This is well within browser SVG performance limits. → No mitigation needed.
- **CSS animation continuity on re-render**: When React re-renders the orbit group, CSS animations reset if the element is unmounted/remounted. → Mitigated by using stable `key` props tied to shell index, not electron count; only electron counts inside a shell change, not the shell element itself.
- **Radioactive decay below Z=1**: Decay on hydrogen (1 proton) would produce an invalid state. → Guard: disable the decay button when `protons <= 1`.
- **Electron count exceeds shell capacity for Z>20 edge case**: Shell capacities K:2, L:8, M:18, N:32 total 60 — far beyond the 20-electron scope; no overflow handling required.

## Migration Plan

1. Replace `App.tsx` contents with the new simulator layout (no routing changes needed)
2. Add new files under `src/components/`, `src/hooks/`, `src/utils/`
3. Add global styles to `index.css` (dark background, font)
4. Run `npm run dev` to verify — no build config changes required

No rollback complexity: the change is additive within a single-page app with no persistent data.

## Open Questions

- None — scope is fully defined by the proposal. All design decisions recorded above.
