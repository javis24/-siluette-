import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const authenticate = async (req: NextRequest) => {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      uuid: string;
      role: string;
    };

    return { user: decoded };
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
};