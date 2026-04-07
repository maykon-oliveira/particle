import './index.css';
import { useState } from 'react';
import { useAtomState } from './hooks/useAtomState';
import { useMoleculeState } from './hooks/useMoleculeState';
import { useMoleculeDetection } from './hooks/useMoleculeDetection';
import type { AtomType } from './types/molecule';
import AtomCanvas from './components/AtomCanvas';
import MoleculeCanvas from './components/MoleculeCanvas';
import Controls from './components/Controls';
import InfoPanel from './components/InfoPanel';

export function App() {
  const [selectedAtomType, setSelectedAtomType] = useState<AtomType>('H');
  const {
    protons,
    neutrons,
    electrons,
    decaying,
    addProton,
    addNeutron,
    addElectron,
    removeElectron,
    decay,
    reset,
  } = useAtomState();

  const {
    atoms,
    bonds,
    candidateAtomIds,
    addAtom,
    moveAtom,
    resetMolecules,
  } = useMoleculeState();
  const { currentMolecule } = useMoleculeDetection(atoms, bonds);

  return (
    <div className="min-h-screen bg-[#080818] text-white flex flex-col items-center px-4 py-8 gap-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-cyan-300">
          ⚛ Atom Simulator
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Interactive Bohr model — elements 1–20
        </p>
      </header>

      {/* Atomic simulator (existing functionality preserved) */}
      <main className="flex flex-col lg:flex-row gap-8 items-center lg:items-start w-full max-w-4xl">
        {/* Atom canvas */}
        <div className="flex-1 flex justify-center w-full">
          <AtomCanvas
            protons={protons}
            neutrons={neutrons}
            electrons={electrons}
            decaying={decaying}
          />
        </div>

        {/* Info panel + controls */}
        <div className="flex flex-col gap-4 w-full lg:w-64 shrink-0">
          <InfoPanel
            protons={protons}
            neutrons={neutrons}
            electrons={electrons}
            moleculeFormula={currentMolecule?.formula}
            moleculeName={currentMolecule?.name}
          />
          <Controls
            protons={protons}
            neutrons={neutrons}
            electrons={electrons}
            onAddProton={addProton}
            onAddNeutron={addNeutron}
            onAddElectron={addElectron}
            onRemoveElectron={removeElectron}
            onDecay={decay}
            onReset={reset}
            onSelectAtomType={setSelectedAtomType}
            selectedAtomType={selectedAtomType}
            onAddMoleculeAtom={() => addAtom(selectedAtomType)}
            onResetMolecules={resetMolecules}
          />
        </div>
      </main>

      <section className="w-full max-w-4xl">
        <MoleculeCanvas
          atoms={atoms}
          bonds={bonds}
          candidateAtomIds={candidateAtomIds}
          onMoveAtom={moveAtom}
        />
      </section>
    </div>
  );
}

export default App;
