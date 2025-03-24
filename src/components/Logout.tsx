"use client";
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.delete('/logout');
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
};

export default Logout;