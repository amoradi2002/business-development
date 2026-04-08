import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages, config } = await req.json();
  const apiKey = process.env.PERPLEXITY_API_KEY;

  const systemPrompt = `You are a helpful loan specialist assistant for Prime Capital Group, Inc., a private and hard money lender in Burbank, CA.
Key facts:
- Loan amounts from $50,000 to $25,000,000
- Up to 70% LTV (65% for rehab)
- Rates from 6.49% to 12.99%
- California properties only
- FICO score is NOT a factor
- Business purpose loans only
- Loan types: Bridge, Hard Money, HELOC, Purchase, Rehab, Construction, Cash-Out Refi, Second Mortgage, Acquisition and Development
- Property types: SFR, townhouses, condos, multifamily, office, warehouse, self storage, retail, hospitality, churches, mobile home, mixed-use, raw land
- Loans to individuals, entities, and foreign nationals
- Foreclosure, bankruptcy, probate, self-employed — not a problem
- Investor yields: 7.9% to 12.9%
- Contact: Garik Hadjinian (818) 384-8544, Garik@PrimeCapitalGroupInc.com
Always encourage visitors to use the calculator or contact Garik directly. Never give legal or financial advice.
${config?.customInstructions ? "Additional instructions: " + config.customInstructions : ""}
${config?.topicsToAvoid ? "Do not discuss: " + config.topicsToAvoid : ""}
${config?.tone ? "Tone: " + config.tone : ""}`;

  if (!apiKey || apiKey === 'your_perplexity_key_here') {
    // Fallback responses for demo
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
    let reply = "I'd be happy to help! Prime Capital Group offers private money loans from $50,000 to $25,000,000 with rates starting at 6.49%. We fund all property types across California. Would you like to use our loan calculator or speak with Garik directly at (818) 384-8544?";

    if (lastMsg.includes('rate') || lastMsg.includes('interest')) {
      reply = "Our rates range from 6.49% to 12.99%, depending on the loan type and deal specifics. Hard money bridge loans typically start at 10.5%, while purchase loans can be as low as 7.00%. Try our calculator at /calculator to see estimated payments for your specific scenario, or call Garik at (818) 384-8544 for a custom quote.";
    } else if (lastMsg.includes('qualify') || lastMsg.includes('credit') || lastMsg.includes('fico')) {
      reply = "At PCG, FICO score is NOT a factor in our lending decisions. We approve based on just 2 criteria: strong collateral (equity in the property) and your ability to repay. We regularly fund loans for self-employed borrowers, those in foreclosure or bankruptcy, foreign nationals, and more. Use our calculator to see what you might qualify for!";
    } else if (lastMsg.includes('how long') || lastMsg.includes('fast') || lastMsg.includes('close')) {
      reply = "We can close in as fast as 5-7 days! As a direct lender with in-house funding, there's no middleman slowing things down. Our simplified underwriting process means faster approvals. Call Garik at (818) 384-8544 to discuss your timeline.";
    } else if (lastMsg.includes('property') || lastMsg.includes('type')) {
      reply = "We fund all property types: Single Family, Townhouse, Condo, Multifamily, Office, Warehouse, Self Storage, Retail, Hospitality, Churches, Mobile Home, Mixed-Use, and even Raw Land. Whether residential or commercial, we can help. What type of property are you looking to finance?";
    } else if (lastMsg.includes('invest') || lastMsg.includes('yield') || lastMsg.includes('return')) {
      reply = "Our investors earn yields between 7.9% and 12.9% through trust deed investments — secured by real property with low loan-to-value ratios. Visit our Investors page to register for a free sample portfolio, or call (855) 665-9774 to learn more.";
    } else if (lastMsg.includes('contact') || lastMsg.includes('call') || lastMsg.includes('garik')) {
      reply = "You can reach Garik Hadjinian directly:\n\n📞 Direct: (818) 384-8544\n📞 Office: (855) 665-9774\n📧 Email: Garik@PrimeCapitalGroupInc.com\n📍 1010 W. Magnolia Blvd. Suite #202, Burbank, CA 91506\n\nOr use our loan calculator to get started online!";
    }

    return NextResponse.json({
      choices: [{ message: { content: reply } }]
    });
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ]
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      choices: [{ message: { content: 'Sorry, I\'m having trouble connecting right now. Please call Garik directly at (818) 384-8544.' } }]
    }, { status: 500 });
  }
}
