// archivo example.controller.js
import Example from '../models/example.model.js';

export const getExamples = async (req, res) => {
    try {
        const elements = await Example.find({ user: req.user.id }).populate('user');
        res.json(elements);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createExample = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newElement = new Example({ title, description, date, user: req.user.id });
        const savedElement = await newElement.save();
        res.status(201).json(savedElement);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getExample = async (req, res) => {
    try {
        const element = await Example.findById(req.params.id).populate('user');
        if (!element) return res.status(404).json({ message: 'Example not found' });
        res.json(element);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteExample = async (req, res) => {
    try {
        const element = await Example.findByIdAndDelete(req.params.id);
        if (!element) return res.status(404).json({ message: 'Example not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const updateExample = async (req, res) => {
    try {
        const element = await Example.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!element) return res.status(404).json({ message: 'Example not found' });
        res.json(element);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};