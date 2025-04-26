import { NextRequest, NextResponse } from 'next/server';
import Paciente from '@/models/Paciente';

export async function GET(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);


    const parts = pathname.split('/');
    const id = parts[parts.length - 2]; 

    if (!id) {
      return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    const paciente = await Paciente.findOne({ where: { userId: id } });

    if (!paciente) {
      return NextResponse.json({}, { status: 200 }); 
    }

    return NextResponse.json(paciente);
  } catch (error) {
    console.error('Error al obtener paciente por userId:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
