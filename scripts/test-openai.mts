import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // Load env vars

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log(openai); // Log the client object to verify