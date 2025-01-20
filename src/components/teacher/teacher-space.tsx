"use client"

import { useState } from "react"
import ProjectManager from "./project-manager"
import ClassSelector from "./class-selector"

interface Class {
    id: string
    name: string
    grade: string
    major: string
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

const MOCK_CLASSES: Class[] = [
    {
        id: "CI1-GI",
        name: "CI1 - GI",
        grade: "1st Year",
        major: "Computer Engineering",
        students: Array.from({ length: 52 }, (_, i) => ({
            id: `student-${i + 1}`,
            name: `Student ${i + 1}`,
            skills: {
                frontend: Math.floor(Math.random() * 100),
                backend: Math.floor(Math.random() * 100),
                uiux: Math.floor(Math.random() * 100),
                security: Math.floor(Math.random() * 100),
                devops: Math.floor(Math.random() * 100),
            },
        })),
    },
    {
        id: "CI2-GE",
        name: "CI2 - GE",
        grade: "2nd Year",
        major: "Electrical Engineering",
        students: Array.from({ length: 48 }, (_, i) => ({
            id: `student-${i + 1}`,
            name: `Student ${i + 1}`,
            skills: {
                frontend: Math.floor(Math.random() * 100),
                backend: Math.floor(Math.random() * 100),
                uiux: Math.floor(Math.random() * 100),
                security: Math.floor(Math.random() * 100),
                devops: Math.floor(Math.random() * 100),
            },
        })),
    },
    {
        id: "CI3-GS",
        name: "CI3 - GS",
        grade: "3rd Year",
        major: "Software Engineering",
        students: Array.from({ length: 50 }, (_, i) => ({
            id: `student-${i + 1}`,
            name: `Student ${i + 1}`,
            skills: {
                frontend: Math.floor(Math.random() * 100),
                backend: Math.floor(Math.random() * 100),
                uiux: Math.floor(Math.random() * 100),
                security: Math.floor(Math.random() * 100),
                devops: Math.floor(Math.random() * 100),
            },
        })),
    },
]

export default function TeacherSpace() {
    const [selectedClass, setSelectedClass] = useState<Class | null>(null)

    const handleClassSelect = (classId: string) => {
        const selected = MOCK_CLASSES.find((c) => c.id === classId)
        setSelectedClass(selected || null)
    }

    return (
        <div className="flex-grow flex h-[calc(100vh-theme(spacing.16))] bg-gradient-to-b from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-950">
            <div className="flex-1 bg-white/80 dark:bg-neutral-800/50 shadow-md rounded-2xl p-6 m-4 overflow-auto">
                <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">Teacher Space</h2>
                {selectedClass ? (
                    <ProjectManager class={selectedClass} />
                ) : (
                    <ClassSelector classes={MOCK_CLASSES} onSelectClass={handleClassSelect} />
                )}
            </div>
        </div>
    )
}
