import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import HomePage from './pages/Homepage'
import { useEffect } from 'react'
import About from './pages/About'
import StudentSpace from './pages/StudentSpace'

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
                    <Route path="/teacher" element={<div>Teacher Space - Coming Soon</div>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/contact" element={<div>Contact - Coming Soon</div>} />
                </Routes>
            </Router>
        </ParallaxProvider>
    )
}