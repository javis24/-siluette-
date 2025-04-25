'use client';

import DashboardCard from '@/components/DashboardCard';

export default function DashboardHome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
      <DashboardCard title="Pacientes" icon="👤" href="/dashboard/pacientes" />
      <DashboardCard title="Citas" icon="📅" href="/dashboard/citas" />
      <DashboardCard title="Tratamientos" icon="💆" href="/dashboard/tratamientos" />
      <DashboardCard title="Reportes" icon="📊" href="/dashboard/reportes" />
    </div>
  );
}
