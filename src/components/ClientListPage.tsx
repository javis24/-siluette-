'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  pacienteUuid?: string; // útil para redirigir a historial si es client
}

export default function ClientListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const pageSize = 10;

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    try {
      const parsed: User = JSON.parse(userData);

      if (parsed.role === 'client') {
        // Redirigir a historial si es client
        router.push(`/dashboard/historial/${parsed.pacienteUuid || parsed.id}`);
        return;
      }

      if (parsed.role === 'admin' || parsed.role === 'secretary') {
        setIsAuthorized(true);

        const fetchUsers = async () => {
          const res = await fetch('/api/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data: User[] = await res.json();
            const clients = data.filter((u) => u.role === 'client');
            setUsers(clients);
            setFilteredUsers(clients);
          }
        };

        fetchUsers();
      } else {
        router.push('/auth/login');
      }
    } catch (err) {
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (!isAuthorized) {
    return (
      <div className="p-6 text-center text-gray-700 dark:text-white">
        Verificando permisos...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Listado de Clientes</h1>

      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-sm p-2 rounded border dark:bg-gray-700 text-white"
      />
     <div className="grid grid-cols-1 md:grid-cols-3 font-semibold text-gray-700 dark:text-gray-200 border-b pb-2">
        <span>👤 Paciente</span>
        <span>📧 Correo</span>
        <span>🔍 Acción</span>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-600">
        {paginatedUsers.map((user) => (
          <li
            key={user.id}
            className="py-3 grid grid-cols-1 md:grid-cols-3 gap-2 items-center"
          >
            <span className="font-medium text-gray-800 dark:text-white">{user.name}</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
            <button
              onClick={() => router.push(`/dashboard/px/${user.id}`)}
              className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Ver perfil
            </button>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 pt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
