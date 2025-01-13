import { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle } from 'lucide-react';
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

interface Project {
    id: string;
    title: string;
    description: string;
    members: User[];
    tasks: { id: string; description: string; completed: boolean }[];
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
        tasks: [
            { id: 't1', description: 'Design user interface', completed: true },
            { id: 't2', description: 'Implement authentication system', completed: true },
            { id: 't3', description: 'Develop course management module', completed: false },
            { id: 't4', description: 'Create interactive quizzes', completed: false },
        ],
        progress: 50,
    },
    // Add more projects as needed
];

export default function ActiveProjects() {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        console.log("Projects:", projects); // Debugging log
    }, [projects]);

    const toggleProject = (projectId: string) => {
        setExpandedProject(expandedProject === projectId ? null : projectId);
    };

    const openUserModal = (user: User) => {
        setSelectedUser(user);
    };

    const closeUserModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Active Projects</h2>
            {projects.length > 0 ? (
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
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <span className="text-neutral-600 dark:text-neutral-400">{member.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tasks */}
                                    <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mt-4 mb-2">Tasks:</h4>
                                    <ul className="space-y-2 mb-4">
                                        {project.tasks.map((task) => (
                                            <li key={task.id} className="flex items-center gap-2">
                                                {task.completed ? (
                                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                ) : (
                                                    <Check className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                                                )}
                                                <span className={`${task.completed ? 'line-through text-neutral-500 dark:text-neutral-400' : 'text-neutral-800 dark:text-neutral-200'}`}>
                                                    {task.description}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

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

            {/* User Skills Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                        onClick={closeUserModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white/90 dark:bg-neutral-800/90 rounded-lg p-6 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={selectedUser.avatar}
                                    alt={selectedUser.name}
                                    className="w-16 h-16 rounded-full"
                                />
                                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                                    {selectedUser.name}
                                </h3>
                            </div>
                            <div className="space-y-4">
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
                            <Button
                                onClick={closeUserModal}
                                className="mt-6 w-full bg-[#8B4513] hover:bg-[#7a3a0f] text-white dark:bg-[#8B4513] dark:hover:bg-[#7a3a0f]"
                            >
                                Close
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}