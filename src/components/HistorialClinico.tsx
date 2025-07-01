'use client';

import { useEffect, useState, useCallback } from 'react';
import { CalendarDays, HeartPulse, UserRound, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
  pacienteUuid: string;
  userId?: string;
}

interface BaseHistorial {
  updatedAt: string;
  [key: string]: unknown;
}

interface Cita {
  fecha: string;
  [key: string]: unknown;
}

interface HistorialEntry {
  tipo: string;
  fecha: string;
  data: BaseHistorial | Cita;
}

export default function HistorialClinico({ pacienteUuid, userId }: Props) {
  const [historial, setHistorial] = useState<HistorialEntry[]>([]);
  const [filtroFecha, setFiltroFecha] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchHistorial = async () => {
      try {
        const endpoints = [
          fetch(`/api/pacientes/${pacienteUuid}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`/api/metricas?uuid=${pacienteUuid}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`/api/tratamientos?uuid=${pacienteUuid}`, { headers: { Authorization: `Bearer ${token}` } }),
        ];
        if (userId) {
          endpoints.push(
            fetch(`/api/citas?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } })
          );
        }

        const responses = await Promise.all(endpoints);
        const jsons = await Promise.all(responses.map(r => r.json()));

        const data: HistorialEntry[] = [];
        const [paciente, metricas, tratamientos, citas] = jsons as [
          BaseHistorial,
          BaseHistorial,
          BaseHistorial,
          Cita[]?
        ];

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
          citas.forEach(cita =>
            data.push({ tipo: 'Cita', fecha: cita.fecha, data: cita })
          );
        }

        data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        setHistorial(data);
      } catch (error) {
        console.error('Error al cargar historial clínico', error);
      }
    };

    fetchHistorial();
  }, [pacienteUuid, userId]);

  const traducirCampo = (campo: string) => {
    const mapa: Record<string, string> = {
      name: 'Nombre',
      email: 'Correo',
      phoneNumber: 'Teléfono',
      address: 'Dirección',
      age: 'Edad',
      height: 'Altura',
      evaluationDate: 'Fecha de evaluación',
      unwantedGain: 'Aumento no deseado',
      pathologies: 'Patologías',
      weight: 'Peso',
      fatPercentage: '% Grasa',
      muscleKg: 'Músculo (kg)',
      bodyWater: 'Agua corporal',
      phy: 'pH',
      metabolicAge: 'Edad metabólica',
      heartRate: 'Latidos/min',
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
      lipoLaser: 'Lipo láser',
      vacuum: 'Vacuum',
      gluteCups: 'Copas glúteo',
      woodTherapy: 'Maderoterapia',
      lymphaticDrainage: 'Drenaje linfático',
      detox: 'Detox',
      mesotherapy: 'Mesoterapia',
      passiveGym: 'Gimnasia pasiva',
      fecha: 'Fecha de cita',
      motivo: 'Motivo',
      comentario: 'Comentario'
    };
    return mapa[campo] || campo;
  };

  const exportarPDF = useCallback(() => {
    const doc = new jsPDF({ unit: 'pt' });
    doc.text('Historial Clínico', 40, 50);
    let y = 70;

    historial.forEach(entry => {
      doc.setFontSize(14);
      doc.text(entry.tipo, 40, y);
      y += 20;

      const rows = Object.entries(entry.data)
        .filter(([k]) => !['uuid', 'id', 'userId', 'createdAt', 'updatedAt'].includes(k))
        .map(([k, v]) => [traducirCampo(k), String(v)]);

      autoTable(doc, {
        startY: y,
        head: [['Campo', 'Valor']],
        body: rows,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] },
        margin: { left: 40, right: 40 }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      y = (doc as any).lastAutoTable.finalY + 30;
    });

    doc.save(`historial_${pacienteUuid}.pdf`);
  }, [historial, pacienteUuid]);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📘 Historial Clínico</h2>
        <button
          onClick={exportarPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          📄 Exportar a PDF
        </button>
        <div className="flex items-center gap-4 mb-6">
          <label className="text-white">Filtrar por fecha:</label>
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="px-2 py-1 rounded border bg-amber-50"
          />
        </div>
      </div>

      {historial.length === 0 && (
        <p className="text-gray-500">No hay historial disponible.</p>
      )}

      {historial
        .filter(entry => {
          if (!filtroFecha) return true;
          const fechaEntry = new Date(entry.fecha).toISOString().slice(0, 10);
          return fechaEntry === filtroFecha;
        })
        .map((entry, i) => (
          <div key={i} className="mb-6 bg-gray-950 p-4 rounded shadow">
            <div className="flex items-center mb-2 text-amber-50">
              {entry.tipo === 'Datos del Paciente' && <UserRound className="mr-2" />}
              {entry.tipo === 'Métricas de Salud' && <HeartPulse className="mr-2" />}
              {entry.tipo === 'Tratamientos Estéticos' && <FileText className="mr-2" />}
              {entry.tipo === 'Cita' && <CalendarDays className="mr-2" />}
              <h3 className="text-lg font-semibold">{entry.tipo}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Última actualización: {new Date(entry.fecha).toLocaleString()}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(entry.data)
                .filter(([k]) => !['uuid', 'id', 'userId', 'createdAt', 'updatedAt'].includes(k))
                .map(([k, v]) => (
                  <div key={k} className="p-2 bg-white rounded border">
                    <div className="text-xs text-blue-600 font-medium">
                      {traducirCampo(k)}
                    </div>
                    <div className="text-sm">{String(v)}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
