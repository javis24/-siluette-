import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import Paciente from '@/models/Paciente'; 
import { hash } from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);
    const parts = pathname.split('/');
    const id = parts[parts.length - 1]; 

    if (!id) {
      return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    const user = await User.findByPk(id, {
      include: [{ model: Paciente, as: 'paciente' }]
    });  

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}


// PUT para actualizar usuario
export async function PUT(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);
    const parts = pathname.split('/');
    const id = parts[parts.length - 1]; // Obtener id de la URL

    const body = await req.json();
    const { name, email, password, role } = body;

    const user = await User.findOne({ where: { uuid: id } });
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const updatedPassword = password ? await hash(password, 10) : undefined;

    const updates: Partial<{ name: string; email: string; password: string; role: string }> = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (updatedPassword) updates.password = updatedPassword;
    if (role) updates.role = role;

    await user.update(updates);

    return NextResponse.json({ message: 'Usuario actualizado correctamente ✅' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
  }
}

// DELETE para eliminar usuario
export async function DELETE(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);
    const parts = pathname.split('/');
    const id = parts[parts.length - 1]; // Obtener id de la URL

    const user = await User.findOne({ where: { uuid: id } });
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    await user.destroy();

    return NextResponse.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}
