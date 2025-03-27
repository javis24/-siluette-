import { NextRequest, NextResponse } from 'next/server';
import Users from '@/models/User'; 
import { hash } from 'bcryptjs';

// GET: Obtener todos los usuarios
export async function GET() {
    try {
      const users = await Users.findAll({
        attributes: ['uuid', 'name', 'email', 'role'],
      });
  
      return NextResponse.json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return NextResponse.json({ message: 'Error al obtener los usuarios' }, { status: 500 });
    }
  }

// POST: Crear nuevo usuario
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'client'
    });

    return NextResponse.json({ message: 'Usuario creado', user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
  }
}
