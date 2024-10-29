import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
import { useState } from "react";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg">
            <div className="flex items-center">
                <Link to={'/'}>
                    <h1 className="text-2xl font-bold">Incidensys</h1>
                </Link>
            </div>
            <button onClick={toggleMenu} className="block lg:hidden">
                {isMenuOpen ? "✖" : "☰"}
            </button>
            <ul className={`flex-col flex ${isMenuOpen ? 'block' : 'hidden'} md:flex md:flex-row md:items-center`}>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to='/empleados' className="bg-green-600 px-4 py-1 rounded-sm">
                                Empleados
                            </Link>
                        </li>
                        <li>
                            <Link to='/accidentes' className="bg-green-600 px-4 py-1 rounded-sm">
                                Accidentes
                            </Link>
                        </li>
                        <li>
                            <Link to='/incidentes' className="bg-green-600 px-4 py-1 rounded-sm">
                                Incidentes
                            </Link>
                        </li>
                        <li>
                            <Link to='/riesgos' className="bg-green-600 px-4 py-1 rounded-sm">
                                Riesgos
                            </Link>
                        </li>
                        <li>
                            <Link to='/medidas' className="bg-green-600 px-4 py-1 rounded-sm">
                                Medidas
                            </Link>
                        </li>
                        <li>
                            <Link to='/epps' className="bg-green-600 px-4 py-1 rounded-sm">
                                EPPS
                            </Link>
                        </li>
                        <li>
                            <Link to='/example' className="bg-green-600 px-4 py-1 rounded-sm">
                                Example
                            </Link>
                        </li>
                        <li>
                            <Link to='/' onClick={() => logout()} className="bg-red-500 px-4 py-1 rounded-sm">
                                Salir
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login' className="bg-green-600 px-4 py-1 rounded-sm">
                                Ingresar
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' className="bg-green-600 px-4 py-1 rounded-sm">
                                Registrarse
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
