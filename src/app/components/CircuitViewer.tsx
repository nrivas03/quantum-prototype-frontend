// components/CircuitViewer.tsx
"use client";

import React, { useEffect, useRef } from 'react';

interface CircuitViewerProps {
  circuit: object;
}

const CircuitViewer: React.FC<CircuitViewerProps> = ({ circuit }) => {
  const vizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifica que estamos en el cliente y que qviz está disponible
    const loadQviz = async () => {
      const qvizModule = await import('@microsoft/quantum-viz.js');
      
      console.log('Contenido de qvizModule:', qvizModule);

      // Asegúrate de que qvizModule tiene draw y STYLES
      const qviz = (qvizModule as any).default || qvizModule;

      if (vizRef.current && qviz.draw && qviz.STYLES) {
        qviz.draw(circuit, vizRef.current, qviz.STYLES['Default']);
      } else {
        console.error('No se encontraron las propiedades "draw" o "STYLES" en qviz.');
      }
    };
    
    loadQviz();
  }, [circuit]);

  return <div ref={vizRef} />;
};

export default CircuitViewer;
