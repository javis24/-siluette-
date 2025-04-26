import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { hash } from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);


    const parts = pathname.split('/');
    const id = parts[parts.length - 2]; 

    if (!id) {
      return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}





export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
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
    console.error(error);
    return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const user = await User.findOne({ where: { uuid: id } });
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    await user.destroy();

    return NextResponse.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}
