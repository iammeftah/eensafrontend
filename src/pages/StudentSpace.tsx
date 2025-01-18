'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActiveProjects from '../components/students/tabs/active-projects';
import Courses from '../components/students/tabs/courses';
import Chat from '../components/students/tabs/chat';
import EditProgress from '../components/students/tabs/edit-progress';
import Sidebar from '../components/students/tabs/app-sidebar';

export default function StudentSpace() {
    const [activeTab, setActiveTab] = useState('active-projects');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'active-projects':
                return <ActiveProjects />;
            case 'courses':
                return <Courses darkMode={darkMode} />;
            case 'chat':
                return <Chat darkMode={darkMode} />;
            case 'edit-progress':
                return <EditProgress darkMode={darkMode} />;
            default:
                return <ActiveProjects />;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-950">
            <Sidebar setActiveTab={setActiveTab} darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            <main className="flex-1 overflow-auto p-6 ml-96 bg-gradient-to-b from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-950">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }} // Fade in initial state
                        animate={{ opacity: 1 }} // Fade in animation
                        exit={{ opacity: 0 }} // Fade out animation
                        transition={{ duration: 0.3 }} // Transition duration
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}