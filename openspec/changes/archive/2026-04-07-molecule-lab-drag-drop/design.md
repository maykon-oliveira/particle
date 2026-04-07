## Context

The project already includes an interactive atom simulator with atomic rendering, electron shell distribution, element identification, ion charge display, and simplified decay. This change must extend that existing system (not replace it) by adding a molecule workspace where multiple atoms can be dragged and bonded in real time. The architecture currently uses React + TypeScript and SVG-based visual rendering, which should be reused to keep behavior consistent and avoid duplicate logic.

## Goals / Non-Goals

**Goals:**
- Add a dedicated molecule interaction area where multiple atoms can coexist and be dragged.
- Maintain per-atom state (`id`, type, position, active bonds) and global molecule graph (`atoms[]`, `bonds[]`).
- Implement proximity-based bond creation and removal using Euclidean distance and valence limits.
- Detect known molecules from current graph (H2O, CO2, NH3, CH4) and expose formula + name to UI.
- Integrate molecule status into existing UI, especially `InfoPanel`, without breaking current atom simulator logic.
- Provide smooth visual feedback: proximity highlight, bond line rendering, transition when bonding/unbonding.

**Non-Goals:**
- Full chemical simulation (bond angles, energy minimization, orbital hybridization, ionic/covalent differentiation).
- Backend persistence, multiplayer, or remote collaboration.
- Molecule catalog beyond explicitly supported known set.
- Rebuilding the app structure from scratch or removing existing atom capabilities.

## Decisions

### 1) Separate molecule state from single-atom state
**Decision:** Keep existing `useAtomState` for atomic demo controls and introduce `useMoleculeState` for multi-atom graph interactions.

**Rationale:** Avoid regressions in current features while enabling molecule complexity. This minimizes coupling and makes each interaction model testable.

**Alternative considered:** Merge all state into one global store. Rejected because it increases complexity and risk for existing atom UI paths.

### 2) Pointer Events for drag-and-drop
**Decision:** Implement dragging with Pointer Events (`pointerdown/move/up`) rather than adding a DnD dependency.

**Rationale:** Works well for SVG coordinates, avoids bundle growth, gives direct control over movement thresholds and bonding checks.

**Alternative considered:** `dnd-kit`. Rejected for now because molecule drag requirements are geometric/custom and simpler with native events.

### 3) SVG as the shared rendering surface
**Decision:** Render molecule atoms and bonds inside one SVG workspace (`MoleculeCanvas`).

**Rationale:** Existing atom visuals already use SVG; lines/bonds and highlight overlays are straightforward; coordinate math remains consistent.

### 4) Bond lifecycle rule
**Decision:** A bond is created when distance between two atoms is below `bondThreshold` AND both atoms have available valence slots AND bond does not already exist. A bond is removed when distance rises above `disconnectThreshold` (slightly larger to avoid jitter).

**Rationale:** Simple, intuitive, and performant. Hysteresis (`disconnectThreshold > bondThreshold`) avoids flicker while dragging near the boundary.

### 5) Molecule detection via connected components + formula normalization
**Decision:** Build connected components from `bonds[]`, count atom types per component, normalize formula (e.g., C first, H second, then alphabetical fallback), and map supported formulas to known names.

**Rationale:** Graph-based detection is robust for multiple independent molecule clusters and easy to extend.

### 6) Incremental integration with existing components
**Decision:**
- Extend `Controls` with atom creation controls (add atom + type selector).
- Extend `InfoPanel` with "Current Molecule" section.
- Reuse/adapt existing atom visual primitive in molecule nodes.

**Rationale:** Preserves UI continuity and fulfills "extend, don't recreate" requirement.

## Risks / Trade-offs

- **[Risk] Drag move events trigger heavy O(n^2) proximity checks** → **Mitigation:** run checks only when active drag changes position; short-circuit by bounding distance; keep atom count practical.
- **[Risk] Bond flickering near threshold** → **Mitigation:** use hysteresis with separate create/remove thresholds.
- **[Risk] Existing atom simulator regressions due to shared components** → **Mitigation:** keep APIs backward-compatible; isolate molecule-specific props and paths.
- **[Risk] Ambiguous formula ordering** → **Mitigation:** use deterministic formatter and explicit mapping table for known molecules.

## Migration Plan

1. Add new molecule-domain types/utils/hooks (`types`, valence map, geometry distance, graph detection).
2. Implement `MoleculeCanvas` with drag handling, atom rendering, bond rendering, proximity highlights.
3. Extend `Controls` and `InfoPanel` with molecule UI sections while preserving existing behavior.
4. Wire new molecule state into `App` alongside existing atom simulation state.
5. Verify existing atom features still work unchanged.
6. Validate molecule scenarios (H2O/CO2/NH3/CH4 formation and disconnection behavior).

Rollback strategy: revert to previous App integration by removing molecule-state wiring; existing atom modules remain intact.

## Open Questions

- Whether to cap total atom count for performance (proposed default soft cap: 24 atoms).
- Whether disconnection should preserve molecule history in UI (currently out of scope).
