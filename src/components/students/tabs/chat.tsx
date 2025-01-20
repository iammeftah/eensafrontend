import { useState } from 'react';
import { ChatCard, Message } from './chat/chat-card';

interface ChatProps {
    darkMode: boolean;
}

const CURRENT_USER = {
    name: "You",
    avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-04-uuYHWIRvVPi01gEt6NwnGyjqLeeZhz.png",
};

const INITIAL_MESSAGES: { [key: string]: Message[] } = {
    project1: [
        {
            id: "1",
            content: "Hey everyone! How's the project coming along?",
            sender: {
                name: "Alice Johnson",
                avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
                isOnline: true,
            },
            timestamp: "10:24 AM",
            status: "read",
            reactions: [
                { emoji: "👍", count: 2, reacted: true },
                { emoji: "🎉", count: 1, reacted: false },
            ],
        },
        {
            id: "2",
            content: "It's going well! I've just finished the backend API.",
            sender: {
                name: "Bob Smith",
                avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
                isOnline: true,
            },
            timestamp: "10:26 AM",
            status: "delivered",
        },
        {
            id: "3",
            content: "Great progress! I'll start working on the frontend integration.",
            sender: {
                name: CURRENT_USER.name,
                avatar: CURRENT_USER.avatar,
                isOnline: true,
                isCurrentUser: true,
            },
            timestamp: "10:30 AM",
            status: "delivered",
        },
    ],
    project2: [
        {
            id: "4",
            content: "Let's discuss the design for the new feature.",
            sender: {
                name: "Charlie Brown",
                avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-03-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
                isOnline: true,
            },
            timestamp: "11:00 AM",
            status: "read",
        },
        {
            id: "5",
            content: "I've created some initial wireframes.",
            sender: {
                name: CURRENT_USER.name,
                avatar: CURRENT_USER.avatar,
                isOnline: true,
                isCurrentUser: true,
            },
            timestamp: "11:05 AM",
            status: "delivered",
        },
    ],
};

const ACTIVE_PROJECTS = [
    {
        id: "project1",
        name: "E-learning Platform",
        members: ["Alice Johnson", "Bob Smith", "You"],
    },
    {
        id: "project2",
        name: "New Feature Design",
        members: ["Charlie Brown", "You"],
    },
];

export default function Chat({ darkMode }: ChatProps) {
    const [messages, setMessages] = useState<{ [key: string]: Message[] }>(INITIAL_MESSAGES);
    const [selectedProject, setSelectedProject] = useState<string>("project1");

    const handleSendMessage = (message: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            content: message,
            sender: {
                name: CURRENT_USER.name,
                avatar: CURRENT_USER.avatar,
                isOnline: true,
                isCurrentUser: true,
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sent",
        };

        setMessages((prev) => ({
            ...prev,
            [selectedProject]: [...prev[selectedProject], newMessage],
        }));
    };

    const handleReaction = (messageId: string, emoji: string) => {
        setMessages((prev) => ({
            ...prev,
            [selectedProject]: prev[selectedProject].map((message) => {
                if (message.id === messageId) {
                    const existingReactionIndex = message.reactions?.findIndex((r) => r.emoji === emoji);
                    if (existingReactionIndex !== undefined && existingReactionIndex !== -1) {
                        const updatedReactions = [...(message.reactions || [])];
                        updatedReactions[existingReactionIndex] = {
                            ...updatedReactions[existingReactionIndex],
                            count: updatedReactions[existingReactionIndex].reacted
                                ? updatedReactions[existingReactionIndex].count - 1
                                : updatedReactions[existingReactionIndex].count + 1,
                            reacted: !updatedReactions[existingReactionIndex].reacted,
                        };
                        return { ...message, reactions: updatedReactions };
                    } else {
                        return {
                            ...message,
                            reactions: [...(message.reactions || []), { emoji, count: 1, reacted: true }],
                        };
                    }
                }
                return message;
            }),
        }));
    };

    return (
        <div className="flex-grow flex h-[calc(100vh-theme(spacing.16))] bg-gradient-to-b from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-950">
            {/* Chat Card */}
            <div className="flex-1">
                <ChatCard
                    chatName={ACTIVE_PROJECTS.find((p) => p.id === selectedProject)?.name || "Project Team"}
                    membersCount={ACTIVE_PROJECTS.find((p) => p.id === selectedProject)?.members.length || 3}
                    onlineCount={ACTIVE_PROJECTS.find((p) => p.id === selectedProject)?.members.length || 3}
                    initialMessages={messages[selectedProject]}
                    currentUser={CURRENT_USER}
                    theme={darkMode ? "dark" : "light"}
                    onSendMessage={handleSendMessage}
                    onReaction={handleReaction}
                    onMoreClick={() => console.log('More clicked')}
                    className="w-full"
                />
            </div>

            {/* Sidebar */}
            <div
                className={`w-72 bg-white/80 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-2xl ml-4 ${
                    darkMode ? "dark" : ""
                }`}
            >
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-4">Active Projects</h2>
                    <ul className="space-y-2">
                        {ACTIVE_PROJECTS.map((project) => (
                            <li
                                key={project.id}
                                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                                    selectedProject === project.id
                                        ? "bg-[#8B4513] text-white dark:bg-[#7a3a0f] dark:text-neutral-200"
                                        : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200"
                                }`}
                                onClick={() => setSelectedProject(project.id)}
                            >
                                <span className="text-sm">{project.name}</span>
                                <span className={`text-xs
                                ${
                                    selectedProject === project.id
                                        ? "text-white "
                                        : "text-neutral-500 dark:text-neutral-400"
                                }
                                block`}>
                                    Members: {project.members.join(", ")}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}