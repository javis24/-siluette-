"use client";
import React from 'react';

const TreatmentInfo = () => {
  return (
    <section
      className="py-10 relative" // Agrega 'relative' para posicionar la imagen de fondo
      style={{
        backgroundImage: "url('/img/tratamiento_fondo.png')", // Reemplaza con la ruta de tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto text-center relative z-10">
        <h2
          className="text-4xl font-bold mb-4 text-[#ff69b4] relative" // Color rosa y posición relativa
          style={{
            fontFamily: "'Pacifico', cursive", // Fuente similar a la de la imagen
          }}
        >
          Body TANDA MAX
          <span
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-yellow-400"
            style={{ fontSize: "24px" }}
          >
            *
          </span>
          <span
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-green-500"
            style={{ fontSize: "40px" }}
          >
            &#127806;
          </span>
          <span
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-green-500"
            style={{ fontSize: "40px" }}
          >
            &#127806;
          </span>
        </h2>
        <p className="text-lg mb-6 text-[#ff69b4] font-bold" style={{ fontSize: "40px" }}>Tratamiento de 9 Semanas</p>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-[#ff69b4]">Incluye:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Grid para organizar en filas de tres */}
            <li className="bg-[#ff69b4] text-white py-2 px-4 rounded-full cursor-pointer hover:bg-[#ff80c0]">
              DRENAJE LINFÁTICO.
            </li>
            <li className="bg-[#ff69b4] text-white py-2 px-4 rounded-full cursor-pointer hover:bg-[#ff80c0]">
              MESOTERAPIA REDUCTIVA O REAFIRMANTE.
            </li>
            <li className="bg-[#ff69b4] text-white py-2 px-4 rounded-full cursor-pointer hover:bg-[#ff80c0]">
              ULTRA LIPOLASER.
            </li>
            <li className="bg-[#ff69b4] text-white py-2 px-4 rounded-full cursor-pointer hover:bg-[#ff80c0]">
              ULTRACAVITACIÓN.
            </li>
            <li className="bg-[#ff69b4] text-white py-2 px-4 rounded-full cursor-pointer hover:bg-[#ff80c0]">
              ULTRA RADIOFRECUENCIA.
            </li>
            <li className="bg-[#ff69b4] text-white py-2 px-4 rounded-full cursor-pointer hover:bg-[#ff80c0]">
              VACUUM PRO.
            </li>
            <li className="bg-[#ff69b4] text-white py-2 px-4 rounded-full cursor-pointer hover:bg-[#ff80c0]">
              MADEROTERAPIA.
            </li>
            <li className="bg-[#ff69b4] text-white py-2 px-4 rounded-full cursor-pointer hover:bg-[#ff80c0]">
              GYM PASIVA.
            </li>
            <li className="bg-[#ff69b4] text-white py-2 px-4 rounded-full cursor-pointer hover:bg-[#ff80c0]">
              DESINTOXICACIÓN IÓNICA.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <p className="text-xl font-semibold text-[#ff69b4] ">GRATIS 3 SESIONES DE CARBOXITERAPIA</p>
        </div>

        <div>
          <p className="text-xl text-[#ff69b4] ">INSCRIPCIÓN $350 & $299 CUOTA SEMANAL</p>
        </div>
      </div>
    </section>
  );
};

export default TreatmentInfo;