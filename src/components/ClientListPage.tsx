'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ClientListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const clients = data.filter((u: any) => u.role === 'client');
        setUsers(clients);
        setFilteredUsers(clients);
      }
    };

    fetchUsers();
  }, []);

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

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Listado de Clientes</h1>

      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
      />
               {/* Encabezado del listado */}
                    <div className="grid grid-cols-1 md:grid-cols-3 font-semibold text-gray-700 dark:text-gray-200 border-b pb-2">
                    <span>👤 Paciente</span>
                    <span>📧 Correo</span>
                    <span>🔍 Acción</span>
                    </div>

                    {/* Lista de usuarios paginados */}
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
      <div className="flex justify-center items-center gap-2 pt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 white:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 white:bg-gray-600 dark:hover:bg-gray-500 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
