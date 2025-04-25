import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/middleware/auth';
import Metricas from '@/models/MetricasSalud';

export async function GET(req: NextRequest) {
  const auth = await authenticate(req);
  if (!('user' in auth)) return auth;
  const { user } = auth;

  const uuid = req.nextUrl.searchParams.get('uuid');
  if (uuid) {
    try {
      const metricas = await Metricas.findOne({ where: { pacienteUuid: uuid } });
      if (!metricas) return NextResponse.json({}, { status: 200 }); // o { error: 'No encontrado' }
      return NextResponse.json(metricas);
    } catch (error) {
      return NextResponse.json({ error: 'Error al obtener métricas por UUID' }, { status: 500 });
    }
  }

  // flujo original
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

    // Verifica que venga el pacienteUuid
    if (!body.pacienteUuid) {
      return NextResponse.json({ error: 'Falta pacienteUuid' }, { status: 400 });
    }

    // Buscar si ya existen métricas para este paciente
    const existing = await Metricas.findOne({ where: { pacienteUuid: body.pacienteUuid } });

    if (existing) {
      await existing.update(body);
      return NextResponse.json({ message: 'Métricas actualizadas', updated: true, data: existing });
    }

    // Si no existen, crear nuevas
    const created = await Metricas.create(body);
    return NextResponse.json({ message: 'Métricas creadas', created: true, data: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al guardar métricas' }, { status: 500 });
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