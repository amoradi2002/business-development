import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are the AI assistant for ANM Software Solutions, an AI development agency that builds custom AI platforms for local businesses across the United States.

About ANM Software Solutions:
- Founder: Aaron
- Based in Glendale, California — serving businesses nationwide
- Email: anmdevlopmentservices@yahoo.com
- Phone: (818) 930-9738
- Tagline: We Build AI Platforms for Local Businesses

What ANM builds:
- Premium cinematic websites with AI chat that answers customer questions 24/7
- Lead automation — instant text and email notifications on every form submission
- AI voice callers that call back new leads within 60 seconds and book appointments
- Client, investor, and broker portals with private logins
- Admin dashboards and full CRMs with AI lead scoring and Kanban pipelines
- AI document vaults that classify and organize uploads automatically
- Loan calculators, pre-qualification funnels, and custom lead capture tools
- Email automation — welcome emails, morning and end-of-day summary reports
- AI lead scrapers for businesses that need active lead generation

Industries ANM serves:
Hard money lenders, mortgage brokers, personal injury attorneys, law firms, med spas, dental offices, general contractors, outdoor construction, auto dealerships, real estate agencies, property management, insurance agencies, accounting firms, chiropractors, physical therapy, gyms, restaurants, event planners, pet services, and 180+ other business types.

Featured work:
Prime Capital Group, Inc. — a private and hard money lender in Burbank, CA. ANM built them a full AI lending platform including website, loan calculator, AI chat, investor portal, broker portal, admin dashboard, and document vault. Live at prime-capital-azure.vercel.app.

How ANM works:
1. Free consultation to learn your business
2. Custom build — delivered in days, not months
3. Review and refine the live demo with you
4. Launch on your domain

Pricing:
ANM builds range from simple AI websites to full enterprise platforms. Every quote is custom and comes from a free consultation. If someone asks about pricing, tell them it depends on what they need and encourage them to book a free call with Aaron to get an exact quote. Never give a firm price without a consultation.

How to be helpful:
- Be friendly, professional, and conversational
- Answer questions clearly and concisely
- Always try to point interested visitors toward booking a consultation
- If someone seems ready, say: "You can book a free call using the Contact section on this page, or email anmdevlopmentservices@yahoo.com, or call (818) 930-9738."
- Never make promises about exact timelines or prices
- Never give legal, financial, or business advice
- If someone asks something ANM does not do, say so politely and redirect to what they can help with`;

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "messages array is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    console.warn("[chat] PERPLEXITY_API_KEY not set — returning fallback");
    return NextResponse.json({
      content:
        "The AI chat is not configured yet. Please reach out directly: email anmdevlopmentservices@yahoo.com or call (818) 930-9738 and Aaron will get back to you within 24 hours.",
    });
  }

  try {
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10).map((m) => ({
            role: m.role,
            content: String(m.content ?? "").slice(0, 2000),
          })),
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[chat] Perplexity error:", res.status, text);
      return NextResponse.json(
        {
          content:
            "Sorry, I had trouble reaching our AI right now. Please call (818) 930-9738 or email anmdevlopmentservices@yahoo.com and Aaron will get back to you.",
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    const content =
      data?.choices?.[0]?.message?.content ||
      "Let me connect you with Aaron directly — (818) 930-9738 or anmdevlopmentservices@yahoo.com.";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("[chat] fetch failed:", err);
    return NextResponse.json(
      {
        content:
          "Sorry, something went wrong. Please call (818) 930-9738 or email anmdevlopmentservices@yahoo.com.",
      },
      { status: 200 }
    );
  }
}
