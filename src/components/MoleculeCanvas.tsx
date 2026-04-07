import { useRef, useState, type PointerEvent } from 'react';
import type { Bond, MoleculeAtom } from '../types/molecule';

interface Props {
	atoms: MoleculeAtom[];
	bonds: Bond[];
	candidateAtomIds: string[];
	onMoveAtom: (id: string, x: number, y: number) => void;
}

const WIDTH = 760;
const HEIGHT = 360;
const RADIUS = 24;

const TYPE_COLORS: Record<MoleculeAtom['type'], string> = {
	H: '#60a5fa',
	O: '#f87171',
	N: '#a78bfa',
	C: '#34d399',
};

function getSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
	const rect = svg.getBoundingClientRect();
	const x = ((clientX - rect.left) / rect.width) * WIDTH;
	const y = ((clientY - rect.top) / rect.height) * HEIGHT;
	return { x, y };
}

const MoleculeCanvas = ({ atoms, bonds, candidateAtomIds, onMoveAtom }: Props) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const [draggingAtomId, setDraggingAtomId] = useState<string | null>(null);
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	const atomById = new Map(atoms.map(a => [a.id, a]));

	const onPointerDownAtom = (e: PointerEvent<SVGGElement>, atom: MoleculeAtom) => {
		const svg = svgRef.current;
		if (!svg) return;
		e.preventDefault();
		e.currentTarget.setPointerCapture(e.pointerId);
		const p = getSvgPoint(svg, e.clientX, e.clientY);
		setDraggingAtomId(atom.id);
		setOffset({ x: p.x - atom.x, y: p.y - atom.y });
	};

	const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
		const svg = svgRef.current;
		if (!svg || !draggingAtomId) return;
		const p = getSvgPoint(svg, e.clientX, e.clientY);
		const x = Math.max(RADIUS, Math.min(WIDTH - RADIUS, p.x - offset.x));
		const y = Math.max(RADIUS, Math.min(HEIGHT - RADIUS, p.y - offset.y));
		onMoveAtom(draggingAtomId, x, y);
	};

	const onPointerEnd = (e: PointerEvent<SVGSVGElement>) => {
		if (draggingAtomId) {
			try {
				(e.target as Element).releasePointerCapture?.(e.pointerId);
			} catch {
				// no-op
			}
		}
		setDraggingAtomId(null);
	};

	return (
		<div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
			<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
				Molecule Workspace
			</h2>
			<svg
				ref={svgRef}
				viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
				className="w-full rounded-lg bg-[#0d1220] border border-gray-800 touch-none select-none"
				onPointerMove={onPointerMove}
				onPointerUp={onPointerEnd}
				onPointerCancel={onPointerEnd}
			>
				<defs>
					<pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
						<path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
					</pattern>
				</defs>

				<rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#grid)" />

				{bonds.map(bond => {
					const a = atomById.get(bond.atom1Id);
					const b = atomById.get(bond.atom2Id);
					if (!a || !b) return null;
					return (
						<line
							key={bond.id}
							x1={a.x}
							y1={a.y}
							x2={b.x}
							y2={b.y}
							stroke="#a5b4fc"
							strokeWidth="3"
							strokeLinecap="round"
							opacity="0.9"
						/>
					);
				})}

				{atoms.map(atom => {
					const isCandidate = candidateAtomIds.includes(atom.id);
					const fill = TYPE_COLORS[atom.type];
					return (
						<g
							key={atom.id}
							transform={`translate(${atom.x}, ${atom.y})`}
							onPointerDown={e => onPointerDownAtom(e, atom)}
							style={{ cursor: 'grab' }}
						>
							<circle r={RADIUS + 7} fill="none" stroke={isCandidate ? '#f59e0b' : 'transparent'} strokeWidth="3" />
							<circle r={RADIUS} fill={fill} stroke="rgba(15,23,42,0.8)" strokeWidth="3" />
							<text
								textAnchor="middle"
								dominantBaseline="middle"
								fill="white"
								style={{ fontSize: 16, fontWeight: 700, userSelect: 'none' }}
							>
								{atom.type}
							</text>
						</g>
					);
				})}
			</svg>
			<p className="text-xs text-gray-400 mt-2">
				Drag atoms to aproximar e formar ligacoes. Afaste para desconectar.
			</p>
		</div>
	);
};

export default MoleculeCanvas;
