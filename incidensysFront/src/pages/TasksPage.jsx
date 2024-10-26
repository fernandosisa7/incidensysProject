import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TasksContext';

const TasksPage = () => {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.length === 0) return (<h1>No tasks</h1>)

    return <>
        <Link to='/add-task' className="bg-green-600 px-4 py-1 rounded-sm">
            Add task
        </Link>
        
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {tasks.map(task => (
                <TaskCard task={task} key={task._id} />
            ))}
        </div>
    </>
}

export default TasksPage