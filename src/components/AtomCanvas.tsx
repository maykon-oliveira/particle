import type { FC } from 'react';
import { distributeElectrons } from '../utils/electronDistribution';

interface Props {
	protons: number;
	neutrons: number;
	electrons: number;
	/** When true renders the decay ripple animation for ~1 s. */
	decaying: boolean;
}

// --- SVG layout constants ---
const SIZE = 500;
const CENTER = SIZE / 2; // 250

/** Orbit ring radii (px) for shells K, L, M, N. */
const ORBIT_RADII = [75, 125, 178, 234] as const;

/**
 * Orbit animation durations in seconds — inner shells are faster.
 * Values chosen for visual clarity: K(3s) → N(22s).
 */
const ORBIT_DURATIONS = [3, 7, 13, 22] as const;

const PROTON_COLOR = '#ef4444';   // red-500
const NEUTRON_COLOR = '#6b7280';  // gray-500
const ELECTRON_COLOR = '#22d3ee'; // cyan-400

const NUCLEUS_PARTICLE_R = 7;
const ELECTRON_R = 5;
const NUCLEUS_RING_SPACING = 14;

// --- helpers ---

/**
 * Returns SVG (x, y) coordinates for each particle in the nucleus cluster,
 * using concentric rings packed outward from the centre.
 */
function getNucleusPositions(count: number): [number, number][] {
	if (count === 0) return [];
	const positions: [number, number][] = [[CENTER, CENTER]];
	const ringCaps = [6, 12, 18, 24]; // max per ring
	let remaining = count - 1;

	for (let ring = 1; ring <= ringCaps.length && remaining > 0; ring++) {
		const r = ring * NUCLEUS_RING_SPACING;
		const n = Math.min(ringCaps[ring - 1], remaining);
		for (let i = 0; i < n; i++) {
			const angle = (2 * Math.PI * i) / n;
			positions.push([
				CENTER + r * Math.cos(angle),
				CENTER + r * Math.sin(angle),
			]);
		}
		remaining -= n;
	}
	return positions;
}

/**
 * Interleaves protons and neutrons so they mix visually in the nucleus.
 * Returns an array of 'p' | 'n' of length protons + neutrons.
 */
function interleaveParticles(p: number, n: number): Array<'p' | 'n'> {
	const items: Array<'p' | 'n'> = [];
	for (let i = 0; i < Math.max(p, n); i++) {
		if (i < p) items.push('p');
		if (i < n) items.push('n');
	}
	return items;
}

// --- component ---

/**
 * AtomCanvas renders an SVG Bohr-model atom with:
 *  - concentric orbit rings per populated shell
 *  - electrons rotating via CSS keyframe animation per shell group
 *  - nucleus particles (protons red, neutrons gray) in a compact cluster
 *  - an expanding ripple when `decaying` is true
 */
const AtomCanvas: FC<Props> = ({ protons, neutrons, electrons, decaying }) => {
	const { shells } = distributeElectrons(electrons);
	const particles = interleaveParticles(protons, neutrons);
	const nucleusPositions = getNucleusPositions(particles.length);

	// Outermost orbit radius — used to size the decay ripple
	const outerR = shells.length > 0
		? ORBIT_RADII[Math.min(shells.length - 1, ORBIT_RADII.length - 1)]
		: ORBIT_RADII[0];

	return (
		<svg
			viewBox={`0 0 ${SIZE} ${SIZE}`}
			style={{ width: '100%', maxWidth: 460 }}
			role="img"
			aria-label="Atom visualization"
		>
			<defs>
				{/* Soft glow filter for electrons */}
				<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
					<feMerge>
						<feMergeNode in="coloredBlur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
				{/* Radial gradient for nucleus background */}
				<radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
					<stop offset="100%" stopColor="#f97316" stopOpacity="0" />
				</radialGradient>
			</defs>

			{/* Nucleus background glow */}
			<circle cx={CENTER} cy={CENTER} r={40} fill="url(#nucleusGlow)" />

			{/* --- Orbit rings (one per populated shell) --- */}
			{shells.map((_, shellIdx) => (
				<circle
					key={`ring-${shellIdx}`}
					cx={CENTER}
					cy={CENTER}
					r={ORBIT_RADII[shellIdx]}
					fill="none"
					stroke="rgba(255,255,255,0.12)"
					strokeWidth={1}
					strokeDasharray="4 4"
				/>
			))}

			{/* --- Electrons per shell, animated by CSS keyframes ---
			  Each shell gets a stable group keyed by shell index so animation state
			  is preserved across re-renders. Electrons are positioned evenly along
			  the shell radius and the entire group rotates around the nucleus. */}
			{shells.map((shellElectrons, shellIdx) => {
				const r = ORBIT_RADII[shellIdx];
				const dur = ORBIT_DURATIONS[shellIdx];
				return (
					<g
						key={`shell-${shellIdx}`}
						style={{
							transformOrigin: `${CENTER}px ${CENTER}px`,
							animation: `orbit ${dur}s linear infinite`,
						}}
					>
						{Array.from({ length: shellElectrons }, (_, eIdx) => {
							const angle = (2 * Math.PI * eIdx) / shellElectrons;
							const x = CENTER + r * Math.cos(angle);
							const y = CENTER + r * Math.sin(angle);
							return (
								<circle
									key={`e-${shellIdx}-${eIdx}`}
									cx={x}
									cy={y}
									r={ELECTRON_R}
									fill={ELECTRON_COLOR}
									filter="url(#glow)"
								/>
							);
						})}
					</g>
				);
			})}

			{/* --- Nucleus particles (protons + neutrons interleaved) --- */}
			{particles.map((type, i) => {
				if (i >= nucleusPositions.length) return null;
				const [x, y] = nucleusPositions[i];
				return (
					<circle
						key={`nuc-${i}`}
						cx={x}
						cy={y}
						r={NUCLEUS_PARTICLE_R}
						fill={type === 'p' ? PROTON_COLOR : NEUTRON_COLOR}
						stroke="rgba(0,0,0,0.35)"
						strokeWidth={1}
					/>
				);
			})}

			{/* --- Decay ripple: expanding ring animated via SMIL --- */}
			{decaying && (
				<circle
					cx={CENTER}
					cy={CENTER}
					r={outerR + 15}
					fill="none"
					stroke="#f97316"
					strokeWidth={4}
				>
					{/* Expand the ring outward */}
					<animate
						attributeName="r"
						from={outerR + 15}
						to={outerR + 75}
						dur="1s"
						fill="freeze"
					/>
					{/* Fade out as it expands */}
					<animate
						attributeName="opacity"
						from="1"
						to="0"
						dur="1s"
						fill="freeze"
					/>
				</circle>
			)}
		</svg>
	);
};

export default AtomCanvas;
