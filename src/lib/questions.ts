export type Question = {
  id: number;
  text: string;
  type: 'multiple' | 'short' | 'open';
  options?: string[];
  answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export const questions: Question[] = [
  {
    id: 1,
    text: "What is the primary role of the queen bee in the hive?",
    type: "short",
    answer: "To lay eggs and keep the colony growing.",
    explanation: "The passage states the queen lays up to 2,000 eggs per day and her main job is reproduction, not decision-making.",
    difficulty: "easy"
  },
  // Add the other 5 from previous samples
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