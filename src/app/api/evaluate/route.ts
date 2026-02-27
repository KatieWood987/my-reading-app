import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { userAnswer, correctAnswer } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ 
        role: 'user', 
        content: `Is "${userAnswer}" semantically similar to "${correctAnswer}"? Reply with yes or no only.` 
      }],
    });

    // Safe access with fallback
    const content = response.choices?.[0]?.message?.content?.toLowerCase() || '';
    const isCorrect = content.includes('yes');

    return NextResponse.json({ isCorrect });

  } catch (error) {
    console.error('Evaluation error:', error);
    return NextResponse.json({ 
      isCorrect: false, 
      error: 'Evaluation failed' 
    }, { status: 500 });
  }
}