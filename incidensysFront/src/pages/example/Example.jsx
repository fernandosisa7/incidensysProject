import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useTasks } from '../../hooks/useTasks';

const Example = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { getTasks, deleteTask } = useTasks();

    const filteredTasks = tasks.filter(task => {
        const formattedDate = dayjs(task.date).utc().format('DD/MM/YYYY');
        return (
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formattedDate.includes(searchTerm)
        );
    });

    const generateReport = () => {
        const formattedTasks = tasks.map(task => ({
            Titulo: task.title,
            Descripción: task.description,
            Fecha: dayjs(task.date).utc().format('DD/MM/YYYY'),
        }));
        const worksheet = XLSX.utils.json_to_sheet(formattedTasks);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
        XLSX.writeFile(workbook, 'reporte_tareas.xlsx');
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
        loadData();
    }, []);

    return (
        <>
            <div className="flex justify-between items-center my-4 px-6">
                <p className="text-white font-bold text-3xl">Tareas</p>
                <input
                    type="text"
                    placeholder="Buscar tareas..."
                    className="px-4 py-2 rounded-md text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className='bg-green-600 text-white px-4 py-2 rounded-md mb-2'
                    onClick={() => navigate('/add-example')}>
                    Crear Tarea
                </button>
            </div>

            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
                {filteredTasks.map(task => (
                    <div key={task._id} className="bg-zinc-800 max-w-md w-full p-10 rounded-md flex">
                        <div className="flex-1">
                            <p className="text-white font-bold">Titulo:</p>
                            <p className="text-slate-400">{task.title}</p>
                            <p className="text-white font-bold">Descripción:</p>
                            <p className="text-slate-400">{task.description}</p>
                            <p className="text-white font-bold">Fecha:</p>
                            <p className="text-slate-400">{dayjs(task.date).utc().format('DD/MM/YYYY')}</p>
                        </div>
                        <div className="flex flex-col justify-between">
                            <button
                                className='bg-red-500 text-white px-4 py-2 rounded-md mb-2'
                                onClick={() => { deleteElement(task._id); }}>
                                Eliminar
                            </button>
                            <button
                                className='bg-blue-500 text-white px-4 py-2 rounded-md mb-2'
                                onClick={() => navigate(`/example/${task._id}`)}>
                                Editar
                            </button>
                            <button onClick={() => generateReport()} className='bg-yellow-400 text-black px-4 py-2 rounded-md'>
                                Reporte
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Example;