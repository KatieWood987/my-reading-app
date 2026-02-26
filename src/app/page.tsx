import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Reading Comprehension App</h1>
      <Link href="/comprehension/passage-1" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
        Start with Honeybees Passage
      </Link>
    </main>
  );
}
