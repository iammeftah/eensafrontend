"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

const skills = [
    { full: 'Frontend', short: 'Front' },
    { full: 'Backend', short: 'Back' },
    { full: 'DevOps', short: 'DevOps' },
    { full: 'Security', short: 'Sec' },
    { full: 'UI/UX', short: 'UI' }
]

const teams = [
    {
        name: 'Balanced Team',
        skills: [
            { skill: 'Frontend', value: 80 },
            { skill: 'Backend', value: 75 },
            { skill: 'DevOps', value: 70 },
            { skill: 'Security', value: 65 },
            { skill: 'UI/UX', value: 85 },
        ],
        description: 'This team has a good balance of skills across different areas.',
    },
    {
        name: 'Frontend-Heavy Team',
        skills: [
            { skill: 'Frontend', value: 95 },
            { skill: 'Backend', value: 30 },
            { skill: 'DevOps', value: 20 },
            { skill: 'Security', value: 15 },
            { skill: 'UI/UX', value: 90 },
        ],
        description: 'Strong in frontend and UI/UX, needs improvement in other areas.',
    },
    {
        name: 'Backend-Heavy Team',
        skills: [
            { skill: 'Frontend', value: 25 },
            { skill: 'Backend', value: 95 },
            { skill: 'DevOps', value: 70 },
            { skill: 'Security', value: 80 },
            { skill: 'UI/UX', value: 20 },
        ],
        description: 'Excels in backend and security, limited frontend skills.',
    },
]

const saddleBrown = '#8B4513'
const complementaryColor = '#13678B'

export default function AnimatedSkillEquilibriumChart() {
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    const checkMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])

    useEffect(() => {
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [checkMobile])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    const currentTeam = teams[currentTeamIndex]
    const formattedSkills = currentTeam.skills.map(item => ({
        ...item,
        displaySkill: isMobile ?
            skills.find(s => s.full === item.skill)?.short :
            item.skill
    }))

    return (
        <div className="w-full max-w-3xl mx-auto bg-transparent rounded-lg shadow-lg overflow-hidden h-[600px] flex flex-col">
            <div className="p-6 flex flex-col h-full">
                <div className="mb-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTeam.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-2 text-[#8B4513] dark:text-[#9C5624]">{currentTeam.name}</h2>
                            <p className="text-neutral-800 dark:text-neutral-100">{currentTeam.description}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius={isMobile ? "65%" : "80%"}
                            data={formattedSkills}
                        >
                            <PolarGrid stroke={saddleBrown} />
                            <PolarAngleAxis
                                dataKey="displaySkill"
                                tick={{
                                    fill: saddleBrown,
                                    fontSize: isMobile ? 10 : 12,
                                    dy: isMobile ? 3 : 0
                                }}
                            />
                            <Radar
                                name="Skills"
                                dataKey="value"
                                stroke={saddleBrown}
                                fill={saddleBrown}
                                fillOpacity={0.6}
                                isAnimationActive={true}
                            />
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r={isMobile ? "35%" : "40%"}
                                fill="none"
                                stroke={complementaryColor}
                                strokeWidth={2}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1 }}
                                key={currentTeam.name}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

