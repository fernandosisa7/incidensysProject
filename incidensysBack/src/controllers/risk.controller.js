// archivo risk.controller.js
import Risk from '../models/risk.model.js';

export const getRisks = async (req, res) => {
    try {
        const elements = await Risk.find({ user: req.user.id }).populate('user');
        res.json(elements);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createRisk = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newElement = new Risk({ title, description, date, user: req.user.id });
        const savedElement = await newElement.save();
        res.status(201).json(savedElement);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getRisk = async (req, res) => {
    try {
        const element = await Risk.findById(req.params.id).populate('user');
        if (!element) return res.status(404).json({ message: 'Risk not found' });
        res.json(element);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteRisk = async (req, res) => {
    try {
        const element = await Risk.findByIdAndDelete(req.params.id);
        if (!element) return res.status(404).json({ message: 'Risk not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const updateRisk = async (req, res) => {
    try {
        const element = await Risk.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!element) return res.status(404).json({ message: 'Risk not found' });
        res.json(element);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};