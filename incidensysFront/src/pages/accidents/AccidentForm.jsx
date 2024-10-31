import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTasks } from '../../hooks/useTasks';
dayjs.extend(utc)

const AccidentForm = () => {
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
            navigate('/accidentes');
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
        <div className='flex my-4 items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-8 rounded-md '>
                <p className="text-white font-bold text-3xl mb-6 text-center">{params.id ? 'Editar accidente' : 'Registrar accidente'}</p>
                <form onSubmit={onSubmit}>
                    <label htmlFor="accidentDate">Fecha del accidente</label>
                    <input type='date'
                        {...register('accidentDate', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    {errors.accidentDate && <p className="text-red-500">{errors.accidentDate.message}</p>}

                    <label htmlFor="accidentHour">Hora del accidente</label>
                    <input type='time'
                        {...register('accidentHour')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.accidentHour && <p className="text-red-500">{errors.accidentHour.message}</p>}

                    <label htmlFor="description">Descripción</label>
                    <textarea rows='3' placeholder='Descripción'
                        {...register('description', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    <label htmlFor="place">Lugar</label>
                    <input
                        type='text'
                        placeholder='Lugar'
                        {...register('place')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.place && <p className="text-red-500">{errors.place.message}</p>}

                    <label htmlFor="employee">Empleado</label>
                    <select
                        {...register('employee', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    >
                        <option value="" disabled selected>Selecciona un empleado</option>
                        <option value="opcion1">opcion1</option>
                        <option value="opcion2">opcion2</option>
                        <option value="opcion3">opcion3</option>
                    </select>
                    {errors.employee && <p className="text-red-500">{errors.employee.message}</p>}

                    <label htmlFor="risk">Riesgo</label>
                    <select
                        {...register('risk')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    >
                        <option value="" disabled selected>Selecciona un riesgo</option>
                        <option value="opcion1">opcion1</option>
                        <option value="opcion2">opcion2</option>
                        <option value="opcion3">opcion3</option>
                    </select>
                    {errors.risk && <p className="text-red-500">{errors.risk.message}</p>}

                    <button className='bg-blue-500 w-full py-2 mt-2 rounded-md'>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AccidentForm;