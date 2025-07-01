'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import HistorialClinico from '@/components/HistorialClinico';
import PacienteForm from '@/components/forms/PacienteForm';
import MetricasForm from '@/components/forms/MetricasForm';
import TratamientosForm from '@/components/forms/TratamientosForm';
import HistorialCitas from '@/components/historial/HistorialCitas';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/buttons';
import CitaForm from '@/components/forms/CitaForm';

interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
}

export default function PerfilUsuarioPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [pacienteUuid, setPacienteUuid] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const [datosPaciente, setDatosPaciente] = useState<any>(null);
  const [datosMetricas, setDatosMetricas] = useState<any>(null);
  const [datosTratamientos, setDatosTratamientos] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !id) return;

    const fetchData = async () => {
      try {
        // Obtener usuario
        const userRes = await fetch(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) throw new Error('No se pudo obtener el usuario');

        const userData: User = await userRes.json();
        setUser(userData);

        // Obtener paciente por userId
        const pacienteRes = await fetch(`/api/pacientes/by-user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!pacienteRes.ok) return;

        const paciente = await pacienteRes.json();

        if (paciente?.uuid) {
          setPacienteUuid(paciente.uuid);
          setDatosPaciente(paciente); // Datos para <PacienteForm />

          // Obtener métricas
          const metricasRes = await fetch(`/api/metricas?uuid=${paciente.uuid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (metricasRes.ok) {
            const metricas = await metricasRes.json();
            setDatosMetricas(metricas);
          }

          // Obtener tratamientos
          const tratamientosRes = await fetch(`/api/tratamientos?uuid=${paciente.uuid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (tratamientosRes.ok) {
            const tratamientos = await tratamientosRes.json();
            setDatosTratamientos(tratamientos);
          }
        }
      } catch (err) {
        console.error('Error cargando datos del perfil:', err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">🧾 Perfil del Paciente</h1>
        <Button
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          ➕ Agendar Cita
        </Button>
      </div>

      {user && (
        <div className="bg-gray-800 p-4 rounded shadow text-white">
          <p>👤 <strong>Nombre:</strong> {user.name}</p>
          <p>📧 <strong>Email:</strong> {user.email}</p>
        </div>
      )}

      {/* Formulario del paciente */}
      {id && (
        <PacienteForm
          defaultUserId={id.toString()}
          defaultValues={datosPaciente}
          onPacienteCreado={(uuid) => setPacienteUuid(uuid)}
        />
      )}

      {/* Formularios métricas y tratamientos */}
      {pacienteUuid && (
        <>
          <MetricasForm pacienteUuid={pacienteUuid} defaultValues={datosMetricas} />
          <TratamientosForm pacienteUuid={pacienteUuid} defaultValues={datosTratamientos} />
        </>
      )}

      <hr className="border-t border-gray-600 my-4" />

      <h2 className="text-xl font-bold text-gray-700 dark:text-white">📘 Historial Clínico</h2>

      {pacienteUuid && user && (
        <HistorialClinico pacienteUuid={pacienteUuid} userId={user.uuid} />
      )}

      {id && <HistorialCitas userId={id.toString()} />}

      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>🗓️ Agendar una nueva cita</DialogTitle>
          </DialogHeader>
          <CitaForm userId={id?.toString()} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
