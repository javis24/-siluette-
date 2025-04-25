'use client';

interface Props {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export default function SidebarToggle({ showSidebar, toggleSidebar }: Props) {
  return (
    <button
      onClick={toggleSidebar}
      className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      {showSidebar ? 'Ocultar menú' : 'Mostrar menú'}
    </button>
  );
}
