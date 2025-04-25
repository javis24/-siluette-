'use client';

import { useState, useEffect } from 'react';

interface Props {
  onCitaCreada?: () => void;
  userId?: string;
}

interface FormData {
  userId: string;
  fecha: string;
  hora: string;
  comentario: string;
  servicio: string;
}

interface User {
  id: string;
  name: string;
  role: string;
}

export default function CitaForm({ onCitaCreada, userId }: Props) {
  const [formData, setFormData] = useState<FormData>({
    userId: userId || '',
    fecha: '',
    hora: '',
    comentario: '',
    servicio: '',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');

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
        const data: User[] = await res.json();
        const clientsOnly = data.filter((user) => user.role === 'client');
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

  const handleUserSelect = (user: User) => {
    setSearchTerm(user.name);
    setFilteredUsers([]);
    setFormData((prev) => ({ ...prev, userId: user.id }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token || !formData.userId) {
      setMessage('❌ Falta paciente o no autenticado');
      return;
    }

    try {
      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Cita creada');
        setFormData({
          userId: userId || '',
          fecha: '',
          hora: '',
          comentario: '',
          servicio: '',
        });
        setSearchTerm('');
        if (onCitaCreada) onCitaCreada();
      } else {
        setMessage(`❌ ${data.error || 'No se pudo crear la cita'}`);
      }
    } catch {
      setMessage('❌ Error de red');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Crear Nueva Cita
      </h2>

      {!userId && (
        <div className="mb-4 relative">
          <label className="block mb-2 text-gray-700 dark:text-gray-200">
            Buscar paciente:
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Escribe el nombre del paciente"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto dark:bg-gray-800 dark:border-gray-600">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        className="input w-full"
        required
      />

      <input
        type="time"
        name="hora"
        value={formData.hora}
        onChange={handleChange}
        className="input w-full"
        required
      />

      <input
        type="text"
        name="servicio"
        placeholder="Tipo de servicio (opcional)"
        value={formData.servicio}
        onChange={handleChange}
        className="input w-full"
      />

      <textarea
        name="comentario"
        placeholder="Comentario (opcional)"
        value={formData.comentario}
        onChange={handleChange}
        className="textarea w-full"
      />

      <div className="flex justify-end gap-2">
        <button type="submit" className="btn">Guardar</button>
        <button type="reset" className="btn-secondary">Cancelar</button>
      </div>

      {message && (
        <p className="text-sm text-center text-blue-500">{message}</p>
      )}
    </form>
  );
}
