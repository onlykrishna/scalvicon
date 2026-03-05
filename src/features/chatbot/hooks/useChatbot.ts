import { useState, useEffect } from 'react';
import { ChatMessage } from '../types/chat.types';
import { CHAT_CONFIG } from '../constants/chatConfig';
import { sendMessageToAI, generateId } from '../services/chatService';

export const useChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [hasOpened, setHasOpened] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Initialize session ID
        let currentSession = sessionStorage.getItem('scalvicon_chat_session');
        if (!currentSession) {
            currentSession = generateId();
            sessionStorage.setItem('scalvicon_chat_session', currentSession);
        }
        setSessionId(currentSession);

        // Set initial greeting
        setMessages([
            { role: 'assistant', content: CHAT_CONFIG.greeting, timestamp: new Date() }
        ]);
    }, []);

    useEffect(() => {
        if (!hasOpened && !isOpen) {
            // Dwell Time Trigger
            const timer = setTimeout(() => {
                setUnreadCount(1);
            }, CHAT_CONFIG.triggers.dwellTimeMs);

            // Scroll Trigger
            const handleScroll = () => {
                const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                if (scrolled >= CHAT_CONFIG.triggers.scrollPercentage) {
                    setUnreadCount(1);
                    window.removeEventListener('scroll', handleScroll);
                }
            };
            window.addEventListener('scroll', handleScroll);

            // Exit Intent Trigger
            const handleMouseLeave = (e: MouseEvent) => {
                if (e.clientY <= 0) {
                    setUnreadCount(1);
                    document.removeEventListener('mouseleave', handleMouseLeave);
                }
            };
            document.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('scroll', handleScroll);
                document.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [hasOpened, isOpen]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setHasOpened(true);
            setUnreadCount(0);
        }
    };

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const newUserMsg: ChatMessage = { role: 'user', content, timestamp: new Date() };
        const updatedMessages = [...messages, newUserMsg];

        setMessages(updatedMessages);
        setIsTyping(true);

        try {
            // Send only valid fields to avoid mapping objects like Date directly if not serializable
            const safeMessages = updatedMessages.map(m => ({ role: m.role, content: m.content }));

            const response = await sendMessageToAI(safeMessages, sessionId, conversationId);

            if (response.conversationId) {
                setConversationId(response.conversationId);
            }

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: response.reply, timestamp: new Date() }
            ]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Apologies, I encountered an error connecting to the team. Please refresh or contact us directly.', timestamp: new Date() }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return {
        isOpen,
        toggleChat,
        messages,
        sendMessage,
        isTyping,
        unreadCount
    };
};
