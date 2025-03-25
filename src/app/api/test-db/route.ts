// src/app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/sequelize';

export async function GET() {
  try {
    await db.authenticate();
    return NextResponse.json({ message: 'Conexión exitosa a MySQL 🚀' });
  } catch (error) {
    return NextResponse.json({ error: 'Error de conexión', details: error }, { status: 500 });
  }
}
