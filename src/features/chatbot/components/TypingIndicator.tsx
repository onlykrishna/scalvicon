import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="flex w-full mb-4 justify-start animate-fade-in">
            <div className="flex-shrink-0 mr-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Bot size={16} />
                </div>
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 w-fit">
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    );
};
