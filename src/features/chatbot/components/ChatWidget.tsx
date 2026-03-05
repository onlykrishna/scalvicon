import React from 'react';
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
