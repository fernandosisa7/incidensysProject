import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../../hooks/useTasks';

const Example = () => {
    const [tasks, setTasks] = useState([]);
    const { getTasks, loading, error, getTask, createTask, updateTask, deleteTask } = useTasks();

    const generateReport = () => {
        console.log('generate report')
    };

    const deleteElement = async (id) => {
        await deleteTask(id);
        loadData();
    };

    const loadData = async () => {
        const resTasks = await getTasks();
        setTasks(resTasks);
    };

    useEffect(() => {
        // getTasks();
        loadData();
    }, []);

    return <>
        <Link to='/add-example' className="bg-green-600 px-4 py-1 rounded-sm">
            Agregar Tarea
        </Link>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {tasks.map(task => (
                <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                    <header className="flex justify-between">
                        <h1 className="text-2xl font-bold">{task.title}</h1>
                        <div className="flex gap-x-2 items-center">
                            <button
                                className='w-full bg-red-500 text-white px-4 py-2 rounded-md'
                                onClick={() => { deleteElement(task._id); }}>
                                Eliminar
                            </button>
                            <Link to={`/example/${task._id}`} className='w-full bg-blue-500 text-white px-4 py-2 rounded-md'>
                                Editar
                            </Link>
                            <button
                                className='w-full bg-yellow-400 text-black px-4 py-2 rounded-md'
                                onClick={() => generateReport()}>
                                Reporte
                            </button>
                        </div>
                    </header>
                    <p className="text-slate-300">{task.description}</p>
                    <p>
                        {dayjs(task.date).utc().format('DD/MM/YYYY')}
                    </p>
                </div >
            ))}
        </div>
    </>
}

export default Example