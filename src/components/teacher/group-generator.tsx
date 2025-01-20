"use client"

import { Button } from "../ui/button"

interface GroupGeneratorProps {
    students: Student[]
    groupSize: number
    onGenerateGroups: (groups: Group[]) => void
    isLoading: boolean
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

interface Group {
    id: string
    members: Student[]
}

export default function GroupGenerator({ students, groupSize, onGenerateGroups, isLoading }: GroupGeneratorProps) {
    const handleGenerateGroups = () => {
        if (students.length === 0) {
            console.error("No students available to generate groups")
            return
        }

        const shuffledStudents = [...students].sort(() => Math.random() - 0.5)
        const groups: Group[] = []
        const totalGroups = Math.floor(students.length / groupSize)
        const extraStudents = students.length % groupSize

        for (let i = 0; i < totalGroups; i++) {
            const group: Group = {
                id: `group-${i}`,
                members: shuffledStudents.slice(i * groupSize, (i + 1) * groupSize),
            }
            groups.push(group)
        }

        // Distribute extra students
        for (let i = 0; i < extraStudents; i++) {
            if (groups[i]) {
                groups[i].members.push(shuffledStudents[totalGroups * groupSize + i])
            }
        }

        // TODO: Implement AI-based skill balancing in the future
        onGenerateGroups(groups)
    }

    return (
        <Button
            onClick={handleGenerateGroups}
            className="mt-4 bg-[#8B4513] hover:bg-[#7a3a0f] text-white"
            disabled={isLoading}
        >
            {isLoading ? "Generating..." : "Generate Balanced Groups"}
        </Button>
    )
}

