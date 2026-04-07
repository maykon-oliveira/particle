import type { AtomType, Bond, MoleculeAtom } from '../types/molecule';
import { VALENCE_LIMITS } from '../types/molecule';

export function euclideanDistance(x1: number, y1: number, x2: number, y2: number): number {
	const dx = x2 - x1;
	const dy = y2 - y1;
	return Math.sqrt(dx * dx + dy * dy);
}

export function bondCountByAtomId(bonds: Bond[]): Map<string, number> {
	const counts = new Map<string, number>();
	for (const bond of bonds) {
		counts.set(bond.atom1Id, (counts.get(bond.atom1Id) ?? 0) + 1);
		counts.set(bond.atom2Id, (counts.get(bond.atom2Id) ?? 0) + 1);
	}
	return counts;
}

export function canAcceptBond(atom: MoleculeAtom, currentBondCount: number): boolean {
	return currentBondCount < VALENCE_LIMITS[atom.type];
}

export function formulaFromCounts(counts: Partial<Record<AtomType, number>>): string {
	const keys = Object.keys(counts) as AtomType[];
	if (keys.length === 0) return '—';

	const ordered: AtomType[] = [];
	if ((counts.C ?? 0) > 0) {
		ordered.push('C');
		if ((counts.H ?? 0) > 0) ordered.push('H');
		const rest = keys.filter(k => k !== 'C' && k !== 'H').sort();
		ordered.push(...rest);
	} else {
		ordered.push(...keys.sort());
	}

	return ordered
		.map(key => {
			const n = counts[key] ?? 0;
			return n <= 1 ? key : `${key}${n}`;
		})
		.join('');
}
