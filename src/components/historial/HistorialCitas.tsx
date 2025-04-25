'use client';

import { useEffect, useState } from 'react';

interface Props {
  userId: string;
}

interface Cita {
  fecha: string;
  hora: string;
  descripcion?: string;
}

export default function HistorialCitas({ userId }: Props) {
  const [citas, setCitas] = useState<Cita[]>([]);

  useEffect(() => {
    const fetchCitas = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/citas?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const data = await res.json();
      setCitas(data || []);
    };

    fetchCitas();
  }, [userId]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white">📆 Citas Pasadas</h2>
      <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {citas.length > 0 ? (
          citas.map((cita, i) => (
            <li key={i}>
              {cita.fecha} a las {cita.hora} {cita.descripcion && `- ${cita.descripcion}`}
            </li>
          ))
        ) : (
          <li>No hay citas registradas</li>
        )}
      </ul>
    </div>
  );
}
