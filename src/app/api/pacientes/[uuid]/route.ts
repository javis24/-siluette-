import {NextRequest, NextResponse } from 'next/server';
import Pacientes from '@/models/Paciente';


export async function GET(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);

    const parts = pathname.split('/');
    const uuid = parts[parts.length - 2]; 
    if (!uuid) {
      return NextResponse.json({ error: 'UUID no proporcionado' }, { status: 400 });
    }

    const paciente = await Pacientes.findOne({ where: { uuid } });

    if (!paciente) {
      return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 });
    }

    return NextResponse.json(paciente);
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
