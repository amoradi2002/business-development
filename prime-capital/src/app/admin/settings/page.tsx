'use client';
import { useState, useEffect } from 'react';
import { Save, CheckCircle, Eye } from 'lucide-react';

export default function SettingsPage() {
  const [greeting, setGreeting] = useState("Hi! I'm the PCG loan assistant. How can I help you today?");
  const [instructions, setInstructions] = useState('');
  const [tone, setTone] = useState('Professional');
  const [avoid, setAvoid] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const config = JSON.parse(localStorage.getItem('pcg_chat_config') || '{}');
      if (config.greetingMessage) setGreeting(config.greetingMessage);
      if (config.customInstructions) setInstructions(config.customInstructions);
      if (config.tone) setTone(config.tone);
      if (config.topicsToAvoid) setAvoid(config.topicsToAvoid);
    } catch {}
  }, []);

  const handleSave = () => {
    localStorage.setItem('pcg_chat_config', JSON.stringify({
      greetingMessage: greeting, customInstructions: instructions, tone, topicsToAvoid: avoid
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const buildPrompt = () => {
    let p = `You are a helpful loan specialist assistant for Prime Capital Group, Inc., a private and hard money lender in Burbank, CA.\n\nKey facts:\n- Loan amounts from $50,000 to $25,000,000\n- Up to 70% LTV (65% for rehab)\n- Rates from 6.49% to 12.99%\n- California properties only\n- FICO score is NOT a factor\n- Business purpose loans only\n- Contact: Garik Hadjinian (818) 384-8544`;
    if (instructions) p += `\n\nAdditional instructions: ${instructions}`;
    if (avoid) p += `\n\nDo not discuss: ${avoid}`;
    if (tone) p += `\n\nTone: ${tone}`;
    return p;
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-[#1a1a1a] font-['Playfair_Display']">Settings</h1>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 font-semibold">
          <CheckCircle className="w-4 h-4" /> Settings Saved — Changes will reflect on the website chat immediately.
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-bold text-[#2d7a2d]">AI Chat Settings</h2>
        <p className="text-sm text-gray-500">Configure how the website chat assistant behaves for visitors.</p>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Greeting Message</label>
          <input value={greeting} onChange={e => setGreeting(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]" />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Custom Instructions</label>
          <textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows={4}
            placeholder="Any specific information or behavior you want the AI to know or follow..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]" />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Tone</label>
          <div className="flex gap-4">
            {['Professional', 'Friendly', 'Direct'].map(t => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="tone" value={t} checked={tone === t} onChange={() => setTone(t)}
                  className="w-4 h-4 text-[#3d9b3d] focus:ring-[#3d9b3d]" />
                <span className="text-sm">{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Topics to Avoid</label>
          <input value={avoid} onChange={e => setAvoid(e.target.value)} placeholder="Comma separated, e.g., competitors, specific rates, guarantees"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]" />
        </div>

        <button onClick={handleSave}
          className="px-6 py-2.5 bg-[#3d9b3d] text-white rounded-lg font-semibold text-sm hover:bg-[#2d7a2d] flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-[#2d7a2d]" />
          <h3 className="text-sm font-bold text-[#2d7a2d]">Live System Prompt Preview</h3>
        </div>
        <pre className="bg-[#1a1a1a] text-green-400 p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">{buildPrompt()}</pre>
      </div>
    </div>
  );
}
