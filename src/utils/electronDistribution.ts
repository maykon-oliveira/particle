// Bohr model electron shell distribution: K(2), L(8), M(18), N(32)
const SHELL_CAPS = [2, 8, 18, 32] as const;
export const SHELL_NAMES = ['K', 'L', 'M', 'N'] as const;

export interface ShellDistribution {
	/** Electrons per shell, index 0 = K, only populated shells included */
	shells: number[];
	/** Human-readable string e.g. "2, 8, 1" */
	formatted: string;
}

/**
 * Distributes `electronCount` electrons across shells K→N following Bohr capacities.
 * Pure function — safe to call on every render.
 */
export function distributeElectrons(electronCount: number): ShellDistribution {
	const shells: number[] = [];
	let remaining = Math.max(0, electronCount);

	for (const cap of SHELL_CAPS) {
		if (remaining <= 0) break;
		const fill = Math.min(remaining, cap);
		shells.push(fill);
		remaining -= fill;
	}

	return {
		shells,
		formatted: shells.length === 0 ? '—' : shells.join(', '),
	};
}
