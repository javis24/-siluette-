"use client"
import React from 'react';

interface SubscriptionPopupProps {
  onClose: () => void;
}

const SubscriptionPopup: React.FC<SubscriptionPopupProps> = ({ onClose }) => {
  const handleWhatsApp = () => {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    const whatsappMessage = `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`;
    const whatsappNumber = "528713330566";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 font-bold">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Inscríbete</h2>
        <div className="appointment-form bg-[#9b5ab7] text-white p-10">
          <h2 className="text-2xl mb-2">
            Inscríbete <span className="italic">a nuestros cursos</span>
          </h2>
          <form className="space-y-4">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" className="w-full p-2 rounded text-black" required />
            <label htmlFor="email">Correo</label>
            <input type="email" id="email" name="email" className="w-full p-2 rounded text-black" required />
            <label htmlFor="phone">Teléfono</label>
            <input type="tel" id="phone" name="phone" className="w-full p-2 rounded text-black" required />
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows={3 as number} className="w-full p-2 rounded text-black" required></textarea>
            <button type="button" className="bg-black text-white px-4 py-2 rounded" onClick={handleWhatsApp}>
              Enviar WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPopup;