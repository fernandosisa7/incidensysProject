import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContex';
import Swal from 'sweetalert2';

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth(); // trae la funcion signup del contexto
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
        Swal.fire({
            icon: 'success',
            title: 'Registrado exitosamente',
            text: 'Te has registrado correctamente.',
            customClass: {
                confirmButton: 'bg-blue-500 text-white',
            },
            buttonsStyling: false,
            willOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.style.padding = '10px 20px';
                confirmButton.style.borderRadius = '5px';
            }
        });
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {registerErrors.map((error, i) => (  //estos errores de backend se recomienda q el backend siempre responda en response.data = ['error1', 'error2'] para q sea facil de leer por el front
                    <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                        {error}
                    </div>
                ))}
                <h1 className='text-3xl font-bold my-2 text-center'>Registrarse</h1>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        {...register('username', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Usuario'
                    />
                    {errors.username && (
                        <p className='text-red-500'>El nombre de usuario es obligatorio</p>
                    )}

                    <input type="email" {...register('email', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email'
                    />
                    {errors.email && (
                        <p className='text-red-500'>Email es obligatorio</p>
                    )}

                    <input type="password" {...register('password', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Constraseña'
                    />
                    {errors.password && (
                        <p className='text-red-500'>Constraseña es obligatoria</p>
                    )}

                    <button className='bg-sky-500 w-full text-white px-4 py-2 rounded-md my-2' type='submit'>
                        Registrarse
                    </button>

                    <p className='flex gap-x-2 justify-between'>
                        ¿Ya tienes una cuenta?
                        <Link className='text-sky-500' to="/login">Ingresar</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage