import Epp from '../models/epp.model.js';

export const getEpps = async (req, res) => {
    try {
        const elements = await Epp.find({ user: req.user.id }).populate('user').populate('employee_id');
        res.json(elements);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createEpp = async (req, res) => {
    try {
        const { type, description, assignment_date, employee_id } = req.body;
        const newElement = new Epp({ type, description, assignment_date, employee_id, user: req.user.id });
        const savedElement = await newElement.save();
        res.status(201).json(savedElement);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getEpp = async (req, res) => {
    try {
        const element = await Epp.findById(req.params.id).populate('user').populate('riskId');
        if (!element) return res.status(404).json({ message: 'Epp not found' });
        res.json(element);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteEpp = async (req, res) => {
    try {
        const element = await Epp.findByIdAndDelete(req.params.id);
        if (!element) return res.status(404).json({ message: 'Epp not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const updateEpp = async (req, res) => {
    try {
        const element = await Epp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!element) return res.status(404).json({ message: 'Epp not found' });
        res.json(element);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
