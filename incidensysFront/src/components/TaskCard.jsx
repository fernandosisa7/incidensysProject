import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Link } from 'react-router-dom';
import { useTasks } from "../context/TasksContext";
dayjs.extend(utc)

const TaskCard = ({ task }) => {
    const { deleteTask } = useTasks();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className='w-full bg-red-500 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            deleteTask(task._id)
                        }}>delete</button>
                    <Link to={`/tasks/${task._id}`}
                        className='w-full bg-blue-500 text-white px-4 py-2 rounded-md'
                    >edit</Link>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p>
                {dayjs(task.date).utc().format('DD/MM/YYYY')}
            </p>
        </div >
    )
}

export default TaskCard