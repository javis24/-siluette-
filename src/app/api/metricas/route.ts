import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/middleware/auth';
import Metricas from '@/models/MetricasSalud';

export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;
  const { user } = auth;

  try {
    if (user.role === 'admin' || user.role === 'secretary') {
      const all = await Metricas.findAll();
      return NextResponse.json(all);
    }

    const own = await Metricas.findAll({ where: { pacienteUuid: user.id } });
    return NextResponse.json(own);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener métricas' }, { status: 500 });
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
    const created = await Metricas.create(body);
    return NextResponse.json(created);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear métrica' }, { status: 500 });
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
    const metric = await Metricas.findByPk(id);

    if (!metric) {
      return NextResponse.json({ error: 'Métrica no encontrada' }, { status: 404 });
    }

    await metric.update(data);
    return NextResponse.json({ message: 'Métrica actualizada' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al actualizar métrica' }, { status: 500 });
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
    const metric = await Metricas.findByPk(id);

    if (!metric) {
      return NextResponse.json({ error: 'Métrica no encontrada' }, { status: 404 });
    }

    await metric.destroy();
    return NextResponse.json({ message: 'Métrica eliminada' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al eliminar métrica' }, { status: 500 });
  }
}