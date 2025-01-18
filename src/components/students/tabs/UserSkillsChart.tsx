"use client"

import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { User } from '@/types/User';

const saddleBrown = '#8B4513'
const complementaryColor = '#13678B'

interface UserSkillChartProps {
    frontend: number;
    backend: number;
    uiux: number;
    security: number;
    devops: number;
}

export default function UserSkillChart({ frontend, backend, uiux, security, devops }: UserSkillChartProps) {
    const data = [
        { skill: 'Frontend', value: frontend },
        { skill: 'Backend', value: backend },
        { skill: 'UI/UX', value: uiux },
        { skill: 'Security', value: security },
        { skill: 'DevOps', value: devops },
    ]

    return (
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-neutral-800 rounded-lg overflow-hidden h-[400px] flex flex-col">
            <div className="p-6 flex flex-col h-full">
                <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            data={data}
                        >
                            <PolarGrid stroke={saddleBrown} />
                            <PolarAngleAxis
                                dataKey="skill"
                                tick={{
                                    fill: saddleBrown,
                                    fontSize: 12,
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
                                r="40%"
                                fill="none"
                                stroke={complementaryColor}
                                strokeWidth={2}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1 }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}