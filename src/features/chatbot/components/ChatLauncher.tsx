import React from 'react';
import { MessageSquare, X } from 'lucide-react';

interface ChatLauncherProps {
    isOpen: boolean;
    onClick: () => void;
    unreadCount: number;
}

export const ChatLauncher: React.FC<ChatLauncherProps> = ({ isOpen, onClick, unreadCount }) => {
    return (
        <button
            onClick={onClick}
            className={`fixed bottom-28 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 z-[10000] hover:scale-105 ${!isOpen && unreadCount > 0 ? 'animate-pulse' : ''
                }`}
            aria-label="Toggle chat"
        >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}

            {!isOpen && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground ring-2 ring-background animate-in zoom-in">
                    {unreadCount}
                </span>
            )}
        </button>
    );
};
