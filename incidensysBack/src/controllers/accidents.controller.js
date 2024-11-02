// archivo accident.controller.js
import Example from '../models/accident.model.js';

export const getExamples = async (req, res) => {
    try {
        const accidents = await Example.find({ user: req.user.id }).populate('user');
        res.json(accidents);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createExample = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newExample = new Example({ title, description, date, user: req.user.id });
        const savedExample = await newExample.save();
        res.status(201).json(savedExample);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getExample = async (req, res) => {
    try {
        const accident = await Example.findById(req.params.id).populate('user');
        if (!accident) return res.status(404).json({ message: 'Example not found' });
        res.json(accident);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteExample = async (req, res) => {
    try {
        const accident = await Example.findByIdAndDelete(req.params.id);
        if (!accident) return res.status(404).json({ message: 'Example not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const updateExample = async (req, res) => {
    try {
        const accident = await Example.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!accident) return res.status(404).json({ message: 'Example not found' });
        res.json(accident);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};