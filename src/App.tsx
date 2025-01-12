import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import HomePage from './pages/Homepage'
import { useEffect } from 'react'

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
                    <Route path="/student" element={<div>Student Space - Coming Soon</div>} />
                    <Route path="/teacher" element={<div>Teacher Space - Coming Soon</div>} />
                    <Route path="/about" element={<div>About - Coming Soon</div>} />
                    <Route path="/contact" element={<div>Contact - Coming Soon</div>} />
                </Routes>
            </Router>
        </ParallaxProvider>
    )
}