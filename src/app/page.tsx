"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const CircuitViewer = dynamic(() => import('./components/CircuitViewer'), { ssr: false });

const circuits = [
    {
        name: 'Deutsch-Jozsa (Función Constante - Sin Medición)',
        circuit: {
            qubits: [{ id: 0 }, { id: 1 }],
            operations: [
                { gate: 'H', targets: [{ qId: 0 }] },
                { gate: 'X', targets: [{ qId: 1 }] },
                { gate: 'H', targets: [{ qId: 1 }] },
                { gate: 'H', targets: [{ qId: 0 }] },
            ],
        },
    },
    {
        name: 'Deutsch-Jozsa (Función Balanceada - Sin Medición)',
        circuit: {
            qubits: [{ id: 0 }, { id: 1 }],
            operations: [
                { gate: 'H', targets: [{ qId: 0 }] },
                { gate: 'X', targets: [{ qId: 1 }] },
                { gate: 'H', targets: [{ qId: 1 }] },
                { gate: 'CX', isControlled: true, controls: [{ qId: 0 }], targets: [{ qId: 1 }] },
                { gate: 'H', targets: [{ qId: 0 }] },
            ],
        },
    },
    {
        name: 'Bell State (Estado de Bell)',
        circuit: {
            qubits: [{ id: 0 }, { id: 1 }],
            operations: [
                { gate: 'H', targets: [{ qId: 0 }] },
                { gate: 'CX', isControlled: true, controls: [{ qId: 0 }], targets: [{ qId: 1 }] },
            ],
        },
    },
    {
        name: 'Swap Gate (Intercambio)',
        circuit: {
            qubits: [{ id: 0 }, { id: 1 }],
            operations: [
                { gate: 'SWAP', targets: [{ qId: 0 }, { qId: 1 }] },
            ],
        },
    },
    {
        name: 'Superposition (Superposición)',
        circuit: {
            qubits: [{ id: 0 }],
            operations: [
                { gate: 'H', targets: [{ qId: 0 }] },
            ],
        },
    },
    {
        name: 'Quantum NOT Gate (Puerta Cuántica NOT)',
        circuit: {
            qubits: [{ id: 0 }],
            operations: [
                { gate: 'X', targets: [{ qId: 0 }] },
            ],
        },
    },
    {
        name: 'Hadamard and CNOT',
        circuit: {
            qubits: [{ id: 0 }, { id: 1 }],
            operations: [
                { gate: 'H', targets: [{ qId: 0 }] },
                { gate: 'CX', isControlled: true, controls: [{ qId: 0 }], targets: [{ qId: 1 }] },
            ],
        },
    },
    {
        name: 'GHZ State (Estado GHZ)',
        circuit: {
            qubits: [{ id: 0 }, { id: 1 }, { id: 2 }],
            operations: [
                { gate: 'H', targets: [{ qId: 0 }] },
                { gate: 'CX', isControlled: true, controls: [{ qId: 0 }], targets: [{ qId: 1 }] },
                { gate: 'CX', isControlled: true, controls: [{ qId: 1 }], targets: [{ qId: 2 }] },
            ],
        },
    },
    {
        name: 'Quantum Fourier Transform (QFT)',
        circuit: {
            qubits: [{ id: 0 }, { id: 1 }, { id: 2 }],
            operations: [
                { gate: 'H', targets: [{ qId: 0 }] },
                { gate: 'CX', isControlled: true, controls: [{ qId: 0 }], targets: [{ qId: 1 }] },
                { gate: 'H', targets: [{ qId: 1 }] },
                { gate: 'CX', isControlled: true, controls: [{ qId: 1 }], targets: [{ qId: 2 }] },
                { gate: 'H', targets: [{ qId: 2 }] },
            ],
        },
    },
];

const Home: React.FC = () => {
  const [results, setResults] = useState<{ [key: string]: any }>({});

  const handleExecute = async (executionType: 'simulator' | 'physical', circuitName: string, circuit: object) => {
      try {
          const requestData = {
              classicalData: { values: [1, 2, 3], factor: 2 },
              quantumTask: {
                  taskId: circuitName,
                  circuit: circuit,
                  executionType: executionType,
              },
          };

          const response = await fetch('http://localhost:5000/hybrid/hybrid-operation', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData),
          });

          if (!response.ok) {
              throw new Error(`Error en la ejecución: ${response.statusText}`);
          }

          const result = await response.json();
          setResults((prevResults) => ({
              ...prevResults,
              [circuitName]: result,
          }));
      } catch (error) {
          console.error('Error ejecutando el circuito:', error);
          if (error instanceof Error) {
              alert('Error ejecutando el circuito cuántico: ' + error.message);
          } else {
              alert('Error ejecutando el circuito cuántico');
          }
      }
  };


  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Visualización de Circuitos Cuánticos</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Este proyecto permite visualizar y ejecutar circuitos cuánticos utilizando un simulador o hardware cuántico real. Cada circuito representa un algoritmo o operación específica dentro de la computación cuántica, diseñado para explorar sus funcionalidades y resultados.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {circuits.map((item, index) => (
                <div key={index} className="flex flex-col bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition transform hover:scale-105">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">{item.name}</h2>
                    <div className="mb-6 flex-1">
                        <CircuitViewer circuit={item.circuit} />
                    </div>
                    <div className="flex justify-between mt-auto">
                        <button
                            onClick={() => handleExecute('simulator', item.name, item.circuit)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition"
                        >
                            Simulador
                        </button>
                        <button
                            onClick={() => handleExecute('physical', item.name, item.circuit)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition"
                        >
                            Hardware
                        </button>
                    </div>
                    {results[item.name] && (
                        <div className="mt-6 bg-gray-100 rounded-lg p-4 overflow-hidden">
                            <h4 className="text-lg font-medium text-gray-800">Resultados:</h4>
                            <div className="mt-2 text-gray-600 overflow-x-auto">
                                <pre className="bg-gray-200 p-3 rounded-lg">{JSON.stringify(results[item.name].quantumResult.probabilities, null, 2)}</pre>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};


export default Home;
