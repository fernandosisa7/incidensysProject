import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useMeasures } from '../../hooks/useMeasures';
import { useRisks } from '../../hooks/useRisks';
dayjs.extend(utc)

const MeasureForm = () => {
    const { getMeasure, createMeasure, updateMeasure } = useMeasures();
    const { getRisks } = useRisks();
    const [risks, setRisks] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        const dataValid = {
            ...data,
        };
        try {
            if (params.id) {
                await updateMeasure(params.id, dataValid);
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
                await createMeasure(dataValid);
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
            navigate('/medidas');
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
        const resRisks = await getRisks();
        setRisks(resRisks);
        if (params.id) {
            const measure = await getMeasure(params.id);
            setValue('type', measure.type);
            setValue('description', measure.description);
            setValue('riskId', String(measure.riskId?._id));
        }

    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-8 rounded-md '>
                <p className="text-white font-bold text-3xl mb-6 text-center">{params.id ? 'Editar Medida' : 'Crear Medida'}</p>
                <form onSubmit={onSubmit}>
                    <label htmlFor="type">Tipo de medida</label>
                    <select
                        {...register('type', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    >
                        <option value="" disabled selected>Selecciona un tipo</option>
                        <option value="Preventiva">Preventiva</option>
                        <option value="Correctiva">Correctiva</option>
                    </select>
                    {errors.type && <p className="text-red-500">{errors.type.message}</p>}


                    <label htmlFor="description">Descripción</label>
                    <textarea rows='3' placeholder='Descripción'
                        {...register('description', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

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

export default MeasureForm;