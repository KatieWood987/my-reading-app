import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { userAnswer, correctAnswer } = await req.json();
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: `Is "${userAnswer}" semantically similar to "${correctAnswer}"? Reply with yes or no only.` }],
    });
    const isCorrect = response.choices[0].message.content.toLowerCase().includes('yes');
    return NextResponse.json({ isCorrect });
  } catch (error) {
    return NextResponse.json({ isCorrect: false, error: 'Evaluation failed' }, { status: 500 });
  }
}