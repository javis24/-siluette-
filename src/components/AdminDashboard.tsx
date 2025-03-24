"use client";
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import UserManagement from './UserManagement';
import PatientManagement from './PatientManagement';
import MetricsManagement from './MetricsManagement';
import TreatmentsManagement from './TreatmentsManagement';
import Profile from './Profile';
import Logout from './Logout';
import { AuthContext } from '../contexts/authContext'; 

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario, redirigimos al login
  if (!user) {
    router.push('/inicio-sesion');
    return null; 
  }

  // user existe, entonces verificamos rol
  const userRole = user.role;

  const renderSection = () => {
    if (userRole === 'admin') {
      switch (activeSection) {
        case 'users':
          return <UserManagement />;
        case 'patients':
          return <PatientManagement />;
        case 'metrics':
          return <MetricsManagement />;
        case 'treatments':
          return <TreatmentsManagement />;
        case 'profile':
          return <Profile />;
        default:
          return <UserManagement />;
      }
    } else if (userRole === 'secretary') {
      switch (activeSection) {
        case 'patients':
          return <PatientManagement />;
        case 'metrics':
          return <MetricsManagement />;
        case 'treatments':
          return <TreatmentsManagement />;
        case 'profile':
          return <Profile />;
        default:
          return <PatientManagement />;
      }
    } else {
      return <div>Acceso denegado</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveSection={setActiveSection} userRole={userRole} />
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-4">
        {renderSection()}
        <Logout />
      </div>
    </div>
  );
};

export default AdminDashboard;
