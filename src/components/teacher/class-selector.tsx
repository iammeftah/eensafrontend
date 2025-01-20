"use client"

import { Button } from "../ui/button"

interface ClassSelectorProps {
    classes: Class[]
    onSelectClass: (classId: string) => void
}

interface Class {
    id: string
    name: string
    grade: string
    major: string
}

export default function ClassSelector({ classes, onSelectClass }: ClassSelectorProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300">Select a Class</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((classItem) => (
                    <Button
                        key={classItem.id}
                        onClick={() => onSelectClass(classItem.id)}
                        className="w-full justify-start px-4 py-6 text-left bg-white dark:bg-neutral-800 hover:bg-amber-50 dark:hover:bg-neutral-700 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <div className="flex flex-col items-start">
                            <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{classItem.name}</span>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {classItem.grade} - {classItem.major}
              </span>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    )
}
