import { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { FileText, FileSearch, BookOpen, Clipboard, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Document {
    name: string;
    type: 'Course' | 'Exercise' | 'Old Exam' | 'Note';
    link: string;
}

interface Subject {
    id: number;
    name: string;
    courses: Document[];
    exercises: Document[];
    oldExams: Document[];
    notes: Document[];
}

interface Semester {
    id: number;
    name: string;
    scholarYear: string;
    subjects: Subject[];
}

const getScholarYear = (): string => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (currentMonth >= 9) {
        return `${currentYear}/${currentYear + 1}`;
    } else {
        return `${currentYear - 1}/${currentYear}`;
    }
};

const semesters: Semester[] = [
    {
        id: 1,
        name: 'First Semester',
        scholarYear: getScholarYear(),
        subjects: [
            {
                id: 1,
                name: 'Web Development',
                courses: [
                    { name: 'Introduction to HTML', type: 'Course', link: '/pdfs/html-intro.pdf' },
                    { name: 'CSS Layouts', type: 'Course', link: '/pdfs/css-layouts.pdf' },
                ],
                exercises: [
                    { name: 'HTML Basics Exercise', type: 'Exercise', link: '/pdfs/html-exercise.pdf' },
                ],
                oldExams: [
                    { name: 'Web Development Final Exam 2022', type: 'Old Exam', link: '/pdfs/webdev-final-2022.pdf' },
                ],
                notes: [
                    { name: 'Web Dev Notes', type: 'Note', link: 'https://notion.so/web-dev-notes' },
                ],
            },
            {
                id: 2,
                name: 'Data Structures and Algorithms',
                courses: [
                    { name: 'Array and Linked Lists', type: 'Course', link: '/pdfs/arrays-linked-lists.pdf' },
                    { name: 'Graph Theory', type: 'Course', link: '/pdfs/graph-theory.pdf' },
                ],
                exercises: [
                    { name: 'Sorting Algorithms Exercise', type: 'Exercise', link: '/pdfs/sorting-exercise.pdf' },
                ],
                oldExams: [
                    { name: 'DSA Midterm Exam 2023', type: 'Old Exam', link: '/pdfs/dsa-midterm-2023.pdf' },
                ],
                notes: [],
            },
            { id: 3, name: 'Subject 3', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 4, name: 'Subject 4', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 5, name: 'Subject 5', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 6, name: 'Subject 6', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 7, name: 'Subject 7', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 8, name: 'Subject 8', courses: [], exercises: [], oldExams: [], notes: [] },
        ],
    },
    {
        id: 2,
        name: 'Second Semester',
        scholarYear: getScholarYear(),
        subjects: [
            {
                id: 9,
                name: 'Artificial Intelligence',
                courses: [
                    { name: 'Introduction to AI', type: 'Course', link: '/pdfs/ai-intro.pdf' },
                ],
                exercises: [
                    { name: 'AI Basics Exercise', type: 'Exercise', link: '/pdfs/ai-exercise.pdf' },
                ],
                oldExams: [
                    { name: 'AI Final Exam 2023', type: 'Old Exam', link: '/pdfs/ai-final-2023.pdf' },
                ],
                notes: [
                    { name: 'AI Notes', type: 'Note', link: 'https://notion.so/ai-notes' },
                ],
            },
            { id: 10, name: 'Subject 10', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 11, name: 'Subject 11', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 12, name: 'Subject 12', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 13, name: 'Subject 13', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 14, name: 'Subject 14', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 15, name: 'Subject 15', courses: [], exercises: [], oldExams: [], notes: [] },
            { id: 16, name: 'Subject 16', courses: [], exercises: [], oldExams: [], notes: [] },
        ],
    },
];

export default function Courses({ darkMode }: { darkMode: boolean }) {
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [activeTab, setActiveTab] = useState<'courses' | 'exercises' | 'oldExams' | 'notes'>('courses');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tabs = ['courses', 'exercises', 'oldExams', 'notes'] as const;

    const openSubject = (subject: Subject) => {
        setSelectedSubject(subject);
        setActiveTab('courses');
    };

    const goBack = () => {
        setSelectedSubject(null);
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'Course':
                return <FileText className="w-5 h-5" />;
            case 'Exercise':
                return <FileSearch className="w-5 h-5" />;
            case 'Old Exam':
                return <Clipboard className="w-5 h-5" />;
            case 'Note':
                return <BookOpen className="w-5 h-5" />;
            default:
                return null;
        }
    };

    const TabButton = ({ tab }: { tab: typeof tabs[number] }) => (
        <Button
            variant="ghost"
            onClick={() => setActiveTab(tab)}
            className={`w-full relative px-4 py-2 ${
                activeTab === tab
                    ? `${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`
                    : `${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`
            }`}
        >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Button>
    );

    const renderSubjectList = () => (
        semesters.map((semester) => (
            <div key={semester.id} className="space-y-6">
                <h3 className={`text-2xl font-semibold ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    {semester.name} ({semester.scholarYear})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {semester.subjects.map((subject) => (
                        <div
                            key={subject.id}
                            className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white/80'} shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow`}
                            onClick={() => openSubject(subject)}
                        >
                            <h4 className={`text-xl font-semibold ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                {subject.name}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        ))
    );

    const renderTabContent = () => {
        const content = {
            courses: selectedSubject?.courses,
            exercises: selectedSubject?.exercises,
            oldExams: selectedSubject?.oldExams,
            notes: selectedSubject?.notes
        }[activeTab];

        return content?.length ? (
            content.map((item, index) => (
                <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 p-2 ${darkMode ? 'text-neutral-200 hover:bg-neutral-700/50' : 'text-neutral-800 hover:bg-neutral-100'} rounded-md transition-colors`}
                >
                    {getIconForType(item.type)}
                    <span>{item.name}</span>
                </a>
            ))
        ) : (
            <p className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                No content posted yet.
            </p>
        );
    };

    return (
        <div className={`space-y-6 ${darkMode ? 'dark' : ''}`}>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
                Courses
            </h2>

            <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="fixed bottom-4 right-4 p-3 bg-[#8B4513] text-white rounded-full shadow-lg lg:hidden z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Menu className="h-6 w-6" />
            </motion.button>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} w-3/4 h-full p-4 overflow-auto`}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderSubjectList()}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="hidden lg:block">
                <AnimatePresence mode="wait">
                    {selectedSubject ? (
                        <motion.div
                            key="subject-details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                onClick={goBack}
                                className={`flex items-center gap-2 mb-4 ${darkMode ? 'text-[#8B4513] hover:text-[#7a3a0f]' : 'text-[#8B4513] hover:text-[#7a3a0f]'}`}
                            >
                                <span>←</span>
                                <span>Back to Subjects</span>
                            </button>

                            <div className={`${darkMode ? 'bg-neutral-800/50' : 'bg-white/80'} shadow-md rounded-lg p-6`}>
                                <h3 className={`text-2xl font-bold ${darkMode ? 'text-neutral-200' : 'text-neutral-800'} mb-4`}>
                                    {selectedSubject.name}
                                </h3>

                                <div className="relative border-b border-neutral-200 dark:border-neutral-700 mb-4">
                                    <div className="flex">
                                        {tabs.map((tab) => (
                                            <TabButton key={tab} tab={tab} />
                                        ))}
                                    </div>
                                    <motion.div
                                        className={`absolute bottom-0 h-0.5 ${
                                            darkMode ? 'bg-neutral-200' : 'bg-neutral-800'
                                        }`}
                                        initial={false}
                                        animate={{
                                            width: '25%',
                                            x: `${tabs.indexOf(activeTab) * 100}%`
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    {renderTabContent()}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="subject-list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderSubjectList()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}