import PassageViewer from '@/components/PassageViewer';
import QuestionSection from '@/components/QuestionForm';

export default function ComprehensionPage({ params }: { params: { passageId: string } }) {
  // For now, hardcode passage-1; in prod, fetch based on id
  // Optional: if (params.passageId !== 'passage-1') return <h1>Invalid Passage</h1>;
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <PassageViewer />
      <QuestionSection />
    </main>
  );
}