import type { FC } from 'react';
import type { AtomType } from '../types/molecule';

interface Props {
	protons: number;
	neutrons: number;
	electrons: number;
	onAddProton: () => void;
	onAddNeutron: () => void;
	onAddElectron: () => void;
	onRemoveElectron: () => void;
	onDecay: () => void;
	onReset: () => void;
	selectedAtomType?: AtomType;
	onSelectAtomType?: (type: AtomType) => void;
	onAddMoleculeAtom?: () => void;
	onResetMolecules?: () => void;
}

type Variant = 'primary' | 'danger' | 'secondary';

interface ButtonConfig {
	label: string;
	onClick: () => void;
	disabled?: boolean;
	variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
	primary: 'bg-indigo-700 hover:bg-indigo-600 text-white',
	danger: 'bg-orange-700 hover:bg-orange-600 text-white',
	secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200',
};

/** Particle control panel — all action callbacks come from useAtomState via App. */
const Controls: FC<Props> = ({
	protons,
	neutrons,
	electrons,
	onAddProton,
	onAddNeutron,
	onAddElectron,
	onRemoveElectron,
	onDecay,
	onReset,
	selectedAtomType,
	onSelectAtomType,
	onAddMoleculeAtom,
	onResetMolecules,
}) => {
	const buttons: ButtonConfig[] = [
		{
			label: '➕ Proton',
			onClick: onAddProton,
			disabled: protons >= 20,
			variant: 'primary',
		},
		{
			label: '➕ Neutron',
			onClick: onAddNeutron,
			variant: 'primary',
		},
		{
			label: '➕ Electron',
			onClick: onAddElectron,
			variant: 'primary',
		},
		{
			label: '➖ Electron',
			onClick: onRemoveElectron,
			disabled: electrons <= 0,
			variant: 'primary',
		},
		{
			label: '☢️ Decay',
			onClick: onDecay,
			// Disabled when protons ≤ 1 or no neutrons to remove
			disabled: protons <= 1 || neutrons <= 0,
			variant: 'danger',
		},
		{
			label: '↺ Reset',
			onClick: onReset,
			variant: 'secondary',
		},
	];

	return (
		<div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
			<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
				Controls
			</h2>
			<div className="grid grid-cols-2 gap-2">
				{buttons.map(({ label, onClick, disabled = false, variant = 'primary' }) => (
					<button
						key={label}
						onClick={onClick}
						disabled={disabled}
						className={[
							'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-100',
							'active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
							VARIANT_CLASSES[variant],
							disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
						]
							.filter(Boolean)
							.join(' ')}
					>
						{label}
					</button>
				))}
			</div>

			{onAddMoleculeAtom && onSelectAtomType && selectedAtomType && (
				<>
					<div className="h-px bg-gray-700 my-3" />
					<h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
						Molecule Builder
					</h3>
					<div className="grid grid-cols-4 gap-2 mb-2">
						{(['H', 'O', 'N', 'C'] as AtomType[]).map(type => (
							<button
								key={type}
								onClick={() => onSelectAtomType(type)}
								className={[
									'px-2 py-2 rounded-lg text-sm font-semibold border transition-colors',
									selectedAtomType === type
										? 'bg-cyan-700 border-cyan-500 text-white'
										: 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700',
								].join(' ')}
							>
								{type}
							</button>
						))}
					</div>
					<div className="grid grid-cols-2 gap-2">
						<button
							onClick={onAddMoleculeAtom}
							className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
						>
							Adicionar atomo
						</button>
						<button
							onClick={onResetMolecules}
							className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
						>
							Reset moleculas
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Controls;
