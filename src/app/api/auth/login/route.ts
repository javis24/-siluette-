// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_ultra_seguro';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    const userData = user.toJSON(); // ✅ declaramos solo una vez

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = jwt.sign(
      {
        uuid: userData.uuid,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return NextResponse.json(
      {
        token,
        user: {
          uuid: userData.uuid,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json({ message: 'Error al iniciar sesión' }, { status: 500 });
  }
}
