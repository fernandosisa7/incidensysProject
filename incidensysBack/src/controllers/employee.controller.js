import Employee from '../models/employee.model.js';

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ user: req.user.id }).populate('user');
        res.json(employees);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createEmployee = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newEmployee = new Employee({ title, description, date, user: req.user.id });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('user');
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};