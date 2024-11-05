import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEmployees } from '../../hooks/useEmployees';
dayjs.extend(utc)

const EmployeeForm = () => {
    const { getEmployee, createEmployee, updateEmployee } = useEmployees();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        const dataValid = {
            ...data,
            citizenshipId: Number(data.citizenshipId),
            phone: Number(data.phone),
            emergencyPhone: Number(data.emergencyPhone),
            hireDate: data.hireDate ? dayjs(data.hireDate).utc().format('YYYY-MM-DD') : null
        };
        try {
            if (params.id) {
                await updateEmployee(params.id, dataValid);
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
                await createEmployee(dataValid);
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
            navigate('/empleados');
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

    const loadEmployee = async () => {
        if (params.id) {
            const employee = await getEmployee(params.id);
            setValue('name', employee.name);
            setValue('email', employee.email);
            setValue('citizenshipId', employee.citizenshipId);
            setValue('position', employee.position);
            setValue('hireDate', dayjs(employee.hireDate).utc().format('YYYY-MM-DD'));
            setValue('address', employee.address);
            setValue('phone', employee.phone);
            setValue('emergencyContactName', employee.emergencyContactName);
            setValue('emergencyPhone', employee.emergencyPhone);
        }
    };

    useEffect(() => {
        loadEmployee();
    }, []);

    return (
        <div className='flex items-center justify-center my-4'>
            <div className='bg-zinc-800 max-w-md w-full p-8 rounded-md '>
                <p className="text-white font-bold text-3xl mb-6 text-center">{params.id ? 'Editar empleado' : 'Crear empleado'}</p>
                <form onSubmit={onSubmit}>

                    <label htmlFor="name">Nombre completo del empleado</label>
                    <input
                        type='text'
                        placeholder='Nombre completo'
                        {...register('name', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <label htmlFor="email">Email</label>
                    <input
                        type='email'
                        placeholder='Email'
                        {...register('email', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <label htmlFor="citizenshipId">Cedula de ciudadania</label>
                    <input
                        type='number'
                        placeholder='Cedula de ciudadania'
                        {...register('citizenshipId', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.citizenshipId && <p className="text-red-500">{errors.citizenshipId.message}</p>}

                    <label htmlFor="position">Cargo</label>
                    <input
                        type='text'
                        placeholder='Cargo'
                        {...register('position', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.position && <p className="text-red-500">{errors.position.message}</p>}

                    <label htmlFor="hireDate">Fecha de ingreso</label>
                    <input type='date'
                        {...register('hireDate')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    <label htmlFor="address">Dirección</label>
                    <input
                        type='text'
                        placeholder='Dirección'
                        {...register('address')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}

                    <label htmlFor="phone">Teléfono</label>
                    <input
                        type='number'
                        placeholder='Teléfono'
                        {...register('phone', { required: 'Campo obligatorio' })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                    <label htmlFor="emergencyContactName">Nombre contacto emergencia</label>
                    <input
                        type='text'
                        placeholder='Nombre contacto emergencia'
                        {...register('emergencyContactName')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.emergencyContactName && <p className="text-red-500">{errors.emergencyContactName.message}</p>}

                    <label htmlFor="emergencyPhone">Telefono contacto de emergencia</label>
                    <input
                        type='number'
                        placeholder='Telefono contacto de emergencia'
                        {...register('emergencyPhone')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.emergencyPhone && <p className="text-red-500">{errors.emergencyPhone.message}</p>}

                    <button className='bg-blue-500 w-full py-2 mt-2 rounded-md'>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EmployeeForm;