'use client';

import { useState } from 'react';
import MetricasForm from '@/components/forms/MetricasForm';

export default function RegistrarMetricasPage() {
  const [pacienteUuid, setPacienteUuid] = useState<string | null>('aqui-un-uuid-temporal');

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Registrar Métricas</h1>

      {pacienteUuid ? (
        <MetricasForm pacienteUuid={pacienteUuid} />
      ) : (
        <p className="text-gray-700 dark:text-white">
          Selecciona un paciente para registrar métricas.
        </p>
      )}
    </div>
  );
}
