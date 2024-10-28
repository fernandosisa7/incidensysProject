import { useState } from 'react';
import {
    createTaskRequest,
    deleteTaskRequest,
    getTaskRequest,
    getTasksRequest,
    updateTaskRequest,
} from '../api/tasks'; // Asegúrate de que la ruta sea correcta

export const useTasks = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTasks = async () => {
        try {
            const response = await getTasksRequest();
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getTask = async (id) => {
        try {
            const response = await getTaskRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const createTask = async (task) => {
        try {
            const response = await createTaskRequest(task);
        } catch (err) {
            setError(err);
        }
    };

    const updateTask = async (id, task) => {
        try {
            const response = await updateTaskRequest(id, task);
        } catch (err) {
            setError(err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteTaskRequest(id);
        } catch (err) {
            setError(err);
        }
    };

    return {
        getTasks,
        loading,
        error,
        getTask,
        createTask,
        updateTask,
        deleteTask,
    };
};
