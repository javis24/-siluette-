'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setMessage('✅ Inicio de sesión exitoso');

        if (data.user.role === 'admin' || data.user.role === 'secretary') {
          router.push('/dashboard/px');
        } else if (data.user.role === 'client') {
          const token = data.token;

          const pacienteRes = await fetch(`/api/users/${data.user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const pacienteData = await pacienteRes.json();

          if (pacienteData?.paciente?.uuid) {
            router.push(`/dashboard/historial/${pacienteData.paciente.uuid}`);
          } else {
            setMessage('❌ No se encontró historial del paciente');
          }
        } else {
          router.push('/dashboard');
        }
      } else if (res.status === 401) {
        setMessage('❌ Correo electrónico o contraseña incorrectos');
      } else {
        setMessage('❌ Error al iniciar sesión. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      setMessage('❌ Error al conectar con el servidor');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <ThemeToggle />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-200 border-0 rounded-md p-2 mb-4 
                focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-200 border-0 rounded-md p-2 mb-4 
                focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />

            <div className="flex items-center justify-between flex-wrap">
              <label className="text-sm text-gray-900 dark:text-gray-200 cursor-pointer flex items-center">
                <input className="mr-2" id="remember-me" type="checkbox" />
                Recordarme
              </label>

              <a
                className="text-sm text-blue-500 hover:underline mb-0.5"
                href="https://wa.me/528713330566?text=Olvidé%20mi%20contraseña"
                target="_blank"
                rel="noopener noreferrer"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold 
                py-2 px-4 rounded-md mt-4 hover:from-indigo-600 hover:to-blue-600 transition duration-150"
              type="submit"
            >
              Entrar
            </button>

            {message && (
              <p className="text-sm text-center text-blue-400 mt-4">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
