import React, { useState, useRef, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import {
  Sparkles,
  Send,
  X,
  AlertCircle,
  Sprout,
  Beef,
  Droplets,
  PackageCheck,
  Bot,
  User,
} from 'lucide-react';

interface FarmAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmAssistantModal: React.FC<FarmAssistantModalProps> = ({ isOpen, onClose }) => {
  const { t, chatMessages, sendMessageToAssistant, isAssistantTyping } = useFarm();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAssistantTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: t('promptToday'), icon: <Sprout className="h-3.5 w-3.5 text-[#2F7D4E]" /> },
    { label: t('promptHerd'), icon: <Beef className="h-3.5 w-3.5 text-[#D78A32]" /> },
    { label: t('promptWater'), icon: <Droplets className="h-3.5 w-3.5 text-[#4A91C5]" /> },
    { label: t('promptHarvest'), icon: <PackageCheck className="h-3.5 w-3.5 text-[#D2A643]" /> },
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendMessageToAssistant(text);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="flex flex-col h-[85vh] w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden dark:border dark:border-[#354239] dark:bg-[#243128]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8EBE5] p-4 dark:border-[#354239]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#2F7D4E] to-[#6DBE57] text-white shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#1E2A22] dark:text-white">
                {t('farmAssistant')}
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2F7D4E] dark:text-[#9FCB88]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D4E] animate-pulse"></span>
                AI Active
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#7B857E] hover:bg-gray-100 dark:hover:bg-[#1E2A22]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="flex items-start gap-2 bg-[#FFF2DF] px-4 py-2 text-[10px] text-[#AA7026] dark:bg-[#1E2A22] dark:text-[#E7BE5D]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>{t('assistantDisclaimer')}</span>
        </div>

        {/* Chat History Viewport */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#2F7D4E] text-white shrink-0 mt-1">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#2F7D4E] text-white rounded-br-xs'
                    : 'bg-[#F6F4EA] text-[#1E2A22] rounded-bl-xs dark:bg-[#1E2A22] dark:text-[#E8F3E9]'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="mt-1 block text-right text-[9px] opacity-70">
                  {msg.timestamp}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gray-200 text-gray-700 shrink-0 mt-1 dark:bg-gray-700 dark:text-gray-200">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isAssistantTyping && (
            <div className="flex gap-2.5 justify-start">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#2F7D4E] text-white shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl bg-[#F6F4EA] px-4 py-3 text-xs text-[#7B857E] dark:bg-[#1E2A22]">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7B857E] animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7B857E] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7B857E] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="border-t border-[#E8EBE5] bg-white p-3 dark:border-[#354239] dark:bg-[#243128]">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q.label)}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#E8EBE5] bg-[#F6F4EA] px-3 py-1 text-[11px] font-semibold text-[#1E2A22] transition hover:border-[#2F7D4E] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-[#E8F3E9]"
              >
                {q.icon}
                <span>{q.label}</span>
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="mt-2.5 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('assistantPlaceholder')}
              className="flex-1 rounded-2xl border border-[#E8EBE5] bg-[#F6F4EA] px-4 py-2.5 text-xs text-[#1E2A22] placeholder:text-[#7B857E] focus:border-[#2F7D4E] focus:outline-hidden dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isAssistantTyping}
              className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#2F7D4E] text-white transition hover:bg-[#25633E] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
