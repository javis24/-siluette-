'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar onToggle={() => setShowSidebar(false)} />}
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6">
        {!showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Mostrar menú
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
