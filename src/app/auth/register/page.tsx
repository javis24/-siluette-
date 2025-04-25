'use client';

import { useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'secretary',
  });

  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('✅ Usuario registrado correctamente');
        setFormData({ name: '', email: '', password: '', role: 'secretary' });
      } else {
        const data = await res.json();
        setMessage(`❌ Error: ${data.message || 'No se pudo registrar el usuario'}`);
      }
    } catch  {
      setMessage('❌ Error de conexión');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Registro de Usuarios</h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 
              focus:bg-gray-600 focus:outline-none focus:ring-1 
              focus:ring-blue-500 transition ease-in-out duration-150"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 
              focus:bg-gray-600 focus:outline-none focus:ring-1 
              focus:ring-blue-500 transition ease-in-out duration-150"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 
              focus:bg-gray-600 focus:outline-none focus:ring-1 
              focus:ring-blue-500 transition ease-in-out duration-150"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 
              focus:bg-gray-600 focus:outline-none focus:ring-1 
              focus:ring-blue-500 transition ease-in-out duration-150"
          >
            <option value="secretary">Secretaria</option>
            <option value="admin">Administrador</option>
            <option value="client">Paciente</option>
          </select>

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold 
              py-2 px-4 rounded-md mt-4 hover:from-indigo-600 hover:to-blue-600 
              transition ease-in-out duration-150"
          >
            Registrar
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-blue-400">{message}</p>
        )}
      </div>
    </div>
  );
}
