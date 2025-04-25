'use client';

import { useEffect, useState } from 'react';

interface CalendarioCitasProps {
  onAgendar?: () => void;
}

interface Cita {
  id: number;
  pacienteUuid: string;
  fecha: string;
  hora: string;
  servicio: string;
  comentario: string;
  user?: {
    name: string;
  };
}

export default function CalendarioCitas({ onAgendar }: CalendarioCitasProps) {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState('');

  const fetchCitas = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/api/citas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCitas(data);
      } else {
        setMessage('❌ Error al cargar citas');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error de red');
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const citasDelDia = citas.filter((cita) => cita.fecha === fechaActual);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">📆 Agenda de Citas</h2>

      <input
        type="date"
        value={fechaActual}
        onChange={(e) => setFechaActual(e.target.value)}
        className="input"
      />

      {citasDelDia.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No hay citas para esta fecha.</p>
      ) : (
        <ul className="space-y-2">
          {citasDelDia.map((cita) => (
            <li
              key={cita.id}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded border-l-4 border-blue-500"
            >
              <p><strong>👤 Paciente:</strong> {cita.user?.name || 'Desconocido'}</p>
              <p><strong>🕒 Hora:</strong> {cita.hora}</p>
              <p><strong>📌 Servicio:</strong> {cita.servicio || 'N/A'}</p>
              <p><strong>📝 Comentario:</strong> {cita.comentario || 'Sin comentario'}</p>
            </li>
          ))}
        </ul>
      )}

      {message && (
        <p className="text-center text-red-500">{message}</p>
      )}

      {/* Ejemplo para cerrar el modal manualmente */}
      {onAgendar && (
        <button
          className="mt-4 text-sm underline text-blue-500 hover:text-blue-700"
          onClick={onAgendar}
        >
          Cerrar
        </button>
      )}
    </div>
  );
}
