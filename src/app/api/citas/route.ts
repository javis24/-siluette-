import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/middleware/auth';
import Cita from '@/models/Cita';
import User from '@/models/User';

// GET: Obtener citas
export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;

  const { user } = auth;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    if (user.role === 'admin' || user.role === 'secretary') {
      const citas = await Cita.findAll({
        include: { model: User, attributes: ['id', 'name'] },
        order: [['fecha', 'ASC'], ['hora', 'ASC']],
      });
      return NextResponse.json(citas);
    }

    if (user.role === 'client' && user.id.toString() === userId) {
      const citas = await Cita.findAll({
        where: { userId: user.id },
        order: [['fecha', 'ASC'], ['hora', 'ASC']],
      });
      return NextResponse.json(citas);
    }

    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return NextResponse.json({ error: 'Error al obtener citas' }, { status: 500 });
  }
}

// POST: Crear nueva cita
export async function POST(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;

  const { user } = auth;

  if (user.role !== 'admin' && user.role !== 'secretary') {
    return NextResponse.json({ error: 'No autorizado para crear citas' }, { status: 403 });
  }

  try {
    const data = await req.json();

    if (!data.userId || !data.fecha || !data.hora) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const nuevaCita = await Cita.create({
      userId: data.userId,
      fecha: data.fecha,
      hora: data.hora,
      comentario: data.comentario || '',
      servicio: data.servicio || '',
    });

    return NextResponse.json(nuevaCita, { status: 201 });
  } catch (error) {
    console.error('Error al crear cita:', error);
    return NextResponse.json({ error: 'Error al crear cita' }, { status: 500 });
  }
}

// PUT: Actualizar cita existente
export async function PUT(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;

  const { user } = auth;

  if (user.role !== 'admin' && user.role !== 'secretary') {
    return NextResponse.json({ error: 'No autorizado para editar citas' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const { id, fecha, hora, servicio, comentario } = data;

    if (!id) {
      return NextResponse.json({ error: 'ID de cita requerido' }, { status: 400 });
    }

    const cita = await Cita.findByPk(id);
    if (!cita) {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 });
    }

    await cita.update({ fecha, hora, servicio, comentario });

    return NextResponse.json(cita);
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    return NextResponse.json({ error: 'Error al actualizar cita' }, { status: 500 });
  }
}

// DELETE: Eliminar una cita
export async function DELETE(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;

  const { user } = auth;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (user.role !== 'admin' && user.role !== 'secretary') {
    return NextResponse.json({ error: 'No autorizado para eliminar citas' }, { status: 403 });
  }

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID de cita requerido' }, { status: 400 });
    }

    const cita = await Cita.findByPk(id);
    if (!cita) {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 });
    }

    await cita.destroy();
    return NextResponse.json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    return NextResponse.json({ error: 'Error al eliminar cita' }, { status: 500 });
  }
}
