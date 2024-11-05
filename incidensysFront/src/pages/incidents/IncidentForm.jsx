import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEmployees } from '../../hooks/useEmployees';
import { useIncidents } from '../../hooks/useIncidents';
import { useRisks } from '../../hooks/useRisks';
dayjs.extend(utc)

const IncidentForm = () => {
    const { getIncident, createIncident, updateIncident } = useIncidents();
    const { getEmployees } = useEmployees();
    const { getRisks } = useRisks();
    const [employees, setEmployees] = useState([]);
    const [risks, setRisks] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        const dataValid = {
            ...data,
            incidentDate: dayjs(data.incidentDate).utc().format('YYYY-MM-DD'),
        };
        console.log('data', data);
        try {
            if (params.id) {
                await updateIncident(params.id, dataValid);
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
                await createIncident(dataValid);
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
            navigate('/incidentes');
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

    const loadData = async () => {
        const resEmployees = await getEmployees();
        const resRisks = await getRisks();
        setEmployees(resEmployees);
        setRisks(resRisks);
        if (params.id) {
            const incident = await getIncident(params.id);
            setValue('incidentDate', dayjs(incident.incidentDate).utc().format('YYYY-MM-DD'));
            setValue('incidentTime', incident.incidentTime);
            setValue('description', incident.description);
            setValue('location', incident.location);
            setValue('employeeId', String(incident.employeeId?._id));
            setValue('riskId', String(incident.riskId?._id));
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='flex my-4 items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-8 rounded-md '>
                <p className="text-white font-bold text-3xl mb-6 text-center">{params.id ? 'Editar incidente' : 'Registrar incidente'}</p>
                <form onSubmit={onSubmit}>
                    <label htmlFor="incidentDate">Fecha del incidente</label>
                    <input type='date'
                        {...register('incidentDate', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    {errors.incidentDate && <p className="text-red-500">{errors.incidentDate.message}</p>}

                    <label htmlFor="incidentTime">Hora del incidente</label>
                    <input type='time'
                        {...register('incidentTime')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.incidentTime && <p className="text-red-500">{errors.incidentTime.message}</p>}

                    <label htmlFor="description">Descripción</label>
                    <textarea rows='3' placeholder='Descripción'
                        {...register('description', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    <label htmlFor="location">Lugar</label>
                    <input
                        type='text'
                        placeholder='Lugar'
                        {...register('location')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.location && <p className="text-red-500">{errors.location.message}</p>}

                    <label htmlFor="employeeId">Empleado</label>
                    <select
                        {...register('employeeId', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    >
                        <option value="" disabled selected>Selecciona un empleado</option>
                        {employees.map(employee => (
                            <option key={employee._id} value={employee._id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                    {errors.employeeId && <p className="text-red-500">{errors.employeeId.message}</p>}

                    <label htmlFor="riskId">Riesgo</label>
                    <select
                        {...register('riskId')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    >
                        <option value="" disabled selected>Selecciona un riesgo</option>
                        {risks.map(risk => (
                            <option key={risk._id} value={risk._id}>
                                {risk.description}
                            </option>
                        ))}
                    </select>
                    {errors.riskId && <p className="text-red-500">{errors.riskId.message}</p>}

                    <button className='bg-blue-500 w-full py-2 mt-2 rounded-md'>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default IncidentForm;