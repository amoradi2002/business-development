'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, Sparkles } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; content: string; }

const suggestedPrompts = [
  "Calculate LTV for a $800K property with $400K loan",
  "Draft a follow-up email to a broker",
  "What is the max loan amount for a rehab property?",
  "Explain the difference between bridge and construction loans",
  "A borrower has a $2M warehouse, owes $800K, wants cash out. What can we offer?",
  "Write a professional decline letter for a deal that doesn't meet our criteria"
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user' as const, content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I couldn\'t process that request.';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Error connecting to AI. Please check your API key configuration.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a] font-['Playfair_Display']">AI Assistant</h1>
          <p className="text-sm text-gray-500">Powered by Claude — Your private lending expert</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#3d9b3d] font-semibold">
          <Sparkles className="w-4 h-4" /> AI Enabled
        </div>
      </div>

      <div className="flex-1 bg-[#f7f7f7] rounded-xl border border-gray-100 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-[#2d7a2d] flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Playfair_Display']">PCG AI Assistant</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md">I can help you evaluate deals, calculate LTV, draft communications, and answer questions about hard money lending.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl">
                {suggestedPrompts.map((prompt, i) => (
                  <button key={i} onClick={() => sendMessage(prompt)}
                    className="text-left px-4 py-3 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 hover:border-[#3d9b3d] hover:bg-green-50 transition-all">
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#2d7a2d] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#2d7a2d] text-white rounded-br-md'
                    : 'bg-white text-[#1a1a1a] border border-gray-100 shadow-sm rounded-bl-md'
                }`}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#b22222] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2d7a2d] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-md border border-gray-100 shadow-sm">
                <Loader2 className="w-5 h-5 text-[#3d9b3d] animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-3">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask about deals, LTV calculations, lending guidelines..."
              className="flex-1 px-4 py-3 bg-[#f7f7f7] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d] focus:border-transparent" />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
              className="px-5 py-3 bg-[#3d9b3d] text-white rounded-xl font-semibold text-sm hover:bg-[#2d7a2d] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
