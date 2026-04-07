export type AtomType = 'H' | 'O' | 'N' | 'C';

export interface MoleculeAtom {
	id: string;
	type: AtomType;
	x: number;
	y: number;
	bonds: string[];
}

export interface Bond {
	id: string;
	atom1Id: string;
	atom2Id: string;
}

export interface MoleculeMatch {
	formula: string;
	name: string;
	atomIds: string[];
	known: boolean;
}

export const VALENCE_LIMITS: Record<AtomType, number> = {
	H: 1,
	O: 2,
	N: 3,
	C: 4,
};

export const BOND_THRESHOLD = 72;
export const DISCONNECT_THRESHOLD = 92;
