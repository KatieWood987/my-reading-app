'use client';
import { useState } from 'react';
import { questions } from '@/lib/questions'; 

type Question = { 
  id: number;
  text: string;
  type: 'multiple' | 'short' | 'open';
  options?: string[]; 
  answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export default function QuestionSection() {
  const [answers, setAnswers] = useState<Record<number, { userAnswer: string; isCorrect: boolean | null }>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const q = questions[currentQuestion];

  const handleSubmit = async (userAnswer: string) => { 
    if (!userAnswer.trim()) return;

    setIsLoading(true);

    console.log('Question type:', q.type); // Debug

    let isCorrect: boolean;
    if (q.type === 'open' || q.type === 'short') { // Fix: Include 'short' for AI eval (or just 'open' if preferred)
      try {
        const res = await fetch('/api/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userAnswer, correctAnswer: q.answer }),
        });
        if (!res.ok) throw new Error(`API failed: ${res.status}`);
        const data = await res.json();
        console.log('API data:', data); // Debug
        isCorrect = data.isCorrect;
      } catch (error) {
        console.error('Fetch error:', error); 
        isCorrect = false; 
      }
    } else {
      isCorrect = userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase();
    }

    setAnswers({ ...answers, [q.id]: { userAnswer, isCorrect } });
    if (isCorrect) setScore(score + 1);
    setShowExplanation(true);
    setUserInput('');
    setIsLoading(false);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion >= questions.length) {
    return <div className="text-center text-2xl font-bold">Score: {score}/{questions.length}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{q.text}</h2>
      {q.type === 'multiple' && q.options && (
        <div className="space-y-2">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => handleSubmit(opt)} className="block w-full p-2 border rounded hover:bg-gray-100" disabled={isLoading}>
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
            className="w-full p-2 border rounded mb-4" 
            disabled={isLoading}
          />
          <button 
            onClick={() => handleSubmit(userInput)} 
            className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400" 
            disabled={isLoading || !userInput.trim()}
          >
            {isLoading ? 'Evaluating...' : 'Submit'}
          </button>
        </div>
      )}
      {showExplanation && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>{answers[q.id]?.isCorrect ? 'Correct!' : 'Incorrect.'}</p>
          <p>{q.explanation}</p>
          <button onClick={nextQuestion} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Continue</button>
        </div>
      )}
    </div>
  );
}