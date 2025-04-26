'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Principal</h1>
      <ul className="space-y-2">
        <li><Link href="/dashboard/pacientes" className="text-blue-500 hover:underline">Gestionar Pacientes</Link></li>
        <li><Link href="/dashboard/metricas" className="text-blue-500 hover:underline">Registrar Métricas</Link></li>
        <li><Link href="/dashboard/tratamientos" className="text-blue-500 hover:underline">Registrar Tratamientos</Link></li>
        <li><Link href="/dashboard/citas" className="text-blue-500 hover:underline">Agendar Cita</Link></li>
      </ul>
    </div>
  );
}
