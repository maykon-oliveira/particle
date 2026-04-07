import { useMemo } from 'react';
import type { AtomType, Bond, MoleculeAtom, MoleculeMatch } from '../types/molecule';
import { formulaFromCounts } from '../utils/moleculeUtils';

const KNOWN_MOLECULES: Record<string, string> = {
	H2O: 'Agua',
	CO2: 'Dioxido de carbono',
	NH3: 'Amonia',
	CH4: 'Metano',
};

function buildAdjacency(atoms: MoleculeAtom[], bonds: Bond[]): Map<string, string[]> {
	const map = new Map<string, string[]>();
	for (const atom of atoms) map.set(atom.id, []);
	for (const bond of bonds) {
		map.get(bond.atom1Id)?.push(bond.atom2Id);
		map.get(bond.atom2Id)?.push(bond.atom1Id);
	}
	return map;
}

function detectMolecules(atoms: MoleculeAtom[], bonds: Bond[]): MoleculeMatch[] {
	if (atoms.length === 0) return [];
	const byId = new Map(atoms.map(a => [a.id, a]));
	const adj = buildAdjacency(atoms, bonds);
	const visited = new Set<string>();
	const result: MoleculeMatch[] = [];

	for (const atom of atoms) {
		if (visited.has(atom.id)) continue;
		const stack = [atom.id];
		visited.add(atom.id);
		const ids: string[] = [];

		while (stack.length > 0) {
			const cur = stack.pop()!;
			ids.push(cur);
			for (const next of adj.get(cur) ?? []) {
				if (!visited.has(next)) {
					visited.add(next);
					stack.push(next);
				}
			}
		}

		if (ids.length < 2) continue;
		const counts: Partial<Record<AtomType, number>> = {};
		for (const id of ids) {
			const type = byId.get(id)?.type;
			if (!type) continue;
			counts[type] = (counts[type] ?? 0) + 1;
		}

		const formula = formulaFromCounts(counts);
		const knownName = KNOWN_MOLECULES[formula];
		result.push({
			formula,
			name: knownName ?? 'Unknown',
			atomIds: ids,
			known: Boolean(knownName),
		});
	}

	return result;
}

export function useMoleculeDetection(atoms: MoleculeAtom[], bonds: Bond[]) {
	const molecules = useMemo(() => detectMolecules(atoms, bonds), [atoms, bonds]);

	const currentMolecule = useMemo(() => {
		if (molecules.length === 0) return null;
		const known = molecules.find(m => m.known);
		return known ?? molecules[0];
	}, [molecules]);

	return { molecules, currentMolecule };
}
