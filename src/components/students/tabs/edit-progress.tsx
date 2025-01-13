import { useState } from 'react'
import { Button } from "../../../components/ui/button"

interface Task {
    id: number
    description: string
    completed: boolean
}

export default function EditProgress() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, description: "Complete project proposal", completed: true },
        { id: 2, description: "Design user interface", completed: false },
        { id: 3, description: "Implement backend API", completed: false },
    ])
    const [newTask, setNewTask] = useState('')

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), description: newTask, completed: false }])
            setNewTask('')
        }
    }

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const calculateProgress = () => {
        const completedTasks = tasks.filter(task => task.completed).length
        return tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Edit Progress</h2>
            <div className="bg-white/80 dark:bg-neutral-800/50 shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter new task"
                        className="w-full p-2 border rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400"
                    />
                    <Button
                        onClick={addTask}
                        className="mt-2 bg-[#8B4513] hover:bg-[#7a3a0f] text-white dark:bg-[#8B4513] dark:hover:bg-[#7a3a0f]"
                    >
                        Add Task
                    </Button>
                </div>
                <ul className="space-y-2">
                    {tasks.map((task) => (
                        <li key={task.id} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="mr-2"
                            />
                            <span className={`${task.completed ? 'line-through text-neutral-500 dark:text-neutral-400' : 'text-neutral-800 dark:text-neutral-200'}`}>
                                {task.description}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <div className="bg-neutral-200 dark:bg-neutral-600 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-green-500 h-full"
                            style={{ width: `${calculateProgress()}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                        Progress: {calculateProgress()}% ({tasks.filter(t => t.completed).length} of {tasks.length} tasks completed)
                    </p>
                </div>
            </div>
        </div>
    )
}