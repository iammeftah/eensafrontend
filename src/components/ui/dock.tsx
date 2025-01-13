// src/components/ui/dock/Dock.tsx
import React, { useState } from "react";

interface DockProps {
    children: React.ReactNode;
}

export function Dock({ children }: DockProps) {
    return (
        <div className="flex justify-center items-center space-x-4 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
            {children}
        </div>
    );
}

interface DockItemProps {
    children: React.ReactNode;
    key?: string;
}

export function DockItem({ children, key }: DockItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            key={key}
            className="relative flex flex-col items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            {isHovered && (
                <div className="absolute -top-8 bg-black/75 text-white text-xs px-2 py-1 rounded-md">
                    {React.Children.toArray(children).find(
                        (child) => (child as React.ReactElement).type === DockLabel
                    )}
                </div>
            )}
        </div>
    );
}

interface DockIconProps {
    children: React.ReactNode;
}

export function DockIcon({ children }: DockIconProps) {
    return <div className="h-8 w-8 flex items-center justify-center">{children}</div>;
}

interface DockLabelProps {
    children: React.ReactNode;
}

export function DockLabel({ children }: DockLabelProps) {
    return <span>{children}</span>;
}