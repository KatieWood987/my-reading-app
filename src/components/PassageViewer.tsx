'use client'; // Client component for state
import { useState, useEffect } from 'react';
import { useReading } from '@/context/ReadingContext';

export default function PassageViewer() {
  const passage = {
    id: "passage-1",
    title: "The Secret Life of Honeybees",
    content: `Inside every beehive, there is a world more organized than most human cities. A single hive can contain up to 60,000 bees, and every single one has a job to do. At the center of the hive is the queen bee.\n\nShe is the only bee that lays eggs—up to 2,000 per day during summer. Despite her title, the queen doesn't actually make decisions for the hive. Her main job is simply to lay eggs and keep the colony growing.\n\nThe worker bees are all female, and they do everything else. Young workers stay inside the hive, cleaning cells, feeding larvae, and building honeycomb from wax they produce from their own bodies.\n\nAs they get older, they graduate to guarding the hive entrance. The oldest workers become foragers, flying up to five miles from the hive to collect nectar and pollen.\n\nMale bees are called drones. They don't collect food, don't guard the hive, and don't have stingers. Their only purpose is to mate with queens from other hives.\n\nIn autumn, when food becomes scarce, the workers push the drones out of the hive to conserve resources. Bees communicate through dancing.\n\nWhen a forager finds a good source of flowers, she returns to the hive and performs a 'waggle dance' that tells other bees exactly where to find the food. The angle of her dance shows the direction relative to the sun, and the length of her waggle shows the distance.\n\nThis tiny insect has been making honey the same way for over 100 million years. Every spoonful of honey represents the life's work of about twelve bees.`
  };

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
  <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md text-zinc-900">
    <h1 className="text-3xl font-bold mb-4 text-zinc-900">{passage.title}</h1>
    <input
      type="text"
      placeholder="Search passage..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 mb-4 border rounded text-base sm:text-lg text-zinc-900"
    />
    <div className="prose mb-6 text-zinc-900 leading-relaxed">
      {searchTerm 
        ? filteredSections.map((sec, i) => <p key={i} className="text-zinc-900">{sec}</p>) 
        : <p className="text-zinc-900">{sections[currentSection]}</p>}
    </div>
    {!searchTerm && (
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <button 
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))} 
          disabled={currentSection === 0} 
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded text-base sm:text-lg"
        >
          Prev
        </button>
        <button 
          onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))} 
          disabled={currentSection === sections.length - 1} 
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded text-base sm:text-lg"
        >
          Next
        </button>
      </div>
    )}
  </div>
);
}