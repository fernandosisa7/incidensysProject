import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContex';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors } // estos son errores de front
    } = useForm();
    const { signin, errors: signinErrors, isAuthenticated } = useAuth(); // estos son errores de back de error.response.data q se ven en consola, o respuesta de postman
    const navigate = useNavigate();

    const onSubmit = handleSubmit(data => {
        signin(data);
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Ingreso exitoso',
        //     text: 'Has iniciado sesión correctamente.',
        //     customClass: {
        //         confirmButton: 'bg-blue-500 text-white',
        //     },
        //     buttonsStyling: false,
        //     willOpen: () => {
        //         const confirmButton = Swal.getConfirmButton();
        //         confirmButton.style.padding = '10px 20px';
        //         confirmButton.style.borderRadius = '5px';
        //     }
        // });
    });

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated]);

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {signinErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                        {error}
                    </div>
                ))}
                <h1 className='text-3xl font-bold my-2 text-center'>Ingresar</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" {...register('email', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email'
                    />
                    {errors.email && (
                        <p className='text-red-500'>Email es obligatorio</p>
                    )}

                    <input type="password" {...register('password', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Contraseña'
                    />
                    {errors.password && (
                        <p className='text-red-500'>Contraseña es obligatoria</p>
                    )}

                    <button className='bg-sky-500 w-full text-white px-4 py-2 rounded-md my-2' type='submit'                    >
                        Ingresar
                    </button>

                    <p className='flex gap-x-2 justify-between'>
                        ¿No tienes una cuenta?
                        <Link className='text-sky-500' to="/register">Registrarse</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage