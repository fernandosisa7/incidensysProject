import React from 'react';
import { useAuth } from '../../context/AuthContex';

const Home = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <h1 className='text-3xl font-bold mb-4 text-center'>Bienvenido {isAuthenticated && user.username} </h1>
                <p className='mb-2'>
                    Bienvenido a Incidensys, un sistema diseñado para registrar y gestionar accidentes e incidentes en la construcción en Duitama, Boyacá.
                </p>
                <p>
                    {isAuthenticated ?
                        <>Con módulos CRUD para administrar empleados, accidentes y riesgos, Incidensys permite optimizar la seguridad y la gestión de datos.</>
                        :
                        <>Para iniciar puedes ingresar o crear una nueva cuenta si lo deseas.</>
                    }
                </p>
            </div>
        </div>
    )
}

export default Home