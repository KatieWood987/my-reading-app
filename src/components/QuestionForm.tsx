'use client';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

type Question = { 
  id: number;
  text: string;
  type: 'multiple' | 'short' | 'open';
  options?: string[]; 
  answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

const questions = [
  {
    id: 1,
    text: "What is the primary role of the queen bee in the hive?",
    type: "short",
    answer: "To lay eggs and keep the colony growing.",
    explanation: "The passage states the queen lays up to 2,000 eggs per day and her main job is reproduction, not decision-making.",
    difficulty: "easy"
  },
  {
    id: 2,
    text: "How do worker bees' responsibilities change as they age?",
    type: "open",
    answer: "Young workers handle indoor tasks like cleaning, feeding, and building; older ones guard the entrance; the oldest forage for food.",
    explanation: "The passage describes a progression from internal hive maintenance to external roles, showing the organized division of labor.",
    difficulty: "medium"
  },
  {
    id: 3,
    text: "Why do worker bees push drones out of the hive in autumn?",
    type: "multiple",
    options: ["To make room for more queens", "To conserve resources when food is scarce", "Because drones start fighting", "To help them find new hives"],
    answer: "To conserve resources when food is scarce",
    explanation: "Drones don't contribute to food collection or defense, so they're expelled to save scarce resources, as per the passage.",
    difficulty: "easy"
  },
  {
    id: 4,
    text: "Explain how the 'waggle dance' helps bees communicate food locations.",
    type: "short",
    answer: "The angle indicates direction relative to the sun, and the waggle length shows distance.",
    explanation: "This dance allows efficient sharing of information, enabling other foragers to locate flowers up to five miles away.",
    difficulty: "medium"
  },
  {
    id: 5,
    text: "If a hive lost its foragers due to a storm, how might this impact the colony's survival? Infer based on the passage.",
    type: "open",
    answer: "The hive would struggle with food shortages, as foragers collect nectar and pollen; this could lead to reduced growth or starvation, especially since workers handle all non-reproductive tasks.",
    explanation: "Foragers are crucial for resources; without them, the colony can't sustain itself, mirroring how drones are expelled in scarcity.",
    difficulty: "hard"
  },
  {
    id: 6,
    text: "Compare the roles of worker bees and drones in the hive.",
    type: "multiple",
    options: ["Both collect food but workers also lay eggs", "Workers do all labor while drones only mate", "Drones guard while workers forage", "Both have stingers for defense"],
    answer: "Workers do all labor while drones only mate",
    explanation: "Workers (females) manage cleaning, building, guarding, and foraging; drones (males) solely mate and lack stingers or other jobs, highlighting the hive's efficiency.",
    difficulty: "hard"
  }
];

export default function QuestionSection() {
  const [answers, setAnswers] = useState<Record<number, { userAnswer: string; isCorrect: boolean | null }>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [averageTime, setAverageTime] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const filteredQuestions = questions.filter(q => averageTime > 30000 ? q.difficulty !== 'hard' : true);
  const q = filteredQuestions[currentQuestion];

  // Time tracking per question
  useEffect(() => {
    const start = Date.now();
    return () => {
      const time = Date.now() - start;
      if (time > 0) {
        const newTimes = [...questionTimes, time];
        setQuestionTimes(newTimes);
        const avg = newTimes.reduce((a, b) => a + b, 0) / newTimes.length || 0;
        setAverageTime(avg);
      }
    };
  }, [currentQuestion]);

  const handleSubmit = async (userAnswer: string) => { 
    if (!userAnswer.trim()) return;

    setIsLoading(true);

    let isCorrect: boolean;
    if (q.type === 'open' || q.type === 'short') { 
      try {
        const res = await fetch('/api/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userAnswer, correctAnswer: q.answer }),
        });
        if (!res.ok) throw new Error(`API failed: ${res.status}`);
        const data = await res.json();
        isCorrect = data.isCorrect;
      } catch (error) {
        console.error('Fetch error:', error); 
        isCorrect = false; 
      }
    } else {
      isCorrect = userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase();
    }

    setAnswers({ ...answers, [q.id]: { userAnswer, isCorrect } });
    if (isCorrect) {
      setScore(score + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));
      if (newStreak === 3) {
        setBadges([...badges, 'Streak Master']);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      setStreak(0);
    }

    setShowExplanation(true);
    setUserInput('');
    setIsLoading(false);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion >= filteredQuestions.length) {
    return (
      <div className="text-center text-2xl font-bold text-zinc-900">
        Score: {score}/{filteredQuestions.length}
        <p className="text-lg mt-2">Max Streak: {maxStreak}</p> 
        <p className="text-lg">Badges: {badges.join(', ') || 'None earned yet'}</p> 
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md text-zinc-900">
      {showConfetti && <Confetti />}

      <h2 className="text-xl font-semibold mb-4 text-zinc-900">{q.text}</h2>
      
      {q.type === 'multiple' && q.options && (
        <div className="space-y-2">
          {q.options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleSubmit(opt)} 
              className="w-full p-3 border rounded hover:bg-gray-100 text-base sm:text-lg text-zinc-900"
              disabled={isLoading}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {['short', 'open'].includes(q.type) && (
        <div>
          <input 
            type="text" 
            placeholder="Type your answer..." 
            value={userInput} 
            onChange={(e) => setUserInput(e.target.value)} 
            className="w-full p-3 border rounded mb-4 text-base sm:text-lg text-zinc-900" 
            disabled={isLoading}
          />
          <button 
            onClick={() => handleSubmit(userInput)} 
            className="w-full bg-green-500 text-white px-4 py-3 rounded disabled:bg-gray-400 text-base sm:text-lg" 
            disabled={isLoading || !userInput.trim()}
          >
            {isLoading ? 'Evaluating...' : 'Submit'}
          </button>
        </div>
      )}

      {showExplanation && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-zinc-900">
          <p className="font-medium">{answers[q.id]?.isCorrect ? 'Correct!' : 'Incorrect.'}</p>
          <p className="mt-2 text-zinc-800">{q.explanation}</p>
          <button 
            onClick={nextQuestion} 
            className="mt-4 w-full bg-blue-500 text-white px-4 py-3 rounded text-base sm:text-lg"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}