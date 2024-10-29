import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContex';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-zinc-700 text-white p-4 flex justify-between items-center relative">
      <div className="text-xl font-bold">Incidensys</div>
      <div className="cursor-pointer lg:hidden" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>
      <ul
        ref={menuRef}
        className={`${isOpen ? 'block' : 'hidden'} absolute bg-zinc-700 w-full transition-all duration-300 ease-in-out lg:flex lg:items-center lg:space-x-4 lg:static`}
        style={{ top: '100%' }}
      >
        {isAuthenticated ? <>
          <li><a href="/empleados" className="block py-2 px-4 hover:bg-gray-800">Empleados</a></li>
          <li><a href="/accidentes" className="block py-2 px-4 hover:bg-gray-800">Accidentes</a></li>
          <li><a href="/incidentes" className="block py-2 px-4 hover:bg-gray-800">Incidentes</a></li>
          <li><a href="/riesgos" className="block py-2 px-4 hover:bg-gray-800">Riesgos</a></li>
          <li><a href="/medidas" className="block py-2 px-4 hover:bg-gray-800">Medidas</a></li>
          <li><a href="/epps" className="block py-2 px-4 hover:bg-gray-800">EPPS</a></li>
          <li><a href="/example" className="block py-2 px-4 hover:bg-gray-800">Example</a></li>
          <li><a onClick={() => logout()} className="block py-2 px-4 hover:bg-gray-800">Salir</a></li>
        </> : <>
          <li><a href="/login" className="block py-2 px-4 hover:bg-gray-800">Ingresar</a></li>
          <li><a href="/register" className="block py-2 px-4 hover:bg-gray-800">Registrarse</a></li>
        </>}
      </ul>
    </nav>
  );
};

export default Navbar;
