import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/middleware/auth';
import Pacientes from '@/models/Paciente';
import Users from '@/models/User';

// GET: Todos los pacientes o solo el propio si es "client"
export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if ('user' in auth === false) return auth;
  const { user } = auth;

  try {
    if (user.role === 'admin' || user.role === 'secretary') {
      const all = await Pacientes.findAll({ include: Users });
      return NextResponse.json(all);
    }

    // Si es "client", solo ver sus datos
    const own = await Pacientes.findAll({ where: { userId: user.id } });
    return NextResponse.json(own);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener pacientes' }, { status: 500 });
  }
}

// POST: Crear paciente (solo admin o secretaria)
export async function POST(req: NextRequest) {
  const auth = await authenticate(req);
  if ('user' in auth === false) return auth;
  const { user } = auth;

  if (user.role !== 'admin' && user.role !== 'secretary') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const paciente = await Pacientes.create(body);
    return NextResponse.json(paciente);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear paciente' }, { status: 500 });
  }
}
