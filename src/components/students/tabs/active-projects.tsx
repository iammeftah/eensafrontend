import { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle, User, X } from 'lucide-react';
import UserSkillChart from './UserSkillsChart';

interface User {
    id: string;
    name: string;
    avatar: string;
    skills: {
        frontend: number;
        backend: number;
        uiux: number;
        security: number;
        devops: number;
    };
}

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
    members: User[];
    tasks: Task[];
    progress: number;
}

const initialProjects: Project[] = [
    {
        id: '1',
        title: 'E-learning Platform Development',
        description: 'Creating an interactive online learning platform for students.',
        members: [
            {
                id: '1',
                name: 'Alice Johnson',
                avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
                skills: { frontend: 80, backend: 40, uiux: 70, security: 50, devops: 60 }
            },
            {
                id: '2',
                name: 'Bob Smith',
                avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
                skills: { frontend: 30, backend: 90, uiux: 20, security: 80, devops: 70 }
            },
            {
                id: '3',
                name: 'Charlie Brown',
                avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
                skills: { frontend: 60, backend: 70, uiux: 50, security: 60, devops: 80 }
            },
        ],
        tasks: [], // Initially, tasks are empty
        progress: 0,
    },
    // Add more projects as needed
];

// Mock AI API call to generate tasks
const generateTasks = async (): Promise<Task[]> => {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock AI-generated tasks (some tasks are completed)
    return [
        { id: 't1', description: 'Design user interface', completed: true },
        { id: 't2', description: 'Implement frontend routing', completed: false },
        { id: 't3', description: 'Set up backend API', completed: true },
        { id: 't4', description: 'Implement user authentication', completed: false },
        { id: 't5', description: 'Create wireframes', completed: true },
        { id: 't6', description: 'Implement HTTPS', completed: false },
        { id: 't7', description: 'Set up CI/CD pipeline', completed: false },
    ];
};

// Function to assign tasks to team members based on their skills
const assignTasksToMembers = (tasks: Task[], members: User[]): Task[] => {
    const assignedTasks: Task[] = [];
    const memberTaskCount: { [key: string]: number } = {};

    // Initialize task count for each member
    members.forEach(member => {
        memberTaskCount[member.id] = 0;
    });

    // Assign tasks to members with the least tasks and the highest skill in the relevant category
    tasks.forEach(task => {
        // Determine which skill category the task belongs to
        const skillCategory = task.description.toLowerCase().includes('frontend') ? 'frontend' :
            task.description.toLowerCase().includes('backend') ? 'backend' :
                task.description.toLowerCase().includes('ui/ux') || task.description.toLowerCase().includes('design') ? 'uiux' :
                    task.description.toLowerCase().includes('security') ? 'security' :
                        'devops';

        // Find the member with the highest skill in the relevant category and the least tasks
        const assignedMember = members.reduce((prev, current) => {
            if (current.skills[skillCategory] > prev.skills[skillCategory] ||
                (current.skills[skillCategory] === prev.skills[skillCategory] && memberTaskCount[current.id] < memberTaskCount[prev.id])) {
                return current;
            }
            return prev;
        });

        // Assign the task to the selected member
        assignedTasks.push({ ...task, assignedTo: assignedMember.id });
        memberTaskCount[assignedMember.id]++;
    });

    return assignedTasks;
};

const calculateProgress = (tasks: Task[]): number => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
};

