import { NextResponse } from 'next/server';
import Pacientes from '@/models/Paciente';


export async function GET(
  req: Request,
  context: { params: { uuid: string } }
) {
  const { uuid } = context.params; 

  try {
    const paciente = await Pacientes.findOne({
      where: { uuid },
    });

    if (!paciente) {
      return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 });
    }

    return NextResponse.json(paciente);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener el paciente' }, { status: 500 });
  }
}
