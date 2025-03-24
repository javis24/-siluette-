"use client";
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Bloque 1: Servicios */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Nuestros Servicios</h3>
          <p>
            Ofrecemos una amplia gama de tratamientos faciales y corporales para realzar tu belleza natural.
          </p>
        </div>

        {/* Bloque 2: Cursos */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Cursos de Belleza</h3>
          <p>
            Aprende las últimas técnicas y conviértete en un profesional de la belleza con nuestros cursos especializados.
          </p>
        </div>

        {/* Bloque 3: Expertos */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Nuestro Equipo</h3>
          <p>
            Contamos con expertos dermatólogos, masajistas y esteticistas para brindarte la mejor atención.
          </p>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8">
        <p>© {new Date().getFullYear()} SiluettePlus JC. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;