# Reading Comprehension Interface - EdAccelerator Assessment

A modern, engaging reading comprehension tool built for EdAccelerator's English Program. This interface replaces the old multiple-choice format with interactive, AI-powered questions that promote real understanding rather than guessing.

## Overview
Students read a passage broken into manageable sections and answer a mix of question types (multiple-choice, short-answer, and open-ended). Open-ended answers are evaluated using OpenAI for semantic similarity, making the experience fairer and more educational. The app includes gamification, adaptive difficulty, and a fun bee theme.

Live Demo: [Add your Vercel URL here]

## Interpretation of User Feedback
- **"Annoying seeing the entire passage at once"** → Passage is broken into navigable sections with Prev/Next buttons and a search function.
- **"Multiple choice is too easy, I can just guess"** → Replaced with typed short-answer and open-ended questions. Open-ended answers are scored using AI semantic similarity.
- **"I finish and immediately forget what I read"** → Questions are interleaved with the passage sections and include detailed explanations after each attempt.
- **"When I get an answer wrong, I don’t really learn why"** → Clear explanations are shown after every submission.
- **"Feels like a test, not learning"** → Added gamification with streak tracking and badges.
- **"Can’t find a specific part quickly"** → Built-in search across the passage.
- **"My younger brother is slower at reading"** → Adaptive difficulty: slower answer times automatically filter out hard questions.

## AI Approach
- Questions were pre-generated using **OpenAI GPT-4o-mini** via a build-time script for consistency and cost control.
- For open-ended and short-answer questions, answers are evaluated in real-time using semantic similarity via the `/api/evaluate` endpoint.
- This ensures paraphrases and genuine understanding are rewarded rather than exact wording.

## Key Features & Decisions
- **Sectioned Passage** with navigation and search for better readability and retention.
- **Mixed Question Types** with typed input (no multiple-choice guessing).
- **AI-Powered Scoring** for open-ended questions.
- **Gamification**: Live streak counter and badges (e.g., "Streak Master" at 3 consecutive correct answers).
- **Adaptive Difficulty**: Tracks time per question and automatically removes hard questions for slower readers.
- **Fully Responsive** design that works well on both mobile and desktop.

## Technical Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI (GPT-4o-mini)
- Deployed on Vercel

## How to Run Locally
```bash
npm install
npm run dev
