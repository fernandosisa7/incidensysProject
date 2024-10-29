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
      <a href='/'><div className="text-xl font-bold">Incidensys</div></a>
      <div className="cursor-pointer lg:hidden" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>
      <ul
        ref={menuRef}
        className={`${isOpen ? 'block' : 'hidden'} absolute bg-zinc-700 w-full transition-all duration-300 ease-in-out lg:flex lg:items-center lg:justify-end lg:space-x-4 lg:static`}
        style={{ top: '100%' }}
      >
        {isAuthenticated ? <>
          <li><a href="/empleados" className="block py-2 px-4 bg-green-600 hover:bg-green-900">Empleados</a></li>
          <li><a href="/accidentes" className="block py-2 px-4 bg-green-600 hover:bg-green-900">Accidentes</a></li>
          <li><a href="/incidentes" className="block py-2 px-4 bg-green-600 hover:bg-green-900">Incidentes</a></li>
          <li><a href="/riesgos" className="block py-2 px-4 bg-green-600 hover:bg-green-900">Riesgos</a></li>
          <li><a href="/medidas" className="block py-2 px-4 bg-green-600 hover:bg-green-900">Medidas</a></li>
          <li><a href="/epps" className="block py-2 px-4 bg-green-600 hover:bg-green-900">EPPS</a></li>
          <li><a href="/example" className="block py-2 px-4 bg-green-600 hover:bg-green-900">Example</a></li>
          <li><a onClick={() => logout()} className="block py-2 px-4 bg-red-500 hover:bg-red-800">Salir</a></li>
        </> : <>
          <li><a href="/login" className="block py-2 px-4 bg-green-600 hover:bg-green-900">Ingresar</a></li>
          <li><a href="/register" className="block py-2 px-4 bg-green-600 hover:bg-green-900">Registrarse</a></li>
        </>}
      </ul>
    </nav>
  );
};

export default Navbar;
