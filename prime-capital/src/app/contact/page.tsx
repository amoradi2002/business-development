"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Phone, Mail, MapPin, Shield, Clock, MessageCircle } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; }

type CaptureStep = "idle" | "name" | "phone" | "email" | "property" | "loanType" | "details" | "done";

const loanTypes = ["Bridge Loan", "Hard Money Loan", "HELOC", "Cash-Out Refinance", "Purchase Loan", "Rehab Loan", "Construction Loan", "Second Mortgage", "Other"];

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [captureStep, setCaptureStep] = useState<CaptureStep>("idle");
  const [leadData, setLeadData] = useState({ name: "", phone: "", email: "", propertyAddress: "", loanType: "", message: "", submittedAt: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const addMsg = (role: "user" | "assistant", content: string) => {
    setMessages(prev => [...prev, { role, content }]);
  };

  const saveLead = (data: typeof leadData) => {
    const lead = {
      id: Date.now().toString(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      propertyAddress: data.propertyAddress,
      loanType: data.loanType,
      message: data.message,
      status: "New",
      submittedAt: new Date().toISOString(),
      source: "AI Chat",
      // Also save as a borrower lead for the main dashboard
      propertyType: "Not specified",
      propertyValue: 0,
      loanBalance: 0,
      desiredAmount: 0,
      loanTerm: "",
      interestRate: 0,
      monthlyPayment: 0,
      ltv: 0,
      firstName: data.name.split(" ")[0] || "",
      lastName: data.name.split(" ").slice(1).join(" ") || "",
      notes: `[AI Chat Lead] ${data.message}`,
    };

    // Save to contact leads
    const contacts = JSON.parse(localStorage.getItem("pcg_contact_leads") || "[]");
    contacts.unshift(lead);
    localStorage.setItem("pcg_contact_leads", JSON.stringify(contacts));

    // Also save to main leads for admin dashboard
    const leads = JSON.parse(localStorage.getItem("pcg_leads") || "[]");
    leads.unshift(lead);
    localStorage.setItem("pcg_leads", JSON.stringify(leads));
  };

  const handleCaptureFlow = (text: string) => {
    switch (captureStep) {
      case "name":
        setLeadData(prev => ({ ...prev, name: text }));
        setCaptureStep("phone");
        addMsg("user", text);
        setTimeout(() => addMsg("assistant", `Nice to meet you, ${text.split(" ")[0]}! What's the best phone number to reach you?`), 500);
        return true;
      case "phone":
        setLeadData(prev => ({ ...prev, phone: text }));
        setCaptureStep("email");
        addMsg("user", text);
        setTimeout(() => addMsg("assistant", "Got it! And your email address?"), 500);
        return true;
      case "email":
        setLeadData(prev => ({ ...prev, email: text }));
        setCaptureStep("property");
        addMsg("user", text);
        setTimeout(() => addMsg("assistant", "What's the property address you're looking to finance? (Or type 'skip' if you haven't found one yet)"), 500);
        return true;
      case "property":
        setLeadData(prev => ({ ...prev, propertyAddress: text === "skip" ? "TBD" : text }));
        setCaptureStep("loanType");
        addMsg("user", text);
        setTimeout(() => addMsg("assistant", "What type of loan are you interested in?\n\n• Bridge Loan\n• Hard Money Loan\n• HELOC\n• Cash-Out Refinance\n• Purchase Loan\n• Rehab Loan\n• Construction Loan\n• Second Mortgage\n• Other / Not sure"), 500);
        return true;
      case "loanType":
        setLeadData(prev => ({ ...prev, loanType: text }));
        setCaptureStep("details");
        addMsg("user", text);
        setTimeout(() => addMsg("assistant", "Last question — briefly describe your situation or what you need. (Property value, loan amount, timeline, etc.)"), 500);
        return true;
      case "details": {
        const finalLead = { ...leadData, message: text, submittedAt: new Date().toISOString() };
        setLeadData(finalLead);
        saveLead(finalLead);
        setCaptureStep("done");
        addMsg("user", text);
        setTimeout(() => addMsg("assistant", `✅ Perfect! I've submitted your information to Garik Hadjinian. Here's a summary:\n\n📋 **${finalLead.name}**\n📞 ${finalLead.phone}\n📧 ${finalLead.email}\n📍 ${finalLead.propertyAddress}\n🏦 ${finalLead.loanType}\n\nGarik will call you within 24 hours. If you need to reach him sooner:\n\n📞 Direct: (818) 384-8544\n📞 Office: (855) 665-9774\n📧 Garik@PrimeCapitalGroupInc.com\n\nDRE License #01726567\n\nIs there anything else I can help with?`), 800);
        return true;
      }
      default:
        return false;
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    // If in capture flow, handle it
    if (handleCaptureFlow(text)) return;

    addMsg("user", text);
    setLoading(true);

    const lc = text.toLowerCase();

    // Check if user wants to start the lead capture
    if (lc.match(/talk|speak|call|contact|garik|apply|get started|interested|reach out|schedule|appointment|connect/)) {
      setCaptureStep("name");
      setLoading(false);
      setTimeout(() => addMsg("assistant", "I'd love to connect you with Garik! Let me get a few details so he can prepare for your call.\n\nWhat's your full name?"), 500);
      return;
    }

    // AI response for general questions
    try {
      let config = {};
      try { config = JSON.parse(localStorage.getItem("pcg_chat_config") || "{}"); } catch {}

      const allMessages = [...messages, { role: "user" as const, content: text }];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
          config
        })
      });
      const data = await res.json();
      let reply = data.choices?.[0]?.message?.content || "I'd be happy to help! Would you like me to connect you with Garik? Just say 'get started' and I'll collect your info.";

      // Always append CTA to connect
      if (!reply.includes("Garik") && !reply.includes("get started")) {
        reply += "\n\nWould you like to speak with Garik about this? Just type 'get started' and I'll set it up!";
      }

      addMsg("assistant", reply);
    } catch {
      addMsg("assistant", "I'm having a brief connection issue. You can reach Garik directly at (818) 384-8544 or type 'get started' to leave your info and he'll call you back!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-pcg-dark py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-pcg-dark-green/30 to-pcg-dark/90" />
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pcg-green">Prime Capital Group</p>
          <h1 className="font-playfair text-4xl font-bold text-white md:text-5xl lg:text-6xl">TALK TO US</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">Chat with our AI assistant or connect directly with Garik</p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Chat - takes 2 cols */}
            <div className="lg:col-span-2">
              <div className="flex flex-col rounded-2xl bg-white shadow-xl ring-1 ring-gray-100 overflow-hidden" style={{ height: "600px" }}>
                {/* Chat Header */}
                <div className="bg-pcg-dark-green px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">PCG Loan Assistant</h3>
                    <p className="text-green-200 text-xs">Online now — Ask anything about loans</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {/* Welcome message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-pcg-dark-green flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">P</div>
                    <div className="max-w-[80%] px-4 py-3 bg-white rounded-2xl rounded-bl-sm shadow-sm text-sm text-gray-700 leading-relaxed">
                      Welcome to Prime Capital Group! I can help you with:
                      <br /><br />
                      💰 <strong>Loan information</strong> — rates, terms, qualifications<br />
                      🏠 <strong>Property questions</strong> — what types we fund<br />
                      📊 <strong>Quick estimates</strong> — LTV, payments<br />
                      📞 <strong>Connect with Garik</strong> — type &quot;get started&quot;
                      <br /><br />
                      What can I help you with today?
                    </div>
                  </div>

                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-pcg-dark-green flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">P</div>
                      )}
                      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-pcg-dark-green text-white rounded-br-sm"
                          : "bg-white text-gray-700 shadow-sm rounded-bl-sm"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-pcg-dark-green flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">P</div>
                      <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-sm shadow-sm">
                        <Loader2 className="w-5 h-5 text-pcg-green animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length === 0 && (
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex gap-2 flex-wrap">
                    {["What are your rates?", "How fast can you close?", "Get started"].map((q, i) => (
                      <button key={i} onClick={() => { setInput(q); setTimeout(() => inputRef.current?.form?.requestSubmit(), 50); }}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-pcg-green hover:text-pcg-green transition-colors">
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="p-4 bg-white border-t border-gray-100 flex gap-3">
                  <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                    placeholder={captureStep !== "idle" && captureStep !== "done" ? "Type your answer..." : "Ask about loans, rates, or type 'get started'..."}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pcg-green focus:border-transparent" />
                  <button type="submit" disabled={loading || !input.trim()}
                    className="px-5 py-3 bg-pcg-green text-white rounded-xl font-semibold text-sm hover:bg-pcg-dark-green disabled:opacity-50 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-pcg-light p-6">
                <h3 className="font-playfair text-xl font-bold text-pcg-dark">Garik Hadjinian</h3>
                <p className="mt-1 text-sm font-medium text-pcg-green">President / Principal Broker</p>
              </div>

              <div className="rounded-2xl bg-pcg-light p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-pcg-green" />
                  <div>
                    <p className="text-xs text-gray-500">Office</p>
                    <a href="tel:8556659774" className="font-medium text-pcg-dark hover:text-pcg-green">(855) 665-9774</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-pcg-green" />
                  <div>
                    <p className="text-xs text-gray-500">Direct</p>
                    <a href="tel:8183848544" className="font-medium text-pcg-dark hover:text-pcg-green">(818) 384-8544</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-pcg-green" />
                  <a href="mailto:Garik@PrimeCapitalGroupInc.com" className="font-medium text-pcg-dark hover:text-pcg-green text-sm">Garik@PrimeCapitalGroupInc.com</a>
                </div>
              </div>

              <div className="rounded-2xl bg-pcg-light p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-pcg-green mt-0.5" />
                  <div>
                    <p className="font-medium text-pcg-dark">1010 W. Magnolia Blvd.</p>
                    <p className="text-gray-600 text-sm">Suite #202</p>
                    <p className="text-gray-600 text-sm">Burbank, CA 91506</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-pcg-light p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-pcg-green" />
                  <div>
                    <p className="font-medium text-pcg-dark">Mon – Fri</p>
                    <p className="text-gray-600 text-sm">9:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-pcg-light p-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-pcg-green" />
                  <div>
                    <p className="text-xs text-gray-500">DRE Broker License</p>
                    <p className="font-medium text-pcg-dark">#01726567</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-pcg-dark-green p-6 text-center">
                <p className="font-playfair text-lg font-bold text-white">Ready to Get Funded?</p>
                <p className="mt-2 text-sm text-green-200">Type &quot;get started&quot; in the chat to begin your application</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
