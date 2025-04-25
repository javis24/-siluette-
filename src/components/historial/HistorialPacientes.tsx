'use client';

import { useEffect, useState } from 'react';

interface Props {
  pacienteUuid: string;
}

export default function HistorialPacientes({ pacienteUuid }: Props) {
  const [creado, setCreado] = useState<string | null>(null);
  const [actualizado, setActualizado] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/pacientes/${pacienteUuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const data = await res.json();
      setCreado(new Date(data.createdAt).toLocaleString());
      setActualizado(new Date(data.updatedAt).toLocaleString());
    };

    fetchPaciente();
  }, [pacienteUuid]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white">📋 Historial del Paciente</h2>
      <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        <li><strong>Fecha de creación:</strong> {creado || 'Sin datos'}</li>
        <li><strong>Última actualización:</strong> {actualizado || 'Sin datos'}</li>
      </ul>
    </div>
  );
}