export default function ActiveProjects() {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [tasksLoading, setTasksLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log("Projects:", projects); // Debugging log
        // Simulate loading delay
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [projects]);

    // Function to initialize tasks for a project
    const initializeTasks = async (projectId: string) => {
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex === -1) return;

        setTasksLoading(true);

        // Generate tasks using the mock AI API
        const tasks = await generateTasks();

        // Assign tasks to team members based on their skills
        const assignedTasks = assignTasksToMembers(tasks, projects[projectIndex].members);

        // Calculate progress
        const progress = calculateProgress(assignedTasks);

        // Update the project with the assigned tasks and progress
        const updatedProjects = [...projects];
        updatedProjects[projectIndex] = {
            ...updatedProjects[projectIndex],
            tasks: assignedTasks,
            progress: progress,
        };

        setProjects(updatedProjects);
        setTasksLoading(false);
    };

    const toggleProject = (projectId: string) => {
        if (expandedProject !== projectId) {
            // Initialize tasks when the project is expanded for the first time
            initializeTasks(projectId);
        }
        setExpandedProject(expandedProject === projectId ? null : projectId);
    };

    const openUserModal = (user: User) => {
        setSelectedUser(user);
    };

    const closeUserModal = () => {
        setSelectedUser(null);
    };

    // Function to group tasks by their skill category
    const groupTasksByCategory = (tasks: Task[]) => {
        const groupedTasks: { [key: string]: Task[] } = {
            Frontend: [],
            Backend: [],
            'UI/UX': [],
            Security: [],
            DevOps: [],
        };

        tasks.forEach(task => {
            const skillCategory = task.description.toLowerCase().includes('frontend') ? 'Frontend' :
                task.description.toLowerCase().includes('backend') ? 'Backend' :
                    task.description.toLowerCase().includes('ui/ux') || task.description.toLowerCase().includes('design') ? 'UI/UX' :
                        task.description.toLowerCase().includes('security') ? 'Security' :
                            'DevOps';

            groupedTasks[skillCategory].push(task);
        });

        return groupedTasks;
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Active Projects</h2>
            {loading ? (
                // Skeleton loading effect for projects
                <div className="space-y-6">
                    {[1, 2].map((index) => (
                        <div
                            key={index}
                            className="bg-white/80 dark:bg-neutral-800/50 shadow-md rounded-lg p-6"
                        >
                            <div className="animate-pulse space-y-4">
                                <div className="flex justify-between items-center">
                                    {/* Project Title Skeleton */}
                                    <div className="h-6 bg-neutral-300 dark:bg-neutral-700 rounded w-1/3"></div>
                                    {/* View Details Button Skeleton */}
                                    <div className="h-10 bg-neutral-300 dark:bg-neutral-700 rounded w-28"></div>
                                </div>
                                {/* Project Description Skeleton */}
                                <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : projects.length > 0 ? (
                projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white/80 dark:bg-neutral-800/50 shadow-md rounded-lg p-6"
                    >
                        {/* Always show project title, description, and "View Details" button */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{project.title}</h3>
                            <Button
                                onClick={() => toggleProject(project.id)}
                                className="bg-[#8B4513] hover:bg-[#7a3a0f] text-white dark:bg-[#8B4513] dark:hover:bg-[#7a3a0f]"
                            >
                                {expandedProject === project.id ? 'Hide Details' : 'View Details'}
                            </Button>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">{project.description}</p>

                        {/* Expanded Details (only shown when expanded) */}
                        <AnimatePresence>
                            {expandedProject === project.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Team Members */}
                                    <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mt-4 mb-2">Team Members:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        {project.members.map((member) => (
                                            <div
                                                key={member.id}
                                                className="flex items-center gap-3 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 rounded-lg"
                                                onClick={() => openUserModal(member)}
                                            >
                                                <img
                                                    src={member.avatar || "/placeholder.svg"}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <span className="text-neutral-600 dark:text-neutral-400">{member.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tasks */}
                                    <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mt-6 mb-4">Tasks:</h4>
                                    {tasksLoading ? (
                                        // Task Skeletons while tasks are loading
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {['Frontend', 'Backend', 'UI/UX', 'Security', 'DevOps'].map((category) => (
                                                <div key={category} className="space-y-4">
                                                    <h5 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                                        {category}
                                                    </h5>
                                                    <div className="space-y-2">
                                                        {[1, 2].map((taskIndex) => (
                                                            <div key={taskIndex} className="h-16 bg-neutral-100 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                        >
                                            {Object.entries(groupTasksByCategory(project.tasks)).map(([category, tasks]) => (
                                                <motion.div
                                                    key={category}
                                                    className="space-y-4"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <h5 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                                        {category}
                                                    </h5>
                                                    <div className="space-y-2">
                                                        {tasks.length > 0 ? (
                                                            tasks.map((task) => (
                                                                <motion.div
                                                                    key={task.id}
                                                                    className="p-4 bg-neutral-100 dark:bg-neutral-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ duration: 0.3 }}
                                                                >
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <div className="flex items-center gap-2">
                                                                            {task.completed ? (
                                                                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                                            ) : (
                                                                                <Check className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                                                                            )}
                                                                            <span className={`${task.completed ? 'line-through text-neutral-500 dark:text-neutral-400' : 'text-neutral-800 dark:text-neutral-200'} text-sm`}>
                                                                                {task.description}
                                                                            </span>
                                                                        </div>
                                                                        {project.members.find(m => m.id === task.assignedTo) && (
                                                                            <img
                                                                                src={project.members.find(m => m.id === task.assignedTo)?.avatar || "/placeholder.svg"}
                                                                                alt={project.members.find(m => m.id === task.assignedTo)?.name || "Unknown"}
                                                                                className="w-6 h-6 rounded-full"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                                No tasks assigned for this category yet. Stay tuned for updates!
                                                            </p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <motion.div
                                            className="bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mb-2 overflow-hidden"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.progress}%` }}
                                            transition={{ duration: 1, ease: 'easeInOut' }}
                                        >
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                            />
                                        </motion.div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Progress: {project.progress}%
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))
            ) : (
                <p className="text-neutral-600 dark:text-neutral-400">No projects found.</p>
            )}

            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-50"
                        onClick={closeUserModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white dark:bg-neutral-800 shadow-xl rounded-lg p-6 max-w-md w-full mx-4 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeUserModal}
                                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={selectedUser.avatar || "/placeholder.svg"}
                                    alt={selectedUser.name}
                                    className="w-16 h-16 rounded-full"
                                />
                                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                                    {selectedUser.name}
                                </h3>
                            </div>

                            <div className="space-y-4 bg-white dark:bg-neutral-800">
                                <h4 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                                    Skills
                                </h4>
                                <UserSkillChart
                                    frontend={selectedUser.skills.frontend}
                                    backend={selectedUser.skills.backend}
                                    uiux={selectedUser.skills.uiux}
                                    security={selectedUser.skills.security}
                                    devops={selectedUser.skills.devops}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

