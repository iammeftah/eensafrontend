"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GroupGenerator from "./group-generator"
import { Button } from "../ui/button"

import { Loader2, Trash2 } from "lucide-react"

interface ProjectManagerProps {
    class: Class
}

interface Class {
    id: string
    name: string
    students: Student[]
}

interface Student {
    id: string
    name: string
    skills: {
        frontend: number
        backend: number
        uiux: number
        security: number
        devops: number
    }
}

interface Project {
    id: string
    title: string
    groups: Group[]
    groupsGenerated: boolean
}

interface Group {
    id: string
    members: Student[]
}

export default function ProjectManager({ class: selectedClass }: ProjectManagerProps) {
    const [projects, setProjects] = useState<Project[]>([])
    const [newProjectTitle, setNewProjectTitle] = useState("")
    const [groupSize, setGroupSize] = useState(5)
    const [isLoading, setIsLoading] = useState(false)

    const handleCreateProject = () => {
        if (!newProjectTitle.trim()) return

        const newProject: Project = {
            id: Date.now().toString(),
            title: newProjectTitle,
            groups: [],
            groupsGenerated: false,
        }

        setProjects((prev) => [...prev, newProject])
        setNewProjectTitle("")
    }

    const handleGenerateGroups = async (projectId: string, generatedGroups: Group[]) => {
        setIsLoading(true)
        try {
            // Simulate API call to store groups in the database
            await new Promise((resolve) => setTimeout(resolve, 2000))

            const updatedProjects = projects.map((p) =>
                p.id === projectId ? { ...p, groups: generatedGroups, groupsGenerated: true } : p,
            )
            setProjects(updatedProjects)
        } catch (error) {
            console.error("Error generating groups:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteProject = (projectId: string) => {
        setProjects((prev) => prev.filter((p) => p.id !== projectId))
    }

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
                Manage Projects for {selectedClass.name}{" "}
                <span className="text-lg font-normal text-neutral-500 dark:text-neutral-400">
          ({selectedClass.students.length} students)
        </span>
            </h3>

            <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6">
                <h4 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-4">Create New Project</h4>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="project-title" className="w-1/4">
                            Project Title:
                        </label>
                        <input
                            id="project-title"
                            type="text"
                            value={newProjectTitle}
                            onChange={(e) => setNewProjectTitle(e.target.value)}
                            placeholder="Enter project title"
                            className="w-3/4"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="group-size" className="w-1/4">
                            Group Size:
                        </label>
                        <input
                            id="group-size"
                            type="number"
                            value={groupSize}
                            onChange={(e) => setGroupSize(Number(e.target.value))}
                            placeholder="Group size"
                            className="w-1/4"
                        />
                        <Button onClick={handleCreateProject} className="bg-[#8B4513] hover:bg-[#7a3a0f] text-white ml-auto">
                            Create Project
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <AnimatePresence>
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{project.title}</h4>
                                <Button
                                    onClick={() => handleDeleteProject(project.id)}
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                            {!project.groupsGenerated && (
                                <GroupGenerator
                                    students={selectedClass.students}
                                    groupSize={groupSize}
                                    onGenerateGroups={(groups) => handleGenerateGroups(project.id, groups)}
                                    isLoading={isLoading}
                                />
                            )}

                            {isLoading && (
                                <div className="flex items-center justify-center space-x-2 mt-4">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <p>Generating balanced groups...</p>
                                </div>
                            )}

                            {project.groups.length > 0 && (
                                <div className="mt-6 space-y-4">
                                    <h5 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">Generated Groups</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {project.groups.map((group, index) => (
                                            <div key={group.id} className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-4">
                                                <h6 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Group {index + 1}</h6>
                                                <ul className="list-disc list-inside">
                                                    {group.members.map((member) => (
                                                        <li key={member.id} className="text-neutral-600 dark:text-neutral-400">
                                                            {member.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

