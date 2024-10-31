import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTasks } from '../../hooks/useTasks';
dayjs.extend(utc)

const EmployeeForm = () => {
    const { getTasks, loading, error, getTask, createTask, updateTask, deleteTask } = useTasks();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        // const dataValid = {
        //     ...data,
        //     date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
        // };
        console.log('data', data);
        try {
            if (params.id) {
                // await updateTask(params.id, dataValid);
                Swal.fire({
                    icon: 'success',
                    title: 'Elemento actualizado',
                    text: 'El elemento se ha actualizado correctamente.',
                    customClass: {
                        confirmButton: 'bg-blue-500 text-white custom-button',
                    },
                    buttonsStyling: false,
                    willOpen: () => {
                        const confirmButton = Swal.getConfirmButton();
                        confirmButton.style.padding = '10px 20px';
                        confirmButton.style.borderRadius = '5px';
                    }
                });
            } else {
                // await createTask(dataValid);
                Swal.fire({
                    icon: 'success',
                    title: 'Elemento creado',
                    text: 'El elemento se ha creado correctamente.',
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
            }
            navigate('/empleados');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al guardar el elemento, puedes consultarlo o modificarlo mas adelante.',
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
        }
    });

    const loadTask = async () => {
        if (params.id) {
            const task = await getTask(params.id);
            setValue('title', task.title);
            setValue('description', task.description);
            setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'));
        }
    };

    useEffect(() => {
        loadTask();
    }, []);

    return (
        <div className='flex items-center justify-center my-4'>
            <div className='bg-zinc-800 max-w-md w-full p-8 rounded-md '>
                <p className="text-white font-bold text-3xl mb-6 text-center">{params.id ? 'Editar empleado' : 'Crear empleado'}</p>
                <form onSubmit={onSubmit}>

                    <label htmlFor="completeName">Nombre completo del empleado</label>
                    <input
                        type='text'
                        placeholder='Nombre completo'
                        {...register('completeName', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    {errors.completeName && <p className="text-red-500">{errors.completeName.message}</p>}

                    <label htmlFor="email">Email</label>
                    <input
                        type='text'
                        placeholder='Email'
                        {...register('email', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <label htmlFor="identityNumber">Cedula de ciudadania</label>
                    <input
                        type='number'
                        placeholder='Cedula de ciudadania'
                        {...register('identityNumber', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.identityNumber && <p className="text-red-500">{errors.identityNumber.message}</p>}

                    <label htmlFor="position">Cargo</label>
                    <input
                        type='text'
                        placeholder='Cargo'
                        {...register('position', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.position && <p className="text-red-500">{errors.position.message}</p>}

                    <label htmlFor="entryDay">Fecha de ingreso</label>
                    <input type='date'
                        {...register('entryDay')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    <label htmlFor="address">Dirección</label>
                    <input
                        type='text'
                        placeholder='Dirección'
                        {...register('address')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}

                    <label htmlFor="phoneNumber">Teléfono</label>
                    <input
                        type='tel'
                        placeholder='Teléfono'
                        {...register('phoneNumber', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}

                    <label htmlFor="emergencyContactName">Nombre contacto emergencia</label>
                    <input
                        type='text'
                        placeholder='Nombre contacto emergencia'
                        {...register('emergencyContactName')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.emergencyContactName && <p className="text-red-500">{errors.emergencyContactName.message}</p>}

                    <label htmlFor="emergencyContactPhone">Telefono contacto de emergencia</label>
                    <input
                        type='number'
                        placeholder='Telefono contacto de emergencia'
                        {...register('emergencyContactPhone')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.emergencyContactPhone && <p className="text-red-500">{errors.emergencyContactPhone.message}</p>}

                    <button className='bg-blue-500 w-full py-2 mt-2 rounded-md'>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EmployeeForm;