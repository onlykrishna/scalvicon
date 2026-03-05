import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '@/lib/firebase'; // Assuming firebase was initialized
import { ChatMessage } from '../types/chat.types';

export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const sendMessageToAI = async (
    messages: ChatMessage[],
    sessionId: string,
    conversationId?: string | null
) => {
    const functions = getFunctions(app, 'us-central1'); // default region matching backend
    const scalviconChatbot = httpsCallable(functions, 'scalviconChatbot');

    const response = await scalviconChatbot({
        messages,
        sessionId,
        conversationId
    });

    return response.data as { reply: string; conversationId: string; leadDetected: boolean; leadData?: Record<string, unknown> };
};
