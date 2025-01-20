import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { BookOpen, MessageCircle, PenTool, Home } from 'lucide-react'
import DarkModeToggle from '../../../components/layout/DarkModeToggle'
import { Link } from 'react-router-dom'

interface SidebarProps {
    setActiveTab: (tab: string) => void
    darkMode: boolean
    toggleDarkMode: () => void
}

export default function Sidebar({ setActiveTab, darkMode, toggleDarkMode }: SidebarProps) {
    const [activeItem, setActiveItem] = useState('active-projects')

    const navItems = [
        { title: 'Active Projects', id: 'active-projects', icon: Home },
        { title: 'Courses', id: 'courses', icon: BookOpen },
        { title: 'Chat', id: 'chat', icon: MessageCircle },
        { title: 'Edit Progress', id: 'edit-progress', icon: PenTool },
    ]

    const handleItemClick = (id: string) => {
        setActiveItem(id)
        setActiveTab(id)
    }

    return (
        <div className="w-96 bg-white/80 dark:bg-neutral-800/50 shadow-md flex flex-col h-screen fixed left-0 top-0 z-10">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex flex-col items-center">
                <a href="/">
                    <img src="/logoensam.svg" alt="ENSA Marrakech Logo" className="w-24 h-24 mb-4" />
                </a>
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Student Space</h1>
                    <DarkModeToggle darkMode={darkMode} setDarkMode={toggleDarkMode} className="mb-4" />
                </div>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <Button
                                variant="ghost"
                                onClick={() => handleItemClick(item.id)}
                                className={`w-full justify-start px-4 py-2 my-1 ${
                                    activeItem === item.id
                                        ? 'bg-amber-100 dark:bg-stone-700 font-semibold text-neutral-800 dark:text-neutral-200'
                                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-amber-50 dark:hover:bg-neutral-700'
                                }`}
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 flex flex-row gap-2">
                <Link
                    to="/student-profile"
                    className="w-full mb-2 bg-[#8B4513] hover:bg-[#7a3a0f] text-white dark:bg-[#8B4513] dark:hover:bg-[#7a3a0f] px-4 py-2 rounded-md text-center block"
                >
                    Profile
                </Link>
                <Button variant="outline" className="w-full border-[#8B4513] text-[#8B4513] hover:bg-amber-50 dark:border-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700">
                    Logout
                </Button>
            </div>
        </div>
    )
}

