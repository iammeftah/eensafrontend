import { useState } from 'react';
import { Button } from "../../../components/ui/button";

interface Task {
    id: string;
    description: string;
    completed: boolean;
    assignedTo?: string; // ID of the user assigned to the task
}

interface Project {
    id: string;
    title: string;
    description: string;
    tasks: Task[];
    members: string[]; // Add this property
}

interface User {
    id: string;
    name: string;
    avatar: string;
}

interface EditProgressProps {
    darkMode: boolean; // Add this prop
}

// Mock data for the connected user (Alice Johnson)
const CURRENT_USER: User = {
    id: "1", // Alice Johnson's ID
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
};

// Mock data for projects and tasks
const MOCK_PROJECTS: Project[] = [
    {
        id: "1",
        title: "E-learning Platform Development",
        description: "Creating an interactive online learning platform for students.",
        tasks: [
            { id: "t1", description: "Design user interface", completed: true, assignedTo: "1" }, // Completed by Alice
            { id: "t2", description: "Implement frontend routing", completed: false, assignedTo: "1" }, // Assigned to Alice
            { id: "t3", description: "Set up backend API", completed: true, assignedTo: "2" }, // Assigned to Bob
            { id: "t4", description: "Implement user authentication", completed: false, assignedTo: "3" }, // Assigned to Charlie
        ],
        members: ["Alice Johnson", "Bob Smith", "Charlie Brown"], // Add members
    },
    {
        id: "2",
        title: "New Feature Design",
        description: "Designing a new feature for the platform.",
        tasks: [
            { id: "t5", description: "Create wireframes", completed: true, assignedTo: "3" }, // Assigned to Charlie
            { id: "t6", description: "Implement HTTPS", completed: false, assignedTo: "2" }, // Assigned to Bob
            { id: "t7", description: "Set up CI/CD pipeline", completed: false, assignedTo: "1" }, // Assigned to Alice
        ],
        members: ["Charlie Brown", "Alice Johnson"], // Add members
    },
];

export default function EditProgress({ darkMode }: EditProgressProps) {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    // Filter tasks assigned to the current user for the selected project
    const filterTasksForUser = (projectId: string) => {
        const project = MOCK_PROJECTS.find((p) => p.id === projectId);
        if (project) {
            const userTasks = project.tasks.filter((task) => task.assignedTo === CURRENT_USER.id);
            setTasks(userTasks);
        }
    };

    // Handle project selection
    const handleProjectSelect = (projectId: string) => {
        setSelectedProject(projectId);
        filterTasksForUser(projectId);
    };

    // Toggle task completion status
    const toggleTaskCompletion = (taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div className="flex-grow flex h-[calc(100vh-theme(spacing.16))] bg-gradient-to-b from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-950">

            {/* Main Content */}
            <div className="flex-1 bg-white/80 dark:bg-neutral-800/50 shadow-md rounded-2xl p-6">
                <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">Edit Progress</h2>
                {selectedProject ? (
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                            Your Tasks in {MOCK_PROJECTS.find((p) => p.id === selectedProject)?.title}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={`p-4 rounded-lg shadow-sm transition-all ${
                                            task.completed
                                                ? "bg-green-100/50 dark:bg-green-900/20"
                                                : "bg-neutral-100 dark:bg-neutral-700"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {/* Custom Toggle */}
                                                <button
                                                    onClick={() => toggleTaskCompletion(task.id)}
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                                        task.completed
                                                            ? "bg-green-500 hover:bg-green-600"
                                                            : "bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                                                    }`}
                                                >
                                                    {task.completed && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 text-white"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                                <span
                                                    className={`${
                                                        task.completed
                                                            ? "line-through text-neutral-500 dark:text-neutral-400"
                                                            : "text-neutral-800 dark:text-neutral-200"
                                                    }`}
                                                >
                                                    {task.description}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-neutral-500 dark:text-neutral-400">
                                    No tasks assigned to you in this project.
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Select a project to view your tasks.
                    </p>
                )}
            </div>

            {/* Sidebar */}
            <div
                className={`w-72 bg-white/80 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-2xl ml-4 ${
                    darkMode ? "dark" : ""
                }`}
            >
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-4">Active Projects</h2>
                    <ul className="space-y-2">
                        {MOCK_PROJECTS.map((project) => (
                            <li
                                key={project.id}
                                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                                    selectedProject === project.id
                                        ? "bg-[#8B4513] text-white dark:bg-[#7a3a0f] dark:text-neutral-200"
                                        : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200"
                                }`}
                                onClick={() => handleProjectSelect(project.id)}
                            >
                                <span className="text-sm">{project.title}</span>
                                <span className={`text-xs
                                ${
                                    selectedProject === project.id
                                        ? "text-white "
                                        : "text-neutral-500 dark:text-neutral-400"
                                }
                                block`}>
                                    Members: {project.members.join(", ")}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}