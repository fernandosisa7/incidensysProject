import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user');  // busca todas las tareas que sean del usuario q esta en req.user.id y las asigna a una variable
        // populate es para que traiga toda la info del user no solo el id
        res.json(tasks); // me da de respuesta el json con las tasks
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        });
        const savedTask = await newTask.save(); // aqui me guarda la tarea en la db con los datos que vienen del body
        res.json(savedTask); // me los da de respuesta en un json
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user'); //me encuentra una tarea de la db que coincida con el id q viene en param
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        console.log('error', error);
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id); //elimina la tarea de la db q coincida con el id
        if (!task) return res.status(404).json({ message: 'Task not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true  //dame el dato nuevo, no el dato viejo
        }); //actualiza una tarea con los datos q vienen del body y q cumpla el id
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' });
    }
};
