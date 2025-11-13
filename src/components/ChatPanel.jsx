import { useState } from 'react';
import { Send, Search, Circle } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const contacts = [
  { id: 1, name: 'Yasmine El Mansouri', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yasmine', online: true, lastMessage: 'See you tomorrow!' },
  { id: 2, name: 'Ahmed Benali', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed', online: true, lastMessage: 'Thanks for the notes 📝' },
  { id: 3, name: 'Fatima Zahra', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima', online: false, lastMessage: 'Good luck on your exam!' },
  { id: 4, name: 'Omar Idrissi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', online: true, lastMessage: 'Can you send me the slides?' },
];

export function ChatPanel() {
  const { t } = useLanguage();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const messages = selectedChat ? [
    { id: 1, sender: 'them', text: 'Hey! Did you finish the assignment?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Yes! Just submitted it 😊', time: '10:32 AM' },
    { id: 3, sender: 'them', text: 'Great! Can you help me with question 3?', time: '10:33 AM' },
    { id: 4, sender: 'me', text: 'Sure! Let me send you my notes', time: '10:35 AM' },
  ] : [];

  const selectedContact = contacts.find(c => c.id === selectedChat);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Card className="h-[calc(100vh-2rem)] sticky top-4 rounded-2xl border-[#AAC0E1] overflow-hidden flex flex-col bg-white">
      <div className="p-4 border-b border-[#AAC0E1] bg-white">
        <h3 className="text-[#0E2F76] mb-3">{t('chat.messages')}</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6C7D]" />
          <Input
            placeholder={t('chat.searchMessages')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#AAC0E1] rounded-xl"
          />
        </div>
      </div>

      {!selectedChat ? (
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedChat(contact.id)}
              className="w-full p-4 flex items-start gap-3 hover:bg-[#F5FEFF] transition-colors border-b border-[#AAC0E1]/50"
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                </Avatar>
                {contact.online && (
                  <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                )}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#0E2F76]">{contact.name}</span>
                </div>
                <p className="text-xs text-[#5A6C7D] truncate">{contact.lastMessage}</p>
              </div>
            </button>
          ))}
          {filteredContacts.length === 0 && (
            <div className="p-8 text-center text-[#5A6C7D]">
              No contacts found
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-[#AAC0E1] bg-white flex items-center gap-3">
            <button
              onClick={() => setSelectedChat(null)}
              className="text-[#5A6C7D] hover:text-[#0A2463]"
            >
              ←
            </button>
            <Avatar className="w-9 h-9">
              <AvatarImage src={selectedContact?.avatar} />
              <AvatarFallback>{selectedContact?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-sm text-[#0A2463]">{selectedContact?.name}</div>
              <div className="text-xs text-green-600">{t('chat.online')}</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FBFF]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-r from-[#0A2463] to-[#1976D2] text-white'
                      : 'bg-white text-[#2D2D2D] border border-[#D0E1F9]'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-xs ${msg.sender === 'me' ? 'text-white/70' : 'text-[#5A6C7D]'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#AAC0E1] bg-white">
            <div className="flex gap-2">
              <Input
                placeholder={t('chat.typeMessage')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="border-[#AAC0E1] rounded-xl"
              />
              <Button
                onClick={handleSend}
                className="bg-[#AAC0E1] hover:bg-[#0E2F76] text-white rounded-xl px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

