import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the AI assistant for VIC Construction, Inc., a premium outdoor construction company in Los Angeles.

About VIC Construction:
- Specialty: Outdoor construction — patios, decks, outdoor kitchens, pergolas, retaining walls, fencing, concrete
- Service area: Los Angeles and surrounding areas
- Phone: (818) 200-6274
- Licensed and insured
- Free estimates on all projects
- 15+ years of experience
- 500+ projects completed

Services:
1. Patio and Deck Construction
2. Outdoor Kitchen and BBQ Islands
3. Pergolas and Shade Structures
4. Retaining Walls
5. Fencing and Gates
6. Concrete and Flatwork

Be helpful and friendly. Answer questions about services, pricing ranges, and process. Always encourage visitors to call (818) 200-6274 or request a free quote.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY;

    if (!apiKey || apiKey === 'your_key_here') {
      // Fallback response for demo
      const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      let reply = "Thanks for reaching out! VIC Construction specializes in premium outdoor construction across Los Angeles — patios, outdoor kitchens, pergolas, retaining walls, fencing, and concrete. Call us at (818) 200-6274 for a free estimate!";

      if (lastMsg.match(/price|cost|how much/)) {
        reply = "Pricing varies based on the scope of your project. Most patios start around $5,000, outdoor kitchens from $10,000, pergolas $4,000+, and retaining walls $2,500+. We offer free on-site estimates — call (818) 200-6274 to schedule!";
      } else if (lastMsg.match(/patio|deck/)) {
        reply = "We build custom patios and decks using wood, composite, concrete, stamped concrete, and pavers. From simple installations to full backyard transformations. Want a free estimate? Call (818) 200-6274.";
      } else if (lastMsg.match(/kitchen/)) {
        reply = "Our outdoor kitchens include granite countertops, built-in grills, refrigeration, custom stone work, and even pizza ovens. Perfect for entertaining! Call (818) 200-6274 for a free design consultation.";
      } else if (lastMsg.match(/pergola|shade/)) {
        reply = "We install wood and aluminum pergolas, lattice covers, and shade structures — both attached and freestanding. Custom finishes and integrated lighting available. Call (818) 200-6274!";
      } else if (lastMsg.match(/wall|retain/)) {
        reply = "We build engineered retaining walls using concrete block, natural stone, and timber. Includes drainage solutions and hillside stabilization. All built to code. Call (818) 200-6274 for a free site visit.";
      } else if (lastMsg.match(/fence|gate/)) {
        reply = "We install wood, vinyl, wrought iron, and chain link fencing, plus automatic gate systems. Repairs and full installs. Call (818) 200-6274 for a quote!";
      } else if (lastMsg.match(/concrete|driveway/)) {
        reply = "We do driveways, walkways, pool decks, stamped and stained concrete. Premium quality work. Call (818) 200-6274 for a free estimate!";
      } else if (lastMsg.match(/license|insur/)) {
        reply = "Yes! VIC Construction is fully licensed by the California State License Board and carries comprehensive liability and workers compensation insurance for every project.";
      } else if (lastMsg.match(/quote|estimate/)) {
        reply = "We offer free on-site estimates for all projects. Call (818) 200-6274 or visit our contact page to request your free quote — we'll get back to you within 24 hours!";
      }

      return NextResponse.json({ content: reply });
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'Give us a call at (818) 200-6274 and we will help you out.';
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({
      content: 'Sorry, having trouble connecting. Please call (818) 200-6274 directly.',
    });
  }
}
