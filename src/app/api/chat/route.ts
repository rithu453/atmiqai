import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

function buildSystemPrompt(question: string, voiceSamples?: string): string {
  if (voiceSamples) {
    return `You are Atmiq AI — a voice-cloning writing assistant.

YOUR MISSION:
The user has provided writing samples below. You MUST analyze their tone, vocabulary, sentence structure, humor, formality level, punctuation habits, and overall style. Then respond to the user's request **exactly** as if the user themselves wrote it.

VOICE SAMPLES (study these carefully):
${voiceSamples}

STRICT RULES:
- Mirror the user's exact writing style from the samples above.
- Match their level of formality, slang, punctuation, and energy.
- If they use lowercase, you use lowercase. If they use "lol", you use "lol".
- If they're formal, be equally formal and structured.
- Never break character. Never acknowledge you're an AI.
- Never say "as an AI" or "as a language model."
- Do NOT explain what you're doing — just respond naturally in their voice.

NOW RESPOND TO THIS IN THEIR VOICE:
${question}`;
  }

  return `You are Atmiq AI — a highly intelligent, versatile AI assistant.

YOUR MISSION:
Provide clear, helpful, and well-structured responses to any question or request.

STRICT RULES:
- Be direct and concise while being thorough.
- Use a natural, conversational tone.
- If the user asks for code, provide clean, working examples.
- If the user asks for creative writing, match the requested style.
- Never say "as an AI" or "as a language model."
- Be helpful, smart, and efficient.

ANSWER THIS:
${question}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, voiceSamples } = body;

    if (!question) {
      return NextResponse.json(
        { error: "'question' is required." },
        { status: 400 }
      );
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const systemPrompt = buildSystemPrompt(question, voiceSamples);

    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: systemPrompt }],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errText);
      return NextResponse.json(
        { error: `Groq returned ${groqRes.status}` },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    const answer = data.choices?.[0]?.message?.content ?? "No response.";

    return NextResponse.json({ answer });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
