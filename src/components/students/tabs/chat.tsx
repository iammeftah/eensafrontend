import { useState } from 'react'
import { ChatCard, Message } from './chat/chat-card';

interface ChatProps {
    darkMode: boolean
}

const CURRENT_USER = {
    name: "You",
    avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-04-uuYHWIRvVPi01gEt6NwnGyjqLeeZhz.png"
};

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        content: "Hey everyone! How's the project coming along?",
        sender: {
            name: "Alice Johnson",
            avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6.png",
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
            isCurrentUser: true
        },
        timestamp: "10:30 AM",
        status: "delivered",
    }
];

export default function Chat({ darkMode }: ChatProps) {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);

    const handleSendMessage = (message: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            content: message,
            sender: {
                name: CURRENT_USER.name,
                avatar: CURRENT_USER.avatar,
                isOnline: true,
                isCurrentUser: true
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sent"
        };
        setMessages([...messages, newMessage]);
    };

    const handleReaction = (messageId: string, emoji: string) => {
        setMessages(messages.map(message => {
            if (message.id === messageId) {
                const existingReactionIndex = message.reactions?.findIndex(r => r.emoji === emoji);
                if (existingReactionIndex !== undefined && existingReactionIndex !== -1) {
                    const updatedReactions = [...(message.reactions || [])];
                    updatedReactions[existingReactionIndex] = {
                        ...updatedReactions[existingReactionIndex],
                        count: updatedReactions[existingReactionIndex].reacted
                            ? updatedReactions[existingReactionIndex].count - 1
                            : updatedReactions[existingReactionIndex].count + 1,
                        reacted: !updatedReactions[existingReactionIndex].reacted
                    };
                    return { ...message, reactions: updatedReactions };
                } else {
                    return {
                        ...message,
                        reactions: [...(message.reactions || []), { emoji, count: 1, reacted: true }]
                    };
                }
            }
            return message;
        }));
    };

    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-950">
            <ChatCard
                chatName="Project Team"
                membersCount={3}
                onlineCount={3}
                initialMessages={messages}
                currentUser={CURRENT_USER}
                theme={darkMode ? "dark" : "light"}
                onSendMessage={handleSendMessage}
                onReaction={handleReaction}
                onMoreClick={() => console.log('More clicked')}
                className="w-full h-full"
            />
        </div>
    );
}

