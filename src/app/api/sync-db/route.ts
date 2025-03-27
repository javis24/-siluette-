import { NextResponse } from 'next/server';
import db from '@/lib/sequelize'; // tu conexión
import '@/models/User';
import '@/models/Paciente';
import '@/models/MetricasSalud';
import '@/models/TratamientosEsteticos';


export async function GET() {
    try {
      await db.sync({ alter: true }); 
  
      return NextResponse.json({
        message: 'Base de datos sincronizada correctamente ✅',
      });
    } catch (error) {
      console.error('Error al sincronizar:', error);
      return NextResponse.json({ error: 'Error al sincronizar la base de datos' }, { status: 500 });
    }
    
  }
  await db.authenticate();
  console.log("Autenticado correctamente");
  await db.sync({ alter: true });