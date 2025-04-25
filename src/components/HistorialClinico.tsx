'use client';

import { useEffect, useState } from 'react';

interface Props {
  pacienteUuid: string;
  userId: string;
}

interface HistorialEntry {
  tipo: string;
  fecha: string;
  data: Record<string, any>;
}

export default function HistorialClinico({ pacienteUuid, userId }: Props) {
  const [historial, setHistorial] = useState<HistorialEntry[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchHistorial = async () => {
      try {
        const [pacienteRes, metricasRes, tratamientosRes, citasRes] = await Promise.all([
          fetch(`/api/pacientes/${pacienteUuid}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`/api/metricas?uuid=${pacienteUuid}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`/api/tratamientos?uuid=${pacienteUuid}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`/api/citas?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const [paciente, metricas, tratamientos, citas] = await Promise.all([
          pacienteRes.json(),
          metricasRes.json(),
          tratamientosRes.json(),
          citasRes.json(),
        ]);

        const data: HistorialEntry[] = [];

        if (paciente) {
          data.push({ tipo: 'Datos del Paciente', fecha: paciente.updatedAt, data: paciente });
        }
        if (metricas) {
          data.push({ tipo: 'Métricas de Salud', fecha: metricas.updatedAt, data: metricas });
        }
        if (tratamientos) {
          data.push({ tipo: 'Tratamientos Estéticos', fecha: tratamientos.updatedAt, data: tratamientos });
        }
        if (Array.isArray(citas)) {
          citas.forEach((cita: Record<string, any>) => {
            data.push({ tipo: 'Cita', fecha: cita.fecha, data: cita });
          });
        }

        const ordenado = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        setHistorial(ordenado);
      } catch (error) {
        console.error('Error al cargar historial clínico', error);
      }
    };

    fetchHistorial();
  }, [pacienteUuid, userId]);

  const traducirCampo = (campo: string): string => {
    const mapa: Record<string, string> = {
      name: 'Nombre',
      email: 'Correo',
      phoneNumber: 'Teléfono',
      address: 'Dirección',
      age: 'Edad',
      height: 'Altura',
      evaluationDate: 'Fecha de Evaluación',
      unwantedGain: 'Aumento no deseado',
      pathologies: 'Patologías',
      weight: 'Peso',
      fatPercentage: '% de grasa',
      muscleKg: 'Kg de músculo',
      bodyWater: 'Agua corporal',
      phy: 'PH',
      metabolicAge: 'Edad metabólica',
      heartRate: 'Ritmo cardiaco',
      visceralFat: 'Grasa visceral',
      bmi: 'IMC',
      hip: 'Cadera',
      thighs: 'Muslos',
      arms: 'Brazos',
      chest: 'Pecho',
      waist: 'Cintura',
      abdomen: 'Abdomen',
      kcla: 'Kcal estimadas',
      cavitation: 'Cavitación',
      radioFrequency: 'Radiofrecuencia',
      lipoLaser: 'Lipo Láser',
      vacuum: 'Vacuum',
      gluteCups: 'Copas Glúteo',
      woodTherapy: 'Maderoterapia',
      lymphaticDrainage: 'Drenaje linfático',
      detox: 'Detox',
      mesotherapy: 'Mesoterapia',
      passiveGym: 'Gimnasia pasiva',
      fecha: 'Fecha de cita',
      motivo: 'Motivo',
      notas: 'Notas',
    };

    return mapa[campo] || campo;
  };

  const filtrarCampos = (obj: Record<string, any>) => {
    const excluidos = ['uuid', 'id', 'userId', 'createdAt', 'updatedAt'];
    return Object.entries(obj)
      .filter(([key]) => !excluidos.includes(key))
      .map(([key, val]) => (
        <li key={key}>
          <strong>{traducirCampo(key)}:</strong> {String(val)}
        </li>
      ));
  };

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-bold text-white">📜 Historial Clínico</h2>
      {historial.length === 0 && <p className="text-white">No hay historial disponible.</p>}

      {historial.map((entry, idx) => (
        <div key={idx} className="bg-gray-800 p-4 rounded shadow text-white">
          <p className="text-sm text-gray-400 mb-1">🕒 {new Date(entry.fecha).toLocaleString()}</p>
          <p className="font-bold text-lg mb-2">{entry.tipo}</p>
          <ul className="list-disc list-inside space-y-1">
            {filtrarCampos(entry.data)}
          </ul>
        </div>
      ))}
    </div>
  );
}
