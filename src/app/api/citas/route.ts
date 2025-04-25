import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/middleware/auth';
import Cita from '@/models/Cita';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;

  const { user } = auth;

  try {
    if (user.role === 'admin' || user.role === 'secretary') {
      const citas = await Cita.findAll({
        include: {
          model: User,
          attributes: ['id', 'name'],
        },
        order: [['fecha', 'ASC'], ['hora', 'ASC']],
      });

      return NextResponse.json(citas);
    }

    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al cargar citas' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;

  const { user } = auth;

  if (user.role !== 'admin' && user.role !== 'secretary') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const data = await req.json();

    // Esperamos que se reciba el campo `userId`
    const cita = await Cita.create(data);
    return NextResponse.json(cita);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al crear cita' }, { status: 500 });
  }
}
