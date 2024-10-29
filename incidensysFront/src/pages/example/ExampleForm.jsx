import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../../hooks/useTasks';
dayjs.extend(utc)

const ExampleForm = () => {
    const { getTasks, loading, error, getTask, createTask, updateTask, deleteTask } = useTasks();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit((data) => {
        const dataValid = {
            ...data,
            date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
        };
        if (params.id) {
            updateTask(params.id, dataValid);
        } else {
            createTask(dataValid);
        }
        navigate('/example');
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
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-8 rounded-md '>
                <p className="text-white font-bold text-3xl mb-6 text-center">{params.id ? 'Editar Tarea' : 'Agregar Tarea'}</p>
                <form onSubmit={onSubmit}>
                    <label htmlFor="title">Titulo</label>
                    <input
                        type='text'
                        placeholder='Titulo'
                        {...register('title', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                    <label htmlFor="description">Descripción</label>
                    <textarea rows='3' placeholder='Descripción'
                        {...register('description', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    <label htmlFor="date">Fecha</label>
                    <input type='date'
                        {...register('date')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    <button className='bg-blue-500 w-full py-2 mt-2 rounded-md'>Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default ExampleForm;
