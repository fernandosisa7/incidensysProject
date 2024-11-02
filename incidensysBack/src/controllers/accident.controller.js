// archivo accident.controller.js
import Accident from '../models/accident.model.js';

export const getAccidents = async (req, res) => {
    try {
        const elements = await Accident.find({ user: req.user.id }).populate('user');
        res.json(elements);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createAccident = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newElement = new Accident({ title, description, date, user: req.user.id });
        const savedElement = await newElement.save();
        res.status(201).json(savedElement);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getAccident = async (req, res) => {
    try {
        const element = await Accident.findById(req.params.id).populate('user');
        if (!element) return res.status(404).json({ message: 'Accident not found' });
        res.json(element);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteAccident = async (req, res) => {
    try {
        const element = await Accident.findByIdAndDelete(req.params.id);
        if (!element) return res.status(404).json({ message: 'Accident not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const updateAccident = async (req, res) => {
    try {
        const element = await Accident.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!element) return res.status(404).json({ message: 'Accident not found' });
        res.json(element);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};