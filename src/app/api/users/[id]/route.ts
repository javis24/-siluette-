import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { hash } from 'bcryptjs';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const user = await User.findOne({
      where: id.length === 36 ? { uuid: id } : { id: Number(id) },
      attributes: ['uuid', 'name', 'email'],
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al buscar el usuario' }, { status: 500 });
  }
}



// PUT: Actualizar usuario
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

// DELETE: Eliminar usuario
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
