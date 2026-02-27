'use client'; // Client component for state
import { useState, useEffect } from 'react';
import { passage } from '@/lib/passage';
import { useReading } from '@/context/ReadingContext';

export default function PassageViewer() {
  const sections = passage.content.split('\n\n').map(sec => sec.trim()).filter(sec => sec.length > 0); // Fix: Trim/filter empty
  const [currentSection, setCurrentSection] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionTimes, setSectionTimes] = useState<number[]>([]);

  const { setAverageTime } = useReading();

  useEffect(() => {
    console.log('Passage title:', passage.title); // Debug: Import check
    console.log('Passage content length:', passage.content.length); // Debug: Empty check
    console.log('Sections length:', sections.length); // Debug: Split check
    console.log('Current section content:', sections[currentSection] || 'Empty'); // Debug: Display check
    console.log('Search term:', searchTerm); // Debug: Filter check
  }, [currentSection, searchTerm, sections]); // Run on changes

  useEffect(() => {
    const start = Date.now();
    console.log('Timing started for section', currentSection);
    return () => {
      const time = Date.now() - start;
      if (time > 0) {
        const newTimes = [...sectionTimes, time];
        setSectionTimes(newTimes);
        const avg = newTimes.reduce((a, b) => a + b, 0) / newTimes.length || 0;
        setAverageTime(avg);
        console.log('Time for section', currentSection, ':', time, 'ms');
        console.log('New average time:', avg, 'ms');
      }
    };
  }, [currentSection]);

  const filteredSections = sections.filter((sec) => sec.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{passage.title}</h1>
      <input
        type="text"
        placeholder="Search passage..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="prose mb-6">
        {searchTerm ? filteredSections.map((sec, i) => <p key={i}>{sec}</p>) : <p>{sections[currentSection]}</p>}
      </div>
      {!searchTerm && (
        <div className="flex justify-between">
          <button onClick={() => setCurrentSection(Math.max(0, currentSection - 1))} disabled={currentSection === 0} className="bg-blue-500 text-white px-4 py-2 rounded">Prev</button>
          <button onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))} disabled={currentSection === sections.length - 1} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
      )}
    </div>
  );
}