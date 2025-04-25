'use client';

import { useEffect, useState } from 'react';

interface Props {
  pacienteUuid: string;
}

export default function HistorialMetricas({ pacienteUuid }: Props) {
  const [fechas, setFechas] = useState<string[]>([]);

  useEffect(() => {
    const fetchMetricas = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/metricas?uuid=${pacienteUuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const data = await res.json();
      if (Array.isArray(data)) {
        const fechas = data.map((item) => new Date(item.updatedAt).toLocaleString());
        setFechas(fechas);
      } else if (data?.updatedAt) {
        setFechas([new Date(data.updatedAt).toLocaleString()]);
      }
    };

    fetchMetricas();
  }, [pacienteUuid]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white">📅 Historial de Métricas</h2>
      <ul className="list-disc list-inside mt-2 text-sm text-gray-700 dark:text-gray-300">
        {fechas.length > 0 ? (
          fechas.map((fecha, i) => <li key={i}>Actualizado: {fecha}</li>)
        ) : (
          <li>No hay métricas registradas</li>
        )}
      </ul>
    </div>
  );
}
