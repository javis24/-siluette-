'use client';

import { useEffect, useState } from 'react';

interface Props {
  pacienteUuid: string;
}

export default function HistorialTratamientos({ pacienteUuid }: Props) {
  const [fecha, setFecha] = useState<string | null>(null);

  useEffect(() => {
    const fetchTratamientos = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/tratamientos?uuid=${pacienteUuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const data = await res.json();
      if (data?.updatedAt) {
        setFecha(new Date(data.updatedAt).toLocaleString());
      }
    };

    fetchTratamientos();
  }, [pacienteUuid]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white">🧾 Tratamientos registrados</h2>
      {fecha ? (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Última actualización: {fecha}
        </p>
      ) : (
        <p className="mt-2 text-sm text-gray-500">No hay tratamientos registrados.</p>
      )}
    </div>
  );
}
