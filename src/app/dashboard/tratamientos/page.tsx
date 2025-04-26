'use client';

import { useState } from 'react';
import TratamientosForm from '@/components/forms/TratamientosForm';

export default function RegistrarTratamientosPage() {
  const [pacienteUuid, setPacienteUuid] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Registrar Tratamientos</h1>

      {pacienteUuid ? (
        <TratamientosForm pacienteUuid={pacienteUuid} />
      ) : (
        <p className="text-gray-700 dark:text-white">Por favor selecciona un paciente.</p>
      )}
    </div>
  );
}
