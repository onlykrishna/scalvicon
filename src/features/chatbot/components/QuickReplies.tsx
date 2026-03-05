import React from 'react';
import { CHAT_CONFIG } from '../constants/chatConfig';

interface QuickRepliesProps {
    onSelect: (reply: string) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ onSelect }) => {
    return (
        <div className="flex flex-wrap gap-2 mt-2 mb-4 animate-fade-in px-1 cursor-pointer">
            {CHAT_CONFIG.quickReplies.map((reply, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(reply.value)}
                    className="text-xs bg-background border border-primary/20 text-foreground hover:bg-primary/10 transition-colors px-3 py-1.5 rounded-full"
                >
                    {reply.label}
                </button>
            ))}
        </div>
    );
};
