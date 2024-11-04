import { useState } from 'react';
import {
    createRiskRequest,
    deleteRiskRequest,
    getRiskRequest,
    getRisksRequest,
    updateRiskRequest,
} from '../api/risksApi'; 

export const useRisks = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRisks = async () => {
        try {
            const response = await getRisksRequest();
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getRisk = async (id) => {
        try {
            const response = await getRiskRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const createRisk = async (risk) => {
        try {
            const response = await createRiskRequest(risk);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const updateRisk = async (id, risk) => {
        try {
            const response = await updateRiskRequest(id, risk);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const deleteRisk = async (id) => {
        try {
            const response = await deleteRiskRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    return {
        getRisks,
        loading,
        error,
        getRisk,
        createRisk,
        updateRisk,
        deleteRisk,
    };
};