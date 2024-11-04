import { useState } from 'react';
import {
    createMeasureRequest,
    deleteMeasureRequest,
    getMeasureRequest,
    getMeasuresRequest,
    updateMeasureRequest,
} from '../api/measuresApi'; 

export const useMeasures = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMeasures = async () => {
        try {
            const response = await getMeasuresRequest();
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getMeasure = async (id) => {
        try {
            const response = await getMeasureRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const createMeasure = async (measure) => {
        try {
            const response = await createMeasureRequest(measure);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const updateMeasure = async (id, measure) => {
        try {
            const response = await updateMeasureRequest(id, measure);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const deleteMeasure = async (id) => {
        try {
            const response = await deleteMeasureRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    return {
        getMeasures,
        loading,
        error,
        getMeasure,
        createMeasure,
        updateMeasure,
        deleteMeasure,
    };
};