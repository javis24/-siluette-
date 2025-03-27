import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/middleware/auth';
import Tratamientos from '@/models/TratamientosEsteticos';

export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;
  const { user } = auth;

  try {
    if (user.role === 'admin' || user.role === 'secretary') {
      const all = await Tratamientos.findAll();
      return NextResponse.json(all);
    }

    const own = await Tratamientos.findAll({ where: { pacienteId: user.id } });
    return NextResponse.json(own);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener tratamientos' }, { status: 500 });
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
    const body = await req.json();
    const created = await Tratamientos.create(body);
    return NextResponse.json(created);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear tratamiento' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;
  const { user } = auth;

  if (user.role !== 'admin' && user.role !== 'secretary') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, ...data } = body;
    const treatment = await Tratamientos.findByPk(id);

    if (!treatment) {
      return NextResponse.json({ error: 'Tratamiento no encontrado' }, { status: 404 });
    }

    await treatment.update(data);
    return NextResponse.json({ message: 'Tratamiento actualizado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar tratamiento' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;
  const { user } = auth;

  if (user.role !== 'admin' && user.role !== 'secretary') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id } = body;
    const treatment = await Tratamientos.findByPk(id);

    if (!treatment) {
      return NextResponse.json({ error: 'Tratamiento no encontrado' }, { status: 404 });
    }

    await treatment.destroy();
    return NextResponse.json({ message: 'Tratamiento eliminado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar tratamiento' }, { status: 500 });
  }
}
