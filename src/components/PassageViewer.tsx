'use client'; // Client component for state
import { useState } from 'react';
import { passage } from '@/lib/passage';

export default function PassageViewer() {
  const sections = passage.content.split('\n\n'); // Split into paragraphs
  const [currentSection, setCurrentSection] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

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