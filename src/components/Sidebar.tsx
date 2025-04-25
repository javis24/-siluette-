'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  onToggle: () => void;
}

export default function Sidebar({ onToggle }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ Limpiar token
    router.push('/auth/login');            // 🔁 Redirigir a login
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 space-y-4 relative">
      <button
        onClick={onToggle}
        className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-6">Panel de Control</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">
          🏠 Inicio
        </Link>
        <Link href="/dashboard/citas" className="hover:bg-gray-700 p-2 rounded">
          📅 Agenda de Citas
        </Link>
        <Link href="/dashboard/pacientes" className="hover:bg-gray-700 p-2 rounded">
          👤 Registro de Pacientes
        </Link>
        <Link href="/dashboard/metricas" className="hover:bg-gray-700 p-2 rounded">
          📈 Métricas de Salud
        </Link>
        <Link href="/dashboard/tratamientos" className="hover:bg-gray-700 p-2 rounded">
          💆 Tratamientos Estéticos
        </Link>
        <Link href="/dashboard/reportes" className="hover:bg-gray-700 p-2 rounded">
          📊 Reportes
        </Link>
        <Link href="/dashboard/calendario" className="hover:bg-gray-700 p-2 rounded">
        🗓️ Agenda de Citas</Link>
      </nav>

      <div className="pt-6 border-t border-gray-600 mt-4">
        <button
          onClick={handleLogout}
          className="w-full text-left hover:bg-red-600 p-2 rounded transition bg-red-500"
        >
          🚪 Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
