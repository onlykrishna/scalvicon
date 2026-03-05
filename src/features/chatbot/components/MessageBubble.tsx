import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '../types/chat.types';

interface MessageBubbleProps {
    message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';

    // Helper to format timestamps gracefully whether string/date/timestamp
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatTime = (ts: any) => {
        if (!ts) return '';
        try {
            if (typeof ts.toDate === 'function') {
                return ts.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            if (ts instanceof Date) {
                return ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch {
            return '';
        }
    };

    return (
        <div className={`flex w-full mb-4 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="flex-shrink-0 mr-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Bot size={16} />
                    </div>
                </div>
            )}

            <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm relative group ${isUser
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-muted text-foreground rounded-tl-sm'
                    }`}
            >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>

                {message.timestamp && (
                    <span className={`absolute top-full text-[10px] text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? 'right-0' : 'left-0'
                        }`}>
                        {formatTime(message.timestamp)}
                    </span>
                )}
            </div>

            {isUser && (
                <div className="flex-shrink-0 ml-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <User size={16} />
                    </div>
                </div>
            )}
        </div>
    );
};
