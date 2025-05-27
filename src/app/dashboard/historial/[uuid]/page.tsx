'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import HistorialClinico from '@/components/HistorialClinico';

export default function HistorialPacientePage() {
  const { uuid } = useParams();
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserId(parsed.id?.toString() || '');
      } catch (error) {
        console.error('Error leyendo user desde localStorage:', error);
      }
    }
  }, []);

  if (!uuid) {
    return <p className="text-center text-gray-700 dark:text-white">Cargando historial...</p>;
  }

  return (
    <div className="p-6">
     
      <HistorialClinico pacienteUuid={uuid.toString()} userId={userId} />
    </div>
  );
}
