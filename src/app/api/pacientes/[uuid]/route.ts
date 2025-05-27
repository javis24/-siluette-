// src/app/api/pacientes/[uuid]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Paciente from '@/models/Paciente';

export async function GET(req: NextRequest) {
  try {
    
    const { pathname } = new URL(req.url);
    const parts = pathname.split('/');
    const uuid = parts[parts.length - 1];

    if (!uuid) {
      return NextResponse.json({ error: 'UUID no proporcionado' }, { status: 400 });
    }

   
    const paciente = await Paciente.findOne({ where: { uuid } });

    if (!paciente) {
      return NextResponse.json({ message: 'Paciente no encontrado' }, { status: 404 });
    }

  
    return NextResponse.json(paciente);
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
