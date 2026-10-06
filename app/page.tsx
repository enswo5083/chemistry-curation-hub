import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import CurationSection from '@/components/CurationSection';
import PedagogySection from '@/components/PedagogySection';
import ChemicalToolSection from '@/components/ChemicalToolSection';
import QuizSection from '@/components/QuizSection';
import CommunitySection from '@/components/CommunitySection';
import Footer from '@/components/Footer';
import ChemistryChatbot from '@/components/ChemistryChatbot';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      <Navbar />
      <div className="flex-1">
        <HeroBanner />
        <CurationSection />
        <PedagogySection />
        <ChemicalToolSection />
        <QuizSection />
        <CommunitySection />
      </div>
      <Footer />
      {/* 🧪 Socratic Scaffolding Chemistry Chatbot */}
      <ChemistryChatbot />
    </main>
  );
}
