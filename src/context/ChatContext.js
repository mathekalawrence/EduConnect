import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([
    {
      id: '1',
      participants: ['1', '2'],
      messages: [
        {
          id: '1',
          senderId: '1',
          text: 'Hi Sarah, how is the math assignment going?',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        },
        {
          id: '2',
          senderId: '2',
          text: 'Almost done, Mr. Smith! Just finishing the last problem.',
          timestamp: new Date(Date.now() - 1800000),
          type: 'text'
        }
      ]
    },
    {
      id: '2',
      participants: ['1', '3'],
      messages: [
        {
          id: '1',
          senderId: '1',
          text: 'Parent-teacher meeting scheduled for Friday',
          timestamp: new Date(Date.now() - 86400000),
          type: 'text'
        }
      ]
    }
  ]);

  const [allUsers] = useState([
    { id: '1', name: 'John Smith', role: 'teacher', avatar: '👨‍🏫', online: true },
    { id: '2', name: 'Sarah Johnson', role: 'student', avatar: '👩‍🎓', online: true },
    { id: '3', name: 'Michael Brown', role: 'parent', avatar: '👨‍👧', online: false },
    { id: '4', name: 'Emily Davis', role: 'teacher', avatar: '👩‍🏫', online: true },
    { id: '5', name: 'David Wilson', role: 'student', avatar: '👨‍🎓', online: false }
  ]);

  const sendMessage = (chatId, message) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  const createChat = (participants) => {
    const newChat = {
      id: Date.now().toString(),
      participants,
      messages: []
    };
    setChats(prev => [...prev, newChat]);
    return newChat;
  };

  return (
    <ChatContext.Provider value={{ chats, allUsers, sendMessage, createChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
