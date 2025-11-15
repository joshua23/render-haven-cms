import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ArticlesSection } from "@/components/ArticlesSection";
import { Footer } from "@/components/Footer";
import FloatingWindow from "@/components/FloatingWindow";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ArticlesSection />
      <Footer />
      <FloatingWindow />
    </div>
  );
};

export default Index;
