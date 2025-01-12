'use client'

import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils' // Ensure you have the `cn` utility for class merging

interface DarkModeToggleProps {
    darkMode: boolean
    setDarkMode: (darkMode: boolean) => void
    className?: string
}

export default function DarkModeToggle({ darkMode, setDarkMode, className }: DarkModeToggleProps) {
    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
        } else {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
        }
        setDarkMode(!darkMode)
    }

    return (
        <div
            className={cn(
                'outline-none flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300',
                darkMode
                    ? 'bg-[#8B4513] border border-[#7a3a0f]' // Dark mode background (saddle brown)
                    : 'bg-[#f4e3c8] border border-[#8B4513]', // Light mode background (light saddle brown)
                className
            )}
            onClick={toggleDarkMode}
            role="button"
            tabIndex={0}
        >
            <div className="flex justify-between items-center w-full">
                {/* Sliding Circle */}
                <motion.div
                    className={cn(
                        'flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300',
                        darkMode
                            ? 'transform translate-x-0 bg-[#7a3a0f]' // Dark mode circle (darker saddle brown)
                            : 'transform translate-x-8 bg-[#8B4513]' // Light mode circle (saddle brown)
                    )}
                    animate={{
                        x: darkMode ? 0 : 32, // Adjust the sliding distance
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {darkMode ? (
                        <Moon className="w-4 h-4 text-[#f4e3c8]" strokeWidth={1.5} /> // Moon icon for dark mode (light saddle brown)
                    ) : (
                        <Sun className="w-4 h-4 text-[#f4e3c8]" strokeWidth={1.5} /> // Sun icon for light mode (light saddle brown)
                    )}
                </motion.div>

                {/* Static Icon (Opposite of the sliding circle) */}
                <div
                    className={cn(
                        'outline-none flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300',
                        darkMode
                            ? 'bg-transparent' // Hide in dark mode
                            : 'transform -translate-x-8' // Show in light mode
                    )}
                >
                    {darkMode ? (
                        <Sun className="w-4 h-4 text-[#f4e3c8]" strokeWidth={1.5} /> // Sun icon for dark mode (darker saddle brown)
                    ) : (
                        <Moon className="w-4 h-4 text-[#7a3a0f]" strokeWidth={1.5} /> // Moon icon for light mode (darker saddle brown)
                    )}
                </div>
            </div>
        </div>
    )
}