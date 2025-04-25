'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@/components/ui/button';

interface Props {
  pacienteUuid: string;
}

export default function ExportarPDF({ pacienteUuid }: Props) {
  const handleExport = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const [pacienteRes, metricasRes, tratamientosRes] = await Promise.all([
        fetch(`/api/pacientes/${pacienteUuid}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/metricas?uuid=${pacienteUuid}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/tratamientos?uuid=${pacienteUuid}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (!pacienteRes.ok || !metricasRes.ok || !tratamientosRes.ok) {
        alert('Error al obtener los datos para el PDF');
        return;
      }

      const paciente = await pacienteRes.json();
      const metricas = await metricasRes.json();
      const tratamientos = await tratamientosRes.json();

      const doc = new jsPDF();

      // ✅ Encabezado con logo y nombre del spa
      const logo = new Image();
      logo.src = '/img/silluet_logo.png';

      // Esperamos a que cargue el logo
      logo.onload = () => {
        doc.addImage(logo, 'PNG', 10, 10, 30, 30); // logo
        doc.setFontSize(18);
        doc.text('Siluette Plus JC beauty and health', 50, 20);
        doc.setFontSize(12);
        doc.text(`Fecha de exportación: ${new Date().toLocaleDateString('es-MX')}`, 50, 28);

        // ✅ Título principal con nombre del paciente
        doc.setFontSize(14);
        doc.text(`Datos clínicos de ${paciente.name}`, 10, 50);

        // 🧍 Datos del paciente
        autoTable(doc, {
          startY: 55,
          theme: 'striped',
          head: [['Campo', 'Valor']],
          body: Object.entries(paciente).map(([key, val]) => [key, String(val ?? '')]),
        });

        // 📈 Métricas
        doc.addPage();
        doc.text('Métricas de Salud', 10, 20);
        autoTable(doc, {
          startY: 25,
          theme: 'grid',
          head: [['Campo', 'Valor']],
          body: Object.entries(metricas).map(([key, val]) => [key, String(val ?? '')]),
        });

        // 💆 Tratamientos
        doc.addPage();
        doc.text('Tratamientos Estéticos', 10, 20);
        autoTable(doc, {
          startY: 25,
          theme: 'grid',
          head: [['Tratamiento', 'Valor']],
          body: Object.entries(tratamientos).map(([key, val]) => [key, String(val ?? '')]),
        });

        doc.save(`reporte_${paciente.name.replace(/\s+/g, '_')}.pdf`);
      };
    } catch (err) {
      console.error('Error al exportar PDF', err);
      alert('Hubo un problema al exportar el PDF');
    }
  };

  return (
    <div className="text-right">
      <Button onClick={handleExport}>📄 Exportar PDF</Button>
    </div>
  );
}
