import React, { useRef, useEffect, useState } from 'react';
import { Send, Sparkles, Phone } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { QuickReplies } from './QuickReplies';
import { ChatMessage } from '../types/chat.types';
import { CHAT_CONFIG } from '../constants/chatConfig';

interface ChatWindowProps {
    isOpen: boolean;
    messages: ChatMessage[];
    isTyping: boolean;
    onSendMessage: (message: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    isOpen,
    messages,
    isTyping,
    onSendMessage
}) => {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [messages, isTyping, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() && !isTyping) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-48 right-6 w-[360px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-120px)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-300 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-primary text-primary-foreground">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">Scalvicon AI</h3>
                        <p className="text-xs text-primary-foreground/80">Online & ready to help</p>
                    </div>
                </div>
                <a
                    href={`https://wa.me/${CHAT_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="Contact on WhatsApp"
                >
                    <Phone size={18} />
                </a>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} message={msg} />
                ))}
                {isTyping && <TypingIndicator />}
                {messages.length === 1 && !isTyping && (
                    <QuickReplies onSelect={onSendMessage} />
                )}
                <div ref={messagesEndRef} className="h-1 font-mono" />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full bg-muted border-none rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-2 p-2 text-primary hover:text-primary/80 disabled:opacity-50 transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </form>
                <div className="text-center mt-2">
                    <span className="text-[10px] text-muted-foreground">Powered by Scalvicon AI</span>
                </div>
            </div>

        </div>
    );
};
