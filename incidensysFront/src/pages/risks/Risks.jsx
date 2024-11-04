import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { useRisks } from '../../hooks/useRisks';

const Risks = () => {
    const [risks, setRisks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { getRisks, deleteRisk } = useRisks();
    const navigate = useNavigate();

    const filteredRisks = risks.filter(risk => {
        return (
            risk.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            risk.occurrence?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            risk.impactLevel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            risk.category?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const generateReport = () => {
        const formattedRisks = risks.map(risk => ({
            Descripción: risk.description,
            Ocurrencia: risk.occurrence,
            Nivel_impacto: risk.impactLevel,
            Categoria: risk.category,
        }));
        const worksheet = XLSX.utils.json_to_sheet(formattedRisks);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Risks');
        XLSX.writeFile(workbook, 'reporte_riesgos.xlsx');
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
            await deleteRisk(id);
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
        const resRisks = await getRisks();
        setRisks(resRisks);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center my-4 px-6">
                <p className="text-white font-bold text-3xl mb-4 sm:mb-0 w-full sm:w-auto">Riesgos</p>
                <input
                    type="text"
                    placeholder="Buscar riesgos..."
                    className="px-4 py-2 rounded-md text-gray-700 mb-4 sm:mb-0 w-full sm:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto'>
                    <button onClick={() => generateReport()} className='bg-yellow-400 text-black px-4 py-2 rounded-md w-full sm:w-auto'>
                        Descargar Reporte
                    </button>
                    <button
                        className='bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-auto'
                        onClick={() => navigate('/guardar-riesgo')}>
                        Registrar riesgo
                    </button>
                </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                {filteredRisks.map(risk => (
                    <div key={risk._id} className="bg-zinc-800 w-full p-10 rounded-md flex">
                        <div className="flex-1">
                            <p className="text-white font-bold">Descripción del riesgo:</p>
                            <p className="text-slate-400">{risk.description}</p>
                            <p className="text-white font-bold">Ocurrencia:</p>
                            <p className="text-slate-400">{risk.occurrence}</p>
                            <p className="text-white font-bold">Nivel de impacto:</p>
                            <p className="text-slate-400">{risk.impactLevel}</p>
                            <p className="text-white font-bold">Categoría:</p>
                            <p className="text-slate-400">{risk.category}</p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <button
                                className='bg-red-500 text-white px-4 py-2 rounded-md mb-2'
                                onClick={() => { deleteElement(risk._id); }}>
                                Eliminar
                            </button>
                            <button
                                className='bg-blue-500 text-white px-4 py-2 rounded-md mb-2'
                                onClick={() => navigate(`/riesgos/${risk._id}`)}>
                                Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Risks;