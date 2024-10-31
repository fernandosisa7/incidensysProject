import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { useTasks } from '../../hooks/useTasks';

const Employees = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { getTasks, deleteTask } = useTasks();
    const navigate = useNavigate();

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
        XLSX.writeFile(workbook, 'reporte_empleados.xlsx');
    };

    const deleteElement = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'bg-red-500 text-white',
                cancelButton: 'bg-gray-300 text-black',
            },
            buttonsStyling: false,
            willOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                const cancelButton = Swal.getCancelButton();
                confirmButton.style.padding = '10px 20px';
                confirmButton.style.borderRadius = '5px';
                confirmButton.style.marginRight = '10px';
                cancelButton.style.padding = '10px 20px';
                cancelButton.style.borderRadius = '5px';
            }
        });
        if (result.isConfirmed) {
            // await deleteTask(id);
            loadData();
            Swal.fire({
                icon: 'success',
                title: 'Elemento eliminado',
                text: 'El elemento se ha eliminado correctamente.',
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
        }
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
            <div className="flex flex-col sm:flex-row justify-between items-center my-4 px-6">
                <p className="text-white font-bold text-3xl mb-4 sm:mb-0 w-full sm:w-auto">Empleados</p>
                <input
                    type="text"
                    placeholder="Buscar empleados..."
                    className="px-4 py-2 rounded-md text-gray-700 mb-4 sm:mb-0 w-full sm:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto'>
                    <button onClick={() => generateReport()} className='bg-yellow-400 text-black px-4 py-2 rounded-md w-full sm:w-auto'>
                        Generar Reporte
                    </button>
                    <button
                        className='bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-auto'
                        onClick={() => navigate('/guardar-empleado')}>
                        Crear empleado
                    </button>
                </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                {filteredTasks.map(task => (
                    <div key={task._id} className="bg-zinc-800 w-full p-10 rounded-md flex">
                        <div className="flex-1">
                            <p className="text-white font-bold">Nombre del empleado:</p>
                            <p className="text-slate-400">{task.title}</p>
                            <p className="text-white font-bold">Email:</p>
                            <p className="text-slate-400">{task.description}</p>
                            <p className="text-white font-bold">Cedula de ciudadania:</p>
                            <p className="text-slate-400">{dayjs(task.date).utc().format('DD/MM/YYYY')}</p>
                            <p className="text-white font-bold">Cargo:</p>
                            <p className="text-slate-400">{task.description}</p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <button
                                className='bg-red-500 text-white px-4 py-2 rounded-md mb-2'
                                onClick={() => { deleteElement(task._id); }}>
                                Eliminar
                            </button>
                            <button
                                className='bg-blue-500 text-white px-4 py-2 rounded-md mb-2'
                                onClick={() => navigate(`/empleados/${task._id}`)}>
                                Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Employees;