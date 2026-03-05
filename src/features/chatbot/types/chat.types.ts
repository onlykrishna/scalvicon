import { Timestamp } from 'firebase/firestore';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Timestamp | Date | unknown;
}

export interface ChatConversation {
    id?: string;
    sessionId: string;
    messages: ChatMessage[];
    createdAt?: Timestamp | Date | unknown;
    updatedAt?: Timestamp | Date | unknown;
    leadCaptured: boolean;
    leadId: string | null;
}

export interface ChatLead {
    id?: string;
    name: string;
    business?: string;
    service?: string;
    budget?: string;
    contact: string;
    source: 'chatbot';
    conversationId: string;
    intent?: string;
    createdAt?: Timestamp | Date | unknown;
}
