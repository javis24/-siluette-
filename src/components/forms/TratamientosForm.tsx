'use client';

import { useState } from 'react';

interface Props {
  pacienteUuid: string;
  defaultValues?: Partial<FormDataType>;
}

interface FormDataType {
  cavitation: string;
  radioFrequency: string;
  lipoLaser: string;
  vacuum: string;
  gluteCups: string;
  woodTherapy: string;
  lymphaticDrainage: string;
  detox: string;
  mesotherapy: string;
  passiveGym: string;
}

// ✅ Valores por defecto en constante aparte
const formDefaults: FormDataType = {
  cavitation: '',
  radioFrequency: '',
  lipoLaser: '',
  vacuum: '',
  gluteCups: '',
  woodTherapy: '',
  lymphaticDrainage: '',
  detox: '',
  mesotherapy: '',
  passiveGym: ''
};

export default function TratamientosForm({ pacienteUuid, defaultValues }: Props) {
  const [formData, setFormData] = useState<FormDataType>({
    ...formDefaults,
    ...(defaultValues || {}) // ✅ usa defaultValues solo si existen
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/api/tratamientos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, pacienteId: pacienteUuid }),
      });

      if (res.ok) {
        setMessage('✅ Tratamientos guardados');
        setFormData(formDefaults); // ✅ reinicia con los valores por defecto
      } else {
        setMessage('❌ Error al guardar tratamientos');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error de red');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-6 rounded shadow-md">
      <h2 className="col-span-full text-xl font-bold text-gray-800 dark:text-white">Tratamientos Estéticos</h2>

      {Object.entries(formData).map(([name, value]) => (
        <input
          key={name}
          type="number"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={name}
          className="input"
        />
      ))}

      <div className="col-span-full flex gap-2 justify-end">
        <button type="submit" className="btn">Guardar</button>
        <button type="reset" className="btn-secondary">Cancelar</button>
      </div>
      {message && <p className="col-span-full text-center text-sm text-blue-500">{message}</p>}
    </form>
  );
}
