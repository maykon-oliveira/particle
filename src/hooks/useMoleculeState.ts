import { useCallback, useMemo, useState } from 'react';
import type { AtomType, Bond, MoleculeAtom } from '../types/molecule';
import { BOND_THRESHOLD, DISCONNECT_THRESHOLD } from '../types/molecule';
import { bondCountByAtomId, canAcceptBond, euclideanDistance } from '../utils/moleculeUtils';

interface MoleculeStateApi {
	atoms: MoleculeAtom[];
	bonds: Bond[];
	candidateAtomIds: string[];
	addAtom: (type: AtomType) => void;
	moveAtom: (id: string, x: number, y: number) => void;
	resetMolecules: () => void;
}

interface MoleculeGraphState {
	atoms: MoleculeAtom[];
	bonds: Bond[];
	candidateAtomIds: string[];
}

function recomputeBonds(
	atoms: MoleculeAtom[],
	bonds: Bond[],
): { bonds: Bond[]; candidateAtomIds: string[] } {
	const atomById = new Map(atoms.map(a => [a.id, a]));

	let nextBonds = bonds.filter(b => {
		const a1 = atomById.get(b.atom1Id);
		const a2 = atomById.get(b.atom2Id);
		if (!a1 || !a2) return false;
		return euclideanDistance(a1.x, a1.y, a2.x, a2.y) <= DISCONNECT_THRESHOLD;
	});

	const candidates = new Set<string>();
	const existingKey = new Set(nextBonds.map(b => `${[b.atom1Id, b.atom2Id].sort().join(':')}`));
	const counts = bondCountByAtomId(nextBonds);

	for (let i = 0; i < atoms.length; i++) {
		for (let j = i + 1; j < atoms.length; j++) {
			const a = atoms[i];
			const b = atoms[j];
			const d = euclideanDistance(a.x, a.y, b.x, b.y);
			if (d >= BOND_THRESHOLD) continue;

			candidates.add(a.id);
			candidates.add(b.id);

			const key = `${[a.id, b.id].sort().join(':')}`;
			if (existingKey.has(key)) continue;

			const aCount = counts.get(a.id) ?? 0;
			const bCount = counts.get(b.id) ?? 0;
			if (!canAcceptBond(a, aCount) || !canAcceptBond(b, bCount)) continue;

			const bond: Bond = {
				id: `b-${a.id}-${b.id}`,
				atom1Id: a.id,
				atom2Id: b.id,
			};

			nextBonds = [...nextBonds, bond];
			existingKey.add(key);
			counts.set(a.id, aCount + 1);
			counts.set(b.id, bCount + 1);
		}
	}

	return { bonds: nextBonds, candidateAtomIds: [...candidates] };
}

function withAtomBondLists(atoms: MoleculeAtom[], bonds: Bond[]): MoleculeAtom[] {
	const byId = new Map<string, string[]>();
	for (const atom of atoms) byId.set(atom.id, []);
	for (const b of bonds) {
		byId.get(b.atom1Id)?.push(b.id);
		byId.get(b.atom2Id)?.push(b.id);
	}
	return atoms.map(atom => ({ ...atom, bonds: byId.get(atom.id) ?? [] }));
}

export function useMoleculeState(): MoleculeStateApi {
	const [graph, setGraph] = useState<MoleculeGraphState>({
		atoms: [],
		bonds: [],
		candidateAtomIds: [],
	});

	const addAtom = useCallback((type: AtomType) => {
		setGraph(prev => {
			const idx = prev.atoms.length;
			const atom: MoleculeAtom = {
				id: `a-${Date.now()}-${idx}`,
				type,
				x: 100 + (idx % 6) * 85,
				y: 90 + Math.floor(idx / 6) * 75,
				bonds: [],
			};
			const nextAtoms = [...prev.atoms, atom];
			const recomputed = recomputeBonds(nextAtoms, prev.bonds);
			return {
				atoms: withAtomBondLists(nextAtoms, recomputed.bonds),
				bonds: recomputed.bonds,
				candidateAtomIds: recomputed.candidateAtomIds,
			};
		});
	}, []);

	const moveAtom = useCallback((id: string, x: number, y: number) => {
		setGraph(prev => {
			const nextAtoms = prev.atoms.map(a => (a.id === id ? { ...a, x, y } : a));
			const recomputed = recomputeBonds(nextAtoms, prev.bonds);
			return {
				atoms: withAtomBondLists(nextAtoms, recomputed.bonds),
				bonds: recomputed.bonds,
				candidateAtomIds: recomputed.candidateAtomIds,
			};
		});
	}, []);

	const resetMolecules = useCallback(() => {
		setGraph({ atoms: [], bonds: [], candidateAtomIds: [] });
	}, []);

	return useMemo(() => ({
		atoms: graph.atoms,
		bonds: graph.bonds,
		candidateAtomIds: graph.candidateAtomIds,
		addAtom,
		moveAtom,
		resetMolecules,
	}), [graph, addAtom, moveAtom, resetMolecules]);
}
