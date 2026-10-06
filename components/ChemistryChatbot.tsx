'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, RotateCcw, Lightbulb, Compass, ChevronDown } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  '르샤틀리에 원리에서 왜 온도가 올라가면 평형이 이동하나요?',
  '식초 중화 적정 실험에서 왜 페놀프탈레인 지시약을 쓰나요?',
  '물질과 에너지에서 분자 간 힘과 끓는점은 무슨 관계가 있나요?',
  '화학 반응의 세계에서 촉매는 왜 활성화 에너지만 낮출까요?',
  '수소와 산소가 반응해서 물이 될 때 왜 2:1의 부피비로 반응하나요?',
];

const INITIAL_GREETING: ChatMessage = {
  id: 'greet-1',
  role: 'assistant',
  content: `반가워요! 🧪 저는 고등학교 화학 탐구 비계(Scaffolding) AI 튜터 **알케미(Alchemi)**입니다.

저는 여러분에게 단순 암기식 정답이나 풀이를 바로 떠먹여 드리지 않아요. 대신 여러분이 **분자의 세계와 화학 원리를 스스로 깨우칠 수 있도록 한 걸음씩 힌트와 생각할 질문**을 드릴게요!

궁금한 화학 개념이나 실험, 기출문제 질문이 있다면 편하게 물어보세요. 함께 탐구를 시작해 볼까요? ✨`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export default function ChemistryChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || '답변을 불러오지 못했습니다.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        content: `좋은 탐구 질문입니다! 💡\n\n이 현상을 이해하기 위해 먼저 반응물과 생성물의 **입자 수와 열에너지 출입 관계**를 생각해 볼까요? 어느 쪽으로 반응이 진행되어야 에너지가 더 낮아질까요? 여러분의 생각을 적어주세요!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setInput('');
  };

  return (
    <>
      {/* Floating Action Button (Widget Trigger) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-violet-600/35 hover:scale-105 transition-all duration-300 group"
          aria-label="화학 비계 챗봇 열기"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white animate-pulse" />
          </div>
          <span>화학 비계 튜터 알케미</span>
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-normal">
            소크라테스 발문형
          </span>
        </button>
      )}

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[440px] h-[600px] max-h-[85vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-white/60 dark:border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden animate-fadeIn">
          
          {/* Chat Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                    화학 비계 튜터 · 알케미
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-900 font-black">
                    AI Scaffolding
                  </span>
                </div>
                <p className="text-[11px] text-purple-200">
                  직접 답을 주지 않고 스스로 깨우치도록 돕습니다
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="대화 초기화"
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="닫기"
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Philosophy Banner */}
          <div className="px-4 py-2 bg-purple-50 dark:bg-purple-950/40 border-b border-purple-100 dark:border-purple-900/40 flex items-center gap-2 text-[11px] text-purple-700 dark:text-purple-300">
            <Lightbulb className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span className="truncate">
              <strong>비계(Scaffolding) 철학:</strong> 단계별 힌트와 질문을 통해 정답을 도출해요!
            </span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Preset Inquiry Chips */}
            {messages.length === 1 && (
              <div className="mb-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-violet-500" />
                  <span>추천 화학 탐구 질문</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {PRESET_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="p-2.5 rounded-xl text-left text-xs bg-slate-100/80 dark:bg-slate-800/60 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-700 dark:hover:text-violet-300 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 transition-all leading-snug"
                    >
                      💬 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Bubble List */}
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isUser
                        ? 'bg-violet-600 text-white'
                        : 'bg-gradient-to-tr from-violet-600 to-cyan-500 text-white'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`max-w-[82%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                        isUser
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <Bot className="w-4 h-4 text-violet-500 animate-bounce" />
                <span className="animate-pulse">알케미가 생각할 거리와 비계 힌트를 구성하고 있어요...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="화학 질문이나 생각을 적어보세요..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 neu-input text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white shadow-md transition-all shrink-0"
              aria-label="메시지 전송"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
