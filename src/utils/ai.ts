import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateQuestions(passage: string) {
  const prompt = `
  Generate 6 high-quality reading comprehension questions for this passage. Focus on genuine understanding, not memorization. Include a mix of types: 2 multiple-choice (with 4 options, 1 correct), 2 short-answer, 2 open-ended inference. For each question, provide as JSON array:
  - id: number
  - text: string
  - type: "multiple" | "short" | "open"
  - options?: string[] (for multiple)
  - answer: string (correct answer)
  - explanation: string (1-2 sentences)
  - difficulty: "easy" | "medium" | "hard"

  Passage: ${passage}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  // Type assertion to fix any TS issues
  const messageContent = (response as any).choices[0].message.content as string;

  return JSON.parse(messageContent).questions;  // Parse and return questions array
}