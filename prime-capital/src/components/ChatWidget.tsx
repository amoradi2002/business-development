'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Phone } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState("Hi! I'm the PCG loan assistant. How can I help you today?");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const config = JSON.parse(localStorage.getItem('pcg_chat_config') || '{}');
      if (config.greetingMessage) setGreeting(config.greetingMessage);
    } catch {}
  }, [open]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user' as const, content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      let config = {};
      try { config = JSON.parse(localStorage.getItem('pcg_chat_config') || '{}'); } catch {}

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          config
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Please call Garik at (818) 384-8544 for assistance.';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I\'m having trouble right now. Please call Garik directly at (818) 384-8544.' }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#3d9b3d] text-white shadow-lg hover:bg-[#2d7a2d] transition-all hover:scale-105 flex items-center justify-center"
        style={{ boxShadow: '0 4px 20px rgba(61,155,61,0.4)' }}>
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
          style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
          {/* Header */}
          <div className="bg-[#2d7a2d] px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold text-sm">Prime Capital Group</h4>
                <p className="text-green-200 text-xs">Loan Specialist Assistant</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-green-200 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f7f7f7]" style={{ maxHeight: '340px' }}>
            {/* Greeting */}
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2d7a2d] flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">P</div>
              <div className="max-w-[85%] px-3 py-2.5 bg-white rounded-xl rounded-bl-sm shadow-sm text-sm text-gray-700 leading-relaxed">{greeting}</div>
            </div>

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#2d7a2d] flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">P</div>
                )}
                <div className={`max-w-[85%] px-3 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' ? 'bg-[#3d9b3d] text-white rounded-br-sm' : 'bg-white text-gray-700 shadow-sm rounded-bl-sm'
                }`}>{msg.content}</div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2d7a2d] flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">P</div>
                <div className="px-3 py-2.5 bg-white rounded-xl rounded-bl-sm shadow-sm"><Loader2 className="w-4 h-4 text-[#3d9b3d] animate-spin" /></div>
              </div>
            )}

            {/* Talk to Garik */}
            {messages.length > 0 && !loading && (
              <div className="text-center pt-1">
                <a href="tel:8183848544" className="inline-flex items-center gap-1.5 text-xs text-[#3d9b3d] font-semibold hover:underline">
                  <Phone className="w-3 h-3" /> Talk to Garik — (818) 384-8544
                </a>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about loans, rates, properties..."
              className="flex-1 px-3 py-2 bg-[#f7f7f7] border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#3d9b3d]" />
            <button onClick={sendMessage} disabled={loading || !input.trim()}
              className="px-3 py-2 bg-[#3d9b3d] text-white rounded-lg hover:bg-[#2d7a2d] disabled:opacity-50">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
