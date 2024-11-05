import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEmployees } from '../../hooks/useEmployees';
import { useEpps } from '../../hooks/useEpps';
dayjs.extend(utc)

const EppForm = () => {
    const { getEpp, createEpp, updateEpp } = useEpps();
    const { getEmployees } = useEmployees();
    const [employees, setEmployees] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        const dataValid = {
            ...data,
            date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
        };
        try {
            if (params.id) {
                await updateEpp(params.id, dataValid);
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
                await createEpp(dataValid);
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
            navigate('/epps');
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
        setEmployees(resEmployees);
        if (params.id) {
            const epp = await getEpp(params.id);
            setValue('type', epp.type);
            setValue('description', epp.description);
            setValue('assignment_date', dayjs(epp.assignment_date).utc().format('YYYY-MM-DD'));
            setValue('employee_id', epp.employee_id?._id);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-8 rounded-md '>
                <p className="text-white font-bold text-3xl mb-6 text-center">{params.id ? 'Editar Epp' : 'Crear Epp'}</p>
                <form onSubmit={onSubmit}>
                    <label htmlFor="type">Tipo de Epp</label>
                    <select
                        {...register('type', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    >
                        <option value="" disabled selected>Selecciona un tipo</option>
                        <option value="Casco">Casco</option>
                        <option value="Gafas">Gafas</option>
                        <option value="Guantes">Guantes</option>
                        <option value="Botas">Botas</option>
                        <option value="Mascarillas">Mascarillas</option>
                        <option value="Ropa de trabajo">Ropa de trabajo</option>
                    </select>
                    {errors.type && <p className="text-red-500">{errors.type.message}</p>}


                    <label htmlFor="description">Descripción</label>
                    <textarea rows='3' placeholder='Descripción'
                        {...register('description', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    <label htmlFor="assignment_date">Fecha de asignación</label>
                    <input type='date'
                        {...register('assignment_date')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    <label htmlFor="employee_id">Empleado</label>
                    <select
                        {...register('employee_id')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    >
                        <option value="" disabled selected>Selecciona un empleado</option>
                        {employees.map(employee => (
                            <option key={employee._id} value={employee._id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                    {errors.employee_id && <p className="text-red-500">{errors.employee_id.message}</p>}

                    <button className='bg-blue-500 w-full py-2 mt-2 rounded-md'>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EppForm;