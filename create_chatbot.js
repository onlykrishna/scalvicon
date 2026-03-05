const fs = require('fs');
const path = require('path');

const BASE_DIR = '/Users/aeologic/krishna/webcraft-ascend/src/features/chatbot';

const dirs = [
  '',
  'components',
  'hooks',
  'services',
  'constants',
  'types',
  'styles'
];

dirs.forEach(d => {
  const dirPath = path.join(BASE_DIR, d);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

const files = {
  'types/chat.types.ts': `import { Timestamp } from 'firebase/firestore';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Timestamp | Date | any;
}

export interface ChatConversation {
  id?: string;
  sessionId: string;
  messages: ChatMessage[];
  createdAt?: Timestamp | Date | any;
  updatedAt?: Timestamp | Date | any;
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
  createdAt?: Timestamp | Date | any;
}
`,

  'constants/chatConfig.ts': `export const CHAT_CONFIG = {
  triggers: {
    scrollPercentage: 70,
    dwellTimeMs: 45000,
    exitIntent: true,
  },
  greeting: "Hi there! I'm Scalvicon AI. How can I help you grow your business today?",
  quickReplies: [
    { label: "🌐 Website", value: "I need a business website" },
    { label: "🛒 Ecommerce", value: "I want to build an ecommerce store" },
    { label: "📈 SEO", value: "I need help with SEO" },
    { label: "💰 Pricing", value: "What is your pricing?" },
    { label: "💬 Talk to Expert", value: "I want to talk to an expert" },
  ],
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "",
};
`,

  'services/chatService.ts': `import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from '@/lib/firebase'; // Adjust based on your firebase setup
import { ChatMessage } from '../types/chat.types';

export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const sendMessageToAI = async (
  messages: ChatMessage[],
  sessionId: string,
  conversationId?: string | null
) => {
  const functions = getFunctions();
  const scalviconChatbot = httpsCallable(functions, 'scalviconChatbot');
  
  const response = await scalviconChatbot({
    messages,
    sessionId,
    conversationId
  });
  
  return response.data as { reply: string; conversationId: string; leadDetected: boolean; leadData?: any };
};
`,

  'hooks/useChatbot.ts': `import { useState, useEffect, useRef } from 'react';
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
`,

  'components/MessageBubble.tsx': `import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '../types/chat.types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={\`flex w-full mb-4 animate-fade-in \${isUser ? 'justify-end' : 'justify-start'}\`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Bot size={16} />
          </div>
        </div>
      )}
      
      <div 
        className={\`max-w-[80%] rounded-2xl px-4 py-2 text-sm relative group \${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-sm' 
            : 'bg-muted text-foreground rounded-tl-sm'
        }\`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        
        {message.timestamp && (
          <span className={\`absolute top-full text-[10px] text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity \${
            isUser ? 'right-0' : 'left-0'
          }\`}>
            {typeof message.timestamp?.toDate === 'function' ? message.timestamp.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
             (message.timestamp instanceof Date ? message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '')}
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
`,

  'components/TypingIndicator.tsx': `import React from 'react';
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
`,

  'components/QuickReplies.tsx': `import React from 'react';
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
`,

  'components/ChatLauncher.tsx': `import React from 'react';
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
      className={\`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 z-[9999] hover:scale-105 \${
        !isOpen && unreadCount > 0 ? 'animate-pulse' : ''
      }\`}
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
`,

  'components/ChatWindow.tsx': `import React, { useRef, useEffect, useState } from 'react';
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
    <div className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-120px)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-300 overflow-hidden">
      
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
          href={\`https://wa.me/\${CHAT_CONFIG.whatsappNumber}\`} 
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
        <div ref={messagesEndRef} className="h-1 font-mono"/>
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
`,

  'components/ChatWidget.tsx': `import React from 'react';
import { ChatWindow } from './ChatWindow';
import { ChatLauncher } from './ChatLauncher';
import { useChatbot } from '../hooks/useChatbot';
import '../styles/chatbot.css'; // import isolated scoped styles

const ChatWidget: React.FC = () => {
  const { 
    isOpen, 
    toggleChat, 
    messages, 
    sendMessage, 
    isTyping, 
    unreadCount 
  } = useChatbot();

  return (
    <>
      <ChatWindow 
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={sendMessage}
      />
      <ChatLauncher 
        isOpen={isOpen}
        onClick={toggleChat}
        unreadCount={unreadCount}
      />
    </>
  );
};

export default ChatWidget;
`,

  'index.tsx': `import ChatWidget from './components/ChatWidget';
export * from './types/chat.types';

export default ChatWidget;
`,

  'styles/chatbot.css': `
/* Scoped keyframes for chatbot */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

/* Ensure global scrollbar for chat window looks native */
.scroll-smooth {
  scroll-behavior: smooth;
}
`,

  'REMOVAL.md': `# Chatbot Removal Guide

If you ever need to completely remove the AI Chatbot feature from the platform, follow these steps to ensure a clean removal with zero breakage to the rest of the site.

### 1. Delete the feature folder
Delete the entire directory: \`src/features/chatbot/\`

### 2. Remove from App.tsx
Delete the import line:
\`\`\`ts
import ChatWidget from './features/chatbot';
\`\`\`
Delete the JSX component from the return statement:
\`\`\`tsx
<ChatWidget />
\`\`\`

### 3. Clean up Cloud Functions
Open \`functions/src/index.ts\` and delete the \`scalviconChatbot\` cloud function (found at the bottom of the file).
Deploy the changes to remove it from Firebase:
\`\`\`sh
cd functions
npm run build
firebase deploy --only functions
\`\`\`

### 4. Firestore Cleanup
Archive (do not delete) the following collections in your Firebase console:
- \`chat_conversations\`
- \`chat_leads\`

Open \`firestore.rules\` and delete the "Chatbot" section added for the above collections.
Deploy the rules:
\`\`\`sh
firebase deploy --only firestore:rules
\`\`\`

Total estimated removal time: < 5 minutes.
`
};

Object.keys(files).forEach(filename => {
  fs.writeFileSync(path.join(BASE_DIR, filename), files[filename]);
});

console.log("All Chatbot UI files created successfully!");
