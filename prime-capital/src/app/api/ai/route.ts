import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === 'your_anthropic_key_here') {
    return NextResponse.json({
      content: [{ type: 'text', text: 'API key not configured. Add your Anthropic API key to .env.local to enable AI features. For demo purposes, here\'s a sample response:\n\nBased on PCG\'s lending guidelines:\n- LTV up to 70% (65% for rehab)\n- Rates from 6.49% to 12.99%\n- Loan amounts $50K to $25M\n- California properties only\n- FICO is not a factor\n\nPlease configure your API key at console.anthropic.com to get real AI responses.' }]
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are an expert private money lending assistant for Prime Capital Group, Inc. You help loan officers evaluate deals, calculate LTV, understand market conditions, draft communications to borrowers and brokers, and answer questions about hard money lending guidelines. PCG lends from $50,000 to $25,000,000, up to 70% LTV, rates 6.49-12.99%, California properties only, FICO not a factor, business purpose loans only. Be direct, concise, and actionable.`,
        messages
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ content: [{ type: 'text', text: 'Error connecting to AI service. Please check your API key.' }] }, { status: 500 });
  }
}
