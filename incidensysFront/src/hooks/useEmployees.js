import { useState } from 'react';
import {
    createEmployeeRequest,
    deleteEmployeeRequest,
    getEmployeeRequest,
    getEmployeesRequest,
    updateEmployeeRequest,
} from '../api/employeesApi'; 

export const useEmployees = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getEmployees = async () => {
        try {
            const response = await getEmployeesRequest();
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getEmployee = async (id) => {
        try {
            const response = await getEmployeeRequest(id);
            console.log('response', response)
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const createEmployee = async (employee) => {
        try {
            const response = await createEmployeeRequest(employee);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const updateEmployee = async (id, employee) => {
        try {
            const response = await updateEmployeeRequest(id, employee);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            const response = await deleteEmployeeRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    return {
        getEmployees,
        loading,
        error,
        getEmployee,
        createEmployee,
        updateEmployee,
        deleteEmployee,
    };
};