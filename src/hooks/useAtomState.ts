import { useState, useCallback, useRef } from 'react';

export interface AtomState {
	protons: number;
	neutrons: number;
	electrons: number;
	/** True for ~1 s immediately after a decay event, used to trigger visual feedback. */
	decaying: boolean;
}

export interface AtomActions {
	addProton: () => void;
	addNeutron: () => void;
	addElectron: () => void;
	removeElectron: () => void;
	decay: () => void;
	reset: () => void;
}

const INITIAL: AtomState = {
	protons: 1,
	neutrons: 0,
	electrons: 1,
	decaying: false,
};

/** Manages all atom particle state and exposes mutation actions. */
export function useAtomState(): AtomState & AtomActions {
	const [state, setState] = useState<AtomState>(INITIAL);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// --- actions ---

	/** Adds one proton and one electron (keeps atom neutral). Max Z = 20. */
	const addProton = useCallback(() => {
		setState(s =>
			s.protons >= 20 ? s : { ...s, protons: s.protons + 1, electrons: s.electrons + 1 },
		);
	}, []);

	/** Adds one neutron. */
	const addNeutron = useCallback(() => {
		setState(s => ({ ...s, neutrons: s.neutrons + 1 }));
	}, []);

	/** Adds one electron (may create an anion). */
	const addElectron = useCallback(() => {
		setState(s => ({ ...s, electrons: s.electrons + 1 }));
	}, []);

	/** Removes one electron (may create a cation). No-op at zero electrons. */
	const removeElectron = useCallback(() => {
		setState(s => (s.electrons <= 0 ? s : { ...s, electrons: s.electrons - 1 }));
	}, []);

	/**
	 * Simulates simplified radioactive decay: −1 proton, −1 neutron.
	 * Reduces electrons if they would exceed the new proton count.
	 * Disabled when protons ≤ 1 or neutrons ≤ 0 (guard enforced in Controls too).
	 */
	const decay = useCallback(() => {
		setState(s => {
			if (s.protons <= 1 || s.neutrons <= 0) return s;
			const newProtons = s.protons - 1;
			const newNeutrons = s.neutrons - 1;
			const newElectrons = s.electrons > newProtons ? newProtons : s.electrons;
			return {
				...s,
				protons: newProtons,
				neutrons: newNeutrons,
				electrons: newElectrons,
				decaying: true,
			};
		});
		// Auto-clear the decaying flag after 1 s
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(
			() => setState(s => ({ ...s, decaying: false })),
			1000,
		);
	}, []);

	/** Resets the atom to the initial state (Hydrogen, neutral). */
	const reset = useCallback(() => {
		if (timerRef.current) clearTimeout(timerRef.current);
		setState(INITIAL);
	}, []);

	return { ...state, addProton, addNeutron, addElectron, removeElectron, decay, reset };
}
