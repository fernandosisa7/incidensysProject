import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRisks } from '../../hooks/useRisks';
dayjs.extend(utc)

const RiskForm = () => {
    const { getRisk, createRisk, updateRisk } = useRisks();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        const dataValid = {
            ...data,
            occurrence: data.occurrence ? data.occurrence: null,
            impactLevel: data.impactLevel ? data.impactLevel: null,
        };
        try {
            if (params.id) {
                await updateRisk(params.id, dataValid);
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
                await createRisk(dataValid);
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
            navigate('/riesgos');
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

    const loadRisk = async () => {
        if (params.id) {
            const risk = await getRisk(params.id);
            setValue('description', risk.description);
            setValue('occurrence', risk.occurrence);
            setValue('impactLevel', risk.impactLevel);
            setValue('category', risk.category);
        }
    };

    useEffect(() => {
        loadRisk();
    }, []);

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-8 rounded-md '>
                <p className="text-white font-bold text-3xl mb-6 text-center">{params.id ? 'Editar riesgo' : 'Registrar riesgo'}</p>
                <form onSubmit={onSubmit}>
                    <label htmlFor="description">Descripción del riesgo</label>
                    <textarea rows='3' placeholder='Descripción'
                        {...register('description', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    <label htmlFor="occurrence">Ocurrencia</label>
                    <select
                        {...register('occurrence')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    >
                        <option value="" disabled selected>Selecciona una opción</option>
                        <option value="Bajo">Bajo</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto">Alto</option>
                    </select>
                    {errors.occurrence && <p className="text-red-500">{errors.occurrence.message}</p>}

                    <label htmlFor="impactLevel">Nivel de impacto</label>
                    <select
                        {...register('impactLevel')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    >
                        <option value="" disabled selected>Selecciona un tipo</option>
                        <option value="Bajo">Bajo</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto">Alto</option>
                    </select>
                    {errors.impactLevel && <p className="text-red-500">{errors.impactLevel.message}</p>}

                    <label htmlFor="category">Categoría</label>
                    <select
                        {...register('category', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    >
                        <option value="" disabled selected>Selecciona una categoría</option>
                        <option value="Físico">Físico</option>
                        <option value="Químico">Químico</option>
                        <option value="Biológico">Biológico</option>
                        <option value="Ergonómico">Ergonómico</option>
                        <option value="Eléctrico">Eléctrico</option>
                        <option value="Por incendio o explosión">Por incendio o explosión</option>
                    </select>
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}

                    <button className='bg-blue-500 w-full py-2 mt-2 rounded-md'>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RiskForm;