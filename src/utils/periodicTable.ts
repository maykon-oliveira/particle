// Static periodic table data for elements 1–20 (Hydrogen to Calcium)
export interface Element {
	z: number;
	name: string;
	symbol: string;
}

const ELEMENTS: Record<number, Element> = {
	1: { z: 1, name: 'Hydrogen', symbol: 'H' },
	2: { z: 2, name: 'Helium', symbol: 'He' },
	3: { z: 3, name: 'Lithium', symbol: 'Li' },
	4: { z: 4, name: 'Beryllium', symbol: 'Be' },
	5: { z: 5, name: 'Boron', symbol: 'B' },
	6: { z: 6, name: 'Carbon', symbol: 'C' },
	7: { z: 7, name: 'Nitrogen', symbol: 'N' },
	8: { z: 8, name: 'Oxygen', symbol: 'O' },
	9: { z: 9, name: 'Fluorine', symbol: 'F' },
	10: { z: 10, name: 'Neon', symbol: 'Ne' },
	11: { z: 11, name: 'Sodium', symbol: 'Na' },
	12: { z: 12, name: 'Magnesium', symbol: 'Mg' },
	13: { z: 13, name: 'Aluminum', symbol: 'Al' },
	14: { z: 14, name: 'Silicon', symbol: 'Si' },
	15: { z: 15, name: 'Phosphorus', symbol: 'P' },
	16: { z: 16, name: 'Sulfur', symbol: 'S' },
	17: { z: 17, name: 'Chlorine', symbol: 'Cl' },
	18: { z: 18, name: 'Argon', symbol: 'Ar' },
	19: { z: 19, name: 'Potassium', symbol: 'K' },
	20: { z: 20, name: 'Calcium', symbol: 'Ca' },
};

/** Returns the element for a given proton count (1–20), or null if unknown. */
export function getElement(protons: number): Element | null {
	return ELEMENTS[protons] ?? null;
}

export default ELEMENTS;
