'use client';

import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    'Hi! I am the VIC Construction assistant. Ask me about our services, pricing, or schedule a free estimate.',
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error('Request failed');
      }

      const data = await res.json();
      const reply: string =
        data.reply ||
        data.message ||
        data.content ||
        'Thanks for reaching out! Please call us at (818) 200-6274 for immediate assistance.';

      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            'Sorry, I had trouble connecting. Please call us directly at (818) 200-6274.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-all duration-200 hover:scale-110 ${
          !open ? 'chat-pulse' : ''
        }`}
        style={{ backgroundColor: '#e8702e' }}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] rounded-lg overflow-hidden shadow-2xl flex flex-col"
          style={{ height: '480px', maxHeight: 'calc(100vh - 8rem)' }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-3"
            style={{ backgroundColor: '#1a2744' }}
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#e8702e' }}
            >
              <span className="text-white font-heading text-xl leading-none">V</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm">VIC Construction</div>
              <div className="text-white/70 text-xs">
                Free estimates — Online now
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-white p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                  style={
                    m.role === 'user' ? { backgroundColor: '#e8702e' } : undefined
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-500 border border-gray-200 rounded-lg px-3 py-2 text-sm flex items-center gap-1">
                  <span>Typing</span>
                  <span className="typing-dot">.</span>
                  <span className="typing-dot">.</span>
                  <span className="typing-dot">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Call link */}
          <a
            href="tel:+18182006274"
            className="block text-center text-xs py-2 border-t border-gray-200 bg-gray-50 text-gray-700 hover:text-[#e8702e] transition-colors duration-200"
          >
            Call VIC directly — (818) 200-6274
          </a>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#e8702e] text-gray-800"
              disabled={loading}
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-md text-white text-sm font-semibold transition-all duration-200 disabled:opacity-50 hover:brightness-110"
              style={{ backgroundColor: '#e8702e' }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
