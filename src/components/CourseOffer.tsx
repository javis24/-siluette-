import Image from 'next/image';

const CourseOffer = () => {
  return (
    <section className="text-pink-600 py-16 px-6">
    <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
      {/* Imagen */}
      <div className="flex-shrink-0">
      <Image
        src="/img/curso_img.png"
        alt="Profile"
        width={300}
        height={300}
        className="rounded-lg shadow-lg"
      />

      </div>

      {/* Contenido */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Inscríbete a nuestros cursos</h1>
        <p className="text-gray-800 leading-relaxed">
        Bienvenidos a nuestros cursos online, Dónde aprenderás a proporcionar tratamientos 100% personalizados, las técnicas adecuadas para aplicar cada una de las tecnologías reductivas,  y de embellecimiento, también aprenderás todas las terapias más vendidas y eficaces para que tus pacientes o clientes quedé.
        </p>
        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-pink-800 rounded-lg p-4">
            <h2 className="text-2xl font-bold text-white">5</h2>
            <p className="text-sm text-gray-400">certificaciones avaladas por secretaria del trabajo</p>
          </div>
          <div className="bg-pink-800 rounded-lg p-4">
            <h2 className="text-2xl font-bold text-white">Capacitación</h2>
            <p className="text-sm text-gray-400">previsión social, No puedes desaprovechar esta oportunidad!</p>
          </div>
          <div className="bg-pink-800 rounded-lg p-4">
            <h2 className="text-2xl font-bold text-white">Lista de Proveedores </h2>
            <p className="text-sm text-gray-400">Alta, Media y Baja Gama </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col items-center space-y-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold">
            {/* Botón de pago recurrente */}
            <a
              href="https://pago.clip.mx/suscripcion/83481f39-bede-46d5-8f84-37244f332805"
              className="flex items-center justify-center"
            >
              <Image
                src="https://cdn.prod.website-files.com/62588b32d8d6105ab7aa9721/63bf568610f3fdf437235192_Preview.svg"
                alt="Logo Paga con Clip"
                width={128} // Aproximadamente igual a w-32
                height={40} // Estimación
              />
            </a>

            {/* Botón de acceso a cursos */}
     
              Accede a nuestros cursos
            </button>
          </div>

      </div>
    </div>
  </section>
  );
};

export default CourseOffer;
