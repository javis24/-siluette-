'use client';

import CitaForm from '@/components/forms/CitaForm';

export default function AgendarCitaPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Agendar Cita</h1>
      <CitaForm />
    </div>
  );
}
