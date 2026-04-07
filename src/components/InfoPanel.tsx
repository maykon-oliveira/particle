import type { FC } from 'react';
import { getElement } from '../utils/periodicTable';
import { distributeElectrons } from '../utils/electronDistribution';

interface Props {
	protons: number;
	neutrons: number;
	electrons: number;
	moleculeName?: string;
	moleculeFormula?: string;
}

interface StatProps {
	label: string;
	value: number;
	color: string;
}

/** Single stat tile used inside InfoPanel. */
const Stat: FC<StatProps> = ({ label, value, color }) => (
	<div className="bg-gray-800 rounded-lg p-2 text-center">
		<div className={`text-lg font-bold leading-none ${color}`}>{value}</div>
		<div className="text-xs text-gray-400 mt-1">{label}</div>
	</div>
);

/** Displays current element info, particle counts, electron config, and ionic charge. */
const InfoPanel: FC<Props> = ({
	protons,
	neutrons,
	electrons,
	moleculeName,
	moleculeFormula,
}) => {
	const element = getElement(protons);
	const massNumber = protons + neutrons;
	const { formatted: electronConfig } = distributeElectrons(electrons);

	// Ionic charge: positive = cation, negative = anion, 0 = neutral
	const charge = protons - electrons;
	const chargeSign = charge > 0 ? `+${charge}` : `${charge}`;
	const chargeLabel = charge === 0 ? 'Neutral' : charge > 0 ? 'Cation' : 'Anion';
	const chargeColor =
		charge === 0 ? 'text-green-400' : charge > 0 ? 'text-red-400' : 'text-blue-400';

	return (
		<div className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-4 min-w-55">
			{/* Element identity header */}
			<div className="flex items-center gap-3 border-b border-gray-700 pb-4">
				<div className="w-14 h-14 shrink-0 rounded-lg bg-gray-800 border border-gray-600 flex flex-col items-center justify-center gap-0.5">
					<span className="text-xl font-bold leading-none text-white">
						{element?.symbol ?? '?'}
					</span>
					<span className="text-xs text-gray-400">{element?.z ?? '—'}</span>
				</div>
				<div>
					<div className="text-lg font-semibold text-white leading-tight">
						{element?.name ?? 'Unknown'}
					</div>
					<div className="text-xs text-gray-400 mt-0.5">Atomic number: {protons}</div>
				</div>
			</div>

			{/* Particle counts + mass number */}
			<div className="grid grid-cols-2 gap-2 text-sm">
				<Stat label="Protons" value={protons} color="text-red-400" />
				<Stat label="Neutrons" value={neutrons} color="text-gray-400" />
				<Stat label="Electrons" value={electrons} color="text-cyan-400" />
				<Stat label="Mass Number" value={massNumber} color="text-white" />
			</div>

			{/* Electron configuration */}
			<div className="text-sm border-t border-gray-700 pt-3">
				<span className="text-gray-400">Config: </span>
				<span className="font-mono text-cyan-300">{electronConfig}</span>
			</div>

			{/* Ionic charge */}
			<div className="text-sm">
				<span className="text-gray-400">Charge: </span>
				<span className={`font-semibold ${chargeColor}`}>
					{chargeSign} — {chargeLabel}
				</span>
			</div>

			{/* Current molecule */}
			<div className="text-sm border-t border-gray-700 pt-3">
				<div className="text-gray-400">Molecula atual:</div>
				{moleculeFormula ? (
					<div className="mt-1">
						<span className="font-mono text-emerald-300">{moleculeFormula}</span>
						<span className="text-gray-300"> — {moleculeName ?? 'Unknown'}</span>
					</div>
				) : (
					<div className="text-gray-500 mt-1">Nenhuma molecula detectada</div>
				)}
			</div>
		</div>
	);
};

export default InfoPanel;
