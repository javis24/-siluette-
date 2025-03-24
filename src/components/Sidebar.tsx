// components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  setActiveSection: (section: string) => void;
  userRole: string | null; // Acepta el rol como prop
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection, userRole }) => {
  return (
    <div className="bg-gray-800 text-white w-64 flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {userRole === 'admin' && (
            <li onClick={() => setActiveSection('users')} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Usuarios</li>
          )}
          {(userRole === 'admin' || userRole === 'secretary') && (
            <>
              <li onClick={() => setActiveSection('patients')} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Pacientes</li>
              <li onClick={() => setActiveSection('metrics')} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Métricas</li>
              <li onClick={() => setActiveSection('treatments')} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Tratamientos</li>
            </>
          )}
          <li onClick={() => setActiveSection('profile')} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Perfil</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;