## ADDED Requirements

### Requirement: Atom nucleus is rendered with proton and neutron particles
The system SHALL render a central nucleus region inside an SVG viewport. Each proton SHALL be displayed as a red circle and each neutron as a gray circle, arranged compactly within the nucleus area. The nucleus SHALL scale visually with particle count up to a reasonable maximum radius.

#### Scenario: Hydrogen nucleus display
- **WHEN** the atom state has 1 proton and 0 neutrons
- **THEN** the SVG shows exactly 1 red circle in the nucleus region and 0 gray circles

#### Scenario: Nucleus grows with more particles
- **WHEN** the atom state has 6 protons and 6 neutrons (Carbon)
- **THEN** the SVG shows 6 red circles and 6 gray circles arranged within the nucleus region

### Requirement: Electron orbit rings are rendered per shell
The system SHALL render one circular SVG orbit ring for each populated electron shell. Shell radii SHALL increase with shell index (K innermost, N outermost).

#### Scenario: Single shell orbit
- **WHEN** the atom has 1 electron (shell K only)
- **THEN** exactly 1 orbit ring is visible in the SVG

#### Scenario: Multiple shell orbits
- **WHEN** the atom has 3 electrons (K:2, L:1)
- **THEN** 2 orbit rings are visible in the SVG

### Requirement: Electrons animate continuously on their orbits
The system SHALL animate electron positions along their orbit rings using CSS keyframe animations. Inner shells SHALL orbit faster than outer shells. The animation SHALL run continuously without user interaction.

#### Scenario: Orbit animation runs on load
- **WHEN** the simulator is first rendered
- **THEN** electron group elements have a CSS animation applied that rotates them around the nucleus

#### Scenario: Per-shell speed variation
- **WHEN** electrons exist in both shell K and shell L
- **THEN** the K-shell electrons complete one orbit faster than the L-shell electrons

### Requirement: SVG viewport is responsive and centered
The system SHALL render the atom SVG within a centered container. The SVG SHALL maintain a square aspect ratio and scale to fit its container without overflow.

#### Scenario: Atom is centered on the page
- **WHEN** the simulator is displayed
- **THEN** the SVG atom visualization is horizontally and vertically centered in its panel
