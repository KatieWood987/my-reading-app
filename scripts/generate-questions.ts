console.log('Script file loaded - before any requires'); // Early debug

const OpenAI = require('openai');
const dotenv = require('dotenv');
const fs = require('fs/promises');

dotenv.config({ path: '.env.local' }); // Load env

// Manually define passage
const passage = {
  id: "passage-1",
  title: "The Secret Life of Honeybees",
  content: `Inside every beehive, there is a world more organized than most human cities. A single hive can contain up to 60,000 bees, and every single one has a job to do. At the center of the hive is the queen bee. She is the only bee that lays eggs—up to 2,000 per day during summer. Despite her title, the queen doesn't actually make decisions for the hive. Her main job is simply to lay eggs and keep the colony growing. The worker bees are all female, and they do everything else. Young workers stay inside the hive, cleaning cells, feeding larvae, and building honeycomb from wax they produce from their own bodies. As they get older, they graduate to guarding the hive entrance. The oldest workers become foragers, flying up to five miles from the hive to collect nectar and pollen. Male bees are called drones. They don't collect food, don't guard the hive, and don't have stingers. Their only purpose is to mate with queens from other hives. In autumn, when food becomes scarce, the workers push the drones out of the hive to conserve resources. Bees communicate through dancing. When a forager finds a good source of flowers, she returns to the hive and performs a 'waggle dance' that tells other bees exactly where to find the food. The angle of her dance shows the direction relative to the sun, and the length of her waggle shows the distance. This tiny insect has been making honey the same way for over 100 million years. Every spoonful of honey represents the life's work of about twelve bees.`
};

// Manually define generateQuestions
async function generateQuestions(passageContent: string) {  // Added type
  console.log('Inside generateQuestions - starting API call');
  console.log('API Key loaded? Length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 'UNDEFINED');

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
  Generate 6 high-quality reading comprehension questions for this passage. Focus on genuine understanding, not memorization. Include a mix of types: 2 multiple-choice (with 4 options, 1 correct), 2 short-answer, 2 open-ended inference. For each question, provide as JSON array:
  - id: number
  - text: string
  - type: "multiple" | "short" | "open"
  - options?: string[] (for multiple)
  - answer: string (correct answer)
  - explanation: string (1-2 sentences)
  - difficulty: "easy" | "medium" | "hard"

  Passage: ${passageContent}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  console.log('Raw API response content:', response.choices[0].message.content);

  return JSON.parse(response.choices[0].message.content).questions;
}

async function run() {
  try {
    console.log('Run function started - generating questions...');
    const questions = await generateQuestions(passage.content);
    console.log('Generated questions:', questions);
    await fs.writeFile('src/lib/questions.json', JSON.stringify(questions, null, 2));
    console.log('✅ Questions generated and saved to src/lib/questions.json!');
  } catch (error: any) {  // Added : any
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API details:', error.response.data);
    } else {
      console.error('Full error:', error);
    }
  }
}

run();