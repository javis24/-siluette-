'use client';

import { useEffect, useState } from 'react';
import PacienteForm from '@/components/forms/PacienteForm';
import MetricasForm from '@/components/forms/MetricasForm';
import TratamientosForm from '@/components/forms/TratamientosForm';

import HistorialPacientes from '@/components/historial/HistorialPacientes';
import HistorialMetricas from '@/components/historial/HistorialMetricas';
import HistorialTratamientos from '@/components/historial/HistorialTratamientos';
import HistorialCitas from '@/components/historial/HistorialCitas';



import ExportarPDF from '@/components/ExportarPDF';

export default function PacienteManagerPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [pacienteUuid, setPacienteUuid] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const clientsOnly = data.filter((user: any) => user.role === 'client');
        setUsers(clientsOnly);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserSelect = async (user: any) => {
    setSearchTerm(user.name);
    setFilteredUsers([]);
    setUserId(user.id);
    setPacienteUuid('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/pacientes/by-user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const paciente = await res.json();
        if (paciente?.uuid) {
          setPacienteUuid(paciente.uuid);
        }
      }
    } catch (error) {
      console.error('Error al buscar paciente existente', error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestión de Pacientes</h1>

      {/* Autocompletado de usuarios */}
      <div className="mb-4 relative">
        <label className="block mb-2 text-gray-700 dark:text-gray-200">Buscar usuario:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Escribe el nombre del usuario"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
        />
        {filteredUsers.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto dark:bg-gray-800 dark:border-gray-600">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer dark:text-white"
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formularios */}
      {userId && (
        <div className="space-y-4">
          <details className="bg-white dark:bg-gray-800 p-4 rounded shadow" open>
            <summary className="cursor-pointer font-semibold text-lg text-gray-800 dark:text-white">
              🧍 Registrar Paciente para este usuario
            </summary>
            <div className="mt-4">
              <PacienteForm
                onPacienteCreado={(uuid) => setPacienteUuid(uuid)}
                defaultUserId={userId}
              />
            </div>
          </details>

          {pacienteUuid && (
            <>
              <details className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <summary className="cursor-pointer font-semibold text-lg text-gray-800 dark:text-white">
                  📈 Métricas de Salud
                </summary>
                <div className="mt-4">
                  <MetricasForm pacienteUuid={pacienteUuid} />
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <summary className="cursor-pointer font-semibold text-lg text-gray-800 dark:text-white">
                  💆 Tratamientos Estéticos
                </summary>
                <div className="mt-4">
                  <TratamientosForm pacienteUuid={pacienteUuid} />
                </div>
              </details>
            </>
          )}
        </div>
      )}
      {pacienteUuid && (
  <>
    <ExportarPDF pacienteUuid={pacienteUuid} />
    {pacienteUuid && (
  <>
    <HistorialPacientes pacienteUuid={pacienteUuid} />
    <HistorialMetricas pacienteUuid={pacienteUuid} />
    <HistorialTratamientos pacienteUuid={pacienteUuid} />
  </>
)}

{userId && (
  <HistorialCitas userId={userId} />
)}

    
  </>
  
)}

    </div>
  );
}
