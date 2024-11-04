import { useState } from 'react';
import {
    createEppRequest,
    deleteEppRequest,
    getEppRequest,
    getEppsRequest,
    updateEppRequest,
} from '../api/eppsApi'; 

export const useEpps = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getEpps = async () => {
        try {
            const response = await getEppsRequest();
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getEpp = async (id) => {
        try {
            const response = await getEppRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const createEpp = async (epp) => {
        try {
            const response = await createEppRequest(epp);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const updateEpp = async (id, epp) => {
        try {
            const response = await updateEppRequest(id, epp);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const deleteEpp = async (id) => {
        try {
            const response = await deleteEppRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    return {
        getEpps,
        loading,
        error,
        getEpp,
        createEpp,
        updateEpp,
        deleteEpp,
    };
};