'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type ReadingContextType = {
  averageTime: number; // Average time per section (ms)
  setAverageTime: (time: number) => void;
};

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [averageTime, setAverageTime] = useState(0);
  return (
    <ReadingContext.Provider value={ { averageTime, setAverageTime } }>
      {children}
    </ReadingContext.Provider>
  );
}

export function useReading() {
  const context = useContext(ReadingContext);
  if (!context) throw new Error('useReading must be inside ReadingProvider');
  return context;
}