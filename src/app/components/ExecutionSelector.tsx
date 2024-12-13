// components/ExecutionSelector.tsx
import React from 'react';

interface ExecutionSelectorProps {
  onExecute: (executionType: 'simulator' | 'quantum') => void;
}

const ExecutionSelector: React.FC<ExecutionSelectorProps> = ({ onExecute }) => {
  return (
    <div>
      <button onClick={() => onExecute('simulator')}>Ejecutar en Simulador</button>
      <button onClick={() => onExecute('quantum')}>Ejecutar en Computadora Cuántica</button>
    </div>
  );
};

export default ExecutionSelector;
