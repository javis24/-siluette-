'use client';

import { useState } from 'react';

interface Props {
  onPacienteCreado?: (uuid: string) => void;
  defaultUserId?: string;
}

interface PacienteData {
  name: string;
  email: string;
  phoneNumber: string;
  age: string;
  height: string;
  evaluationDate: string;
  unwantedGain: string;
  address: string;
  pathologies: string;
  userId: number | '';
}

export default function PacienteForm({ onPacienteCreado, defaultUserId }: Props) {
  const [formData, setFormData] = useState<PacienteData>({
    name: '',
    email: '',
    phoneNumber: '',
    age: '',
    height: '',
    evaluationDate: '',
    unwantedGain: '',
    address: '',
    pathologies: '',
    userId: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, userId: Number(defaultUserId) }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage('✅ Paciente creado con éxito');
        if (onPacienteCreado) onPacienteCreado(data.uuid);
      } else {
        const errorData = await res.json();
        setMessage(`❌ Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error al guardar paciente');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-6 rounded shadow-md"
    >
      <h2 className="col-span-full text-xl font-bold text-gray-800 dark:text-white">
        Registrar Paciente
      </h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre completo"
        className="input"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
        className="input"
      />
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Teléfono"
        className="input"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Edad"
        className="input"
      />
      <input
        type="number"
        name="height"
        step="0.01"
        value={formData.height}
        onChange={handleChange}
        placeholder="Altura (m)"
        className="input"
      />
      <input
        type="date"
        name="evaluationDate"
        value={formData.evaluationDate}
        onChange={handleChange}
        placeholder="Fecha de evaluación"
        className="input"
      />
      <input
        type="text"
        name="unwantedGain"
        value={formData.unwantedGain}
        onChange={handleChange}
        placeholder="Aumento no deseado"
        className="input"
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Dirección"
        className="input"
      />
      <textarea
        name="pathologies"
        value={formData.pathologies}
        onChange={handleChange}
        placeholder="Patologías"
        className="textarea md:col-span-2"
      />

      <div className="col-span-full flex gap-2 justify-end">
        <button type="submit" className="btn">
          Guardar
        </button>
        <button type="reset" className="btn-secondary">
          Cancelar
        </button>
      </div>

      {message && (
        <p className="col-span-full text-center mt-4 text-sm text-blue-500">
          {message}
        </p>
      )}
    </form>
  );
}
