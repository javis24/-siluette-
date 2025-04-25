import { NextRequest, NextResponse } from 'next/server';
import Paciente from '@/models/Paciente';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;

    const paciente = await Paciente.findOne({
      where: { userId: Number(id) },
    });

    if (!paciente) {
      return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 });
    }

    return NextResponse.json(paciente);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al buscar paciente' }, { status: 500 });
  }
}
