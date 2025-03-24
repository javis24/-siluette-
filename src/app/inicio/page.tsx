"use client";
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

const InicioPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <h1>
      Hola, {user ? user.name : 'Invitado'}
    </h1>
  );
};

export default InicioPage;
