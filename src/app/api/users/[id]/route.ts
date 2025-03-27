import { NextRequest, NextResponse } from 'next/server';
import Users from '@/models/User';
import { hash } from 'bcryptjs';

// GET: Obtener usuario por UUID
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extrae el ID desde la ruta

  try {
    const user = await Users.findOne({
      where: { uuid: id },
      attributes: ['uuid', 'name', 'email', 'role']
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Error al buscar el usuario' }, { status: 500 });
  }
}
  
  // PUT: Actualizar usuario
  export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const body = await req.json();
      const { name, email, password, role } = body;
  
      const user = await Users.findOne({ where: { uuid: params.id } });
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
      console.error('Error al actualizar usuario:', error);
      return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
    }
  }
  

// DELETE: Eliminar usuario
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await Users.findOne({ where: { uuid: params.id } });
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    await user.destroy();

    return NextResponse.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}
