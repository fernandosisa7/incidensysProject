import { useState } from 'react';
import {
    createIncidentRequest,
    deleteIncidentRequest,
    getIncidentRequest,
    getIncidentsRequest,
    updateIncidentRequest,
} from '../api/incidentsApi'; 

export const useIncidents = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getIncidents = async () => {
        try {
            const response = await getIncidentsRequest();
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getIncident = async (id) => {
        try {
            const response = await getIncidentRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const createIncident = async (incident) => {
        try {
            const response = await createIncidentRequest(incident);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const updateIncident = async (id, incident) => {
        try {
            const response = await updateIncidentRequest(id, incident);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    const deleteIncident = async (id) => {
        try {
            const response = await deleteIncidentRequest(id);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    return {
        getIncidents,
        loading,
        error,
        getIncident,
        createIncident,
        updateIncident,
        deleteIncident,
    };
};