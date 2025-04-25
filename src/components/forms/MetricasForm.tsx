'use client';

import { useState } from 'react';

interface Props {
  pacienteUuid: string;
}

interface Metricas {
  weight: string;
  fatPercentage: string;
  muscleKg: string;
  bodyWater: string;
  phy: string;
  metabolicAge: string;
  heartRate: string;
  visceralFat: string;
  bmi: string;
  hip: string;
  thighs: string;
  arms: string;
  chest: string;
  waist: string;
  abdomen: string;
  kcla: string;
}

export default function MetricasForm({ pacienteUuid }: Props) {
  const [formData, setFormData] = useState<Metricas>({
    weight: '',
    fatPercentage: '',
    muscleKg: '',
    bodyWater: '',
    phy: '',
    metabolicAge: '',
    heartRate: '',
    visceralFat: '',
    bmi: '',
    hip: '',
    thighs: '',
    arms: '',
    chest: '',
    waist: '',
    abdomen: '',
    kcla: '',
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
      const res = await fetch('/api/metricas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, pacienteUuid }),
      });

      if (res.ok) {
        setMessage('✅ Métricas registradas');
        setFormData({
          weight: '',
          fatPercentage: '',
          muscleKg: '',
          bodyWater: '',
          phy: '',
          metabolicAge: '',
          heartRate: '',
          visceralFat: '',
          bmi: '',
          hip: '',
          thighs: '',
          arms: '',
          chest: '',
          waist: '',
          abdomen: '',
          kcla: '',
        });
      } else {
        setMessage('❌ Error al guardar métricas');
      }
    } catch {
      setMessage('❌ Error de red');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-6 rounded shadow-md"
    >
      <h2 className="col-span-full text-xl font-bold text-gray-800 dark:text-white">Métricas de Salud</h2>

      {Object.entries(formData).map(([name, value]) => (
        <input
          key={name}
          type="number"
          step="0.1"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
          className="input"
        />
      ))}

      <div className="col-span-full flex gap-2 justify-end">
        <button type="submit" className="btn">Guardar</button>
        <button type="reset" className="btn-secondary">Cancelar</button>
      </div>

      {message && (
        <p className="col-span-full text-center text-sm text-blue-500">{message}</p>
      )}
    </form>
  );
}
