import Incident from '../models/incident.model.js';

export const getIncidents = async (req, res) => {
    try {
        const elements = await Incident.find({ user: req.user.id }).populate('user').populate('employeeId').populate('riskId');
        res.json(elements);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createIncident = async (req, res) => {
    try {
        const { incidentDate, incidentTime, description, location, employeeId, riskId } = req.body;
        const newElement = new Incident({
            incidentDate,
            incidentTime,
            description,
            location,
            employeeId,
            riskId,
            user: req.user.id
        });
        const savedElement = await newElement.save();
        res.status(201).json(savedElement);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getIncident = async (req, res) => {
    try {
        const element = await Incident.findById(req.params.id).populate('user');
        if (!element) return res.status(404).json({ message: 'Incident not found' });
        res.json(element);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteIncident = async (req, res) => {
    try {
        const element = await Incident.findByIdAndDelete(req.params.id);
        if (!element) return res.status(404).json({ message: 'Incident not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const updateIncident = async (req, res) => {
    try {
        const element = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!element) return res.status(404).json({ message: 'Incident not found' });
        res.json(element);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
