'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import HistorialPacientes from '@/components/historial/HistorialPacientes';
import HistorialMetricas from '@/components/historial/HistorialMetricas';
import HistorialTratamientos from '@/components/historial/HistorialTratamientos';
import HistorialCitas from '@/components/historial/HistorialCitas';

import PacienteForm from '@/components/forms/PacienteForm';
import MetricasForm from '@/components/forms/MetricasForm';
import TratamientosForm from '@/components/forms/TratamientosForm';

import HistorialClinico  from '@/components/HistorialClinico';


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
}

export default function PerfilUsuarioPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [pacienteUuid, setPacienteUuid] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !id) return;
  
    const fetchData = async () => {
      try {
        const userRes = await fetch(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (!userRes.ok) {
          console.error('No se pudo obtener el usuario');
          return;
        }
    
        const userData = await userRes.json();
        setUser(userData);
    
        const pacienteRes = await fetch(`/api/pacientes/by-user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (pacienteRes.ok) {
          const paciente = await pacienteRes.json();
          if (paciente?.uuid) {
            setPacienteUuid(paciente.uuid);
          }
        }
      } catch  {
        console.error('Error cargando datos del perfil');
      }
    };
  
    fetchData();
  }, [id]);
  

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Perfil del Paciente</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setModalAbierto(true)} className="bg-blue-600 text-white hover:bg-blue-700">
          ➕ Agendar Cita
        </Button>
      </div>


      {user && (
        <div className="bg-gray-800 p-4 rounded shadow flex flex-wrap items-center gap-6 text-white font-bold text-lg">
        <p>👤 Nombre: <span className="ml-1 font-semibold">{user.name}</span></p>
        <p>📧 Email: <span className="ml-1 font-semibold">{user.email}</span></p>
      </div>
      
      )}

      {/* Mostrar formulario de paciente (lo creará si no existe) */}
      {id && (
        <PacienteForm
          defaultUserId={id.toString()}
          onPacienteCreado={(uuid) => setPacienteUuid(uuid)}
        />
      )}

      {/* Formularios de métricas y tratamientos si ya existe paciente */}
      {pacienteUuid && (
        <>
          <MetricasForm pacienteUuid={pacienteUuid} />
          <TratamientosForm pacienteUuid={pacienteUuid} />
        </>
      )}

      {/* Historial clínico completo */}
      {pacienteUuid && (
        <>
          <HistorialPacientes pacienteUuid={pacienteUuid} />
          <HistorialMetricas pacienteUuid={pacienteUuid} />
          <HistorialTratamientos pacienteUuid={pacienteUuid} />
        </>
      )}

      {id && <HistorialCitas userId={id.toString()} />}

      {pacienteUuid && user && (
    <HistorialClinico pacienteUuid={pacienteUuid} userId={user.uuid} />
  )}
       <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>🗓️ Agendar una nueva cita</DialogTitle>
            </DialogHeader>
            <CitaForm />
          </DialogContent>
        </Dialog>
    </div>    
  );
 
  
}
