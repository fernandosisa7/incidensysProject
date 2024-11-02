import Measure from '../models/measure.model.js';

export const getMeasures = async (req, res) => {
    try {
        const elements = await Measure.find({ user: req.user.id }).populate('user');
        res.json(elements);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createMeasure = async (req, res) => {
    try {
        const { type, description, date, riskId } = req.body;
        const newElement = new Measure({ type, description, date, riskId, user: req.user.id });
        const savedElement = await newElement.save();
        res.status(201).json(savedElement);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getMeasure = async (req, res) => {
    try {
        const element = await Measure.findById(req.params.id).populate('user');
        if (!element) return res.status(404).json({ message: 'Measure not found' });
        res.json(element);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteMeasure = async (req, res) => {
    try {
        const element = await Measure.findByIdAndDelete(req.params.id);
        if (!element) return res.status(404).json({ message: 'Measure not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const updateMeasure = async (req, res) => {
    try {
        const element = await Measure.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!element) return res.status(404).json({ message: 'Measure not found' });
        res.json(element);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
