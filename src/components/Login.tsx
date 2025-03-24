"use client";
import React, { useState, useContext } from 'react';

import { useRouter } from 'next/navigation';
import '../app/globals.css';

const Login = () => { 
 

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
      
        className="flex flex-col items-center gap-4 w-full max-w-sm bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="email" className="text-green-600 font-semibold">
            Correo
          </label>
          <input
            type="email"
            id="email"
            
            className="w-full p-3 rounded-md bg-gray-200 border-2 border-gray-500 focus:border-green-500 outline-none"
            required
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="password" className="text-green-600 font-semibold">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            
            className="w-full p-3 rounded-md bg-gray-200 border-2 border-gray-500 focus:border-green-500 outline-none"
            required
          />
        </div>
        <div className="w-full text-right">
          <a href="#" className="text-gray-600 hover:text-green-500">
            Olvidaste tu contraseña :-(
          </a>
        </div>
   
        <button type="submit" className="w-full py-3 mt-4 bg-gray-700 text-white rounded-full font-semibold transition-colors hover:bg-green-500 hover:text-gray-700">
          Entrar
        </button>
        <div className="text-gray-700">
          ¿Te gustaría una sesión con SiluettePlusJC?{" "}
          <button
            type="button"
            
            className="text-green-500 hover:underline"
          >
            Inscríbete
          </button>
        </div>
      </form>

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
             
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Inscríbete</h2>
            <div className="appointment-form bg-[#9b5ab7] text-white p-10">
              <h2 className="text-2xl mb-2">
                Inscríbete <span className="italic">a nuestros cursos</span>
              </h2>
              <form className="space-y-4">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 rounded text-black"
                  required
                />
                <label htmlFor="email">Correo</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 rounded text-black"
                  required
                />
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-2 rounded text-black"
                  required
                />
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3 as number}
                  className="w-full p-2 rounded text-black"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Enviar Whatsapp
                </button>
              </form>
            </div>
          </div>
        </div>
      )
    </div>
  );
};

export default Login;