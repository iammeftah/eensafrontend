import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import HomePage from './pages/Homepage'
import { useEffect } from 'react'
import About from './pages/About'
import StudentSpace from './pages/StudentSpace'
import StudentProfile from './components/students/StudentProfile'
import { Student } from './types/student'
import { StudentProfileProvider } from './components/students/StudentProfileContext'
import TeacherSpace from './components/teacher/teacher-space'

export const mockStudent: Student = {
    id: '1',
    name: 'MEFTAH Ahmed-reda',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    skills: {
        frontend: 75,
        backend: 85,
        uiux: 70,
        security: 65,
        devops: 60
    },
    personalInfo: {
        idNumber: 'BW15024',
        birthDate: '16/08/2001',
        birthPlace: 'CASABLANCA ANFA',
        nationality: 'MAROCAINE'
    },
    academicInfo: {
        studentId: '1923376',
        cneNumber: 'R134889058',
        level: 'CI5 (Troisième Année Cycle Ingénieur)',
        major: 'GI (Génie Informatique)'
    },
    contact: {
        email: 'meftahahmedreda02@gmail.com',
        phone: 'Non renseigné'
    }
}

export default function App() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual'
        }
    }, [])


    return (
        <ParallaxProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/student" element={<StudentSpace/>} />
                    <Route path="/teacher" element={<TeacherSpace/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/contact" element={<div>Contact - Coming Soon</div>} />
                    <Route
                        path="/student-profile"
                        element={
                            <StudentProfileProvider>
                                <StudentProfile />
                            </StudentProfileProvider>
                        }
                    />

                </Routes>
            </Router>
        </ParallaxProvider>
    )
}