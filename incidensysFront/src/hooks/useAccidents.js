import { useState } from 'react';
import {
    createAccidentRequest,
    deleteAccidentRequest,
    getAccidentRequest,
    getAccidentsRequest,
    updateAccidentRequest,
} from '../api/accidentsApi'; 

export const useAccidents = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAccidents = async () => {
        try {
            const response = await getAccidentsRequest();
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getAccident = async (id) => {
        try {
            const response = await getAccidentRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const createAccident = async (accident) => {
        try {
            const response = await createAccidentRequest(accident);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const updateAccident = async (id, accident) => {
        try {
            const response = await updateAccidentRequest(id, accident);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const deleteAccident = async (id) => {
        try {
            const response = await deleteAccidentRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    return {
        getAccidents,
        loading,
        error,
        getAccident,
        createAccident,
        updateAccident,
        deleteAccident,
    };
};