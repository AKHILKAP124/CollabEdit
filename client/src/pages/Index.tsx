import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

const Index = () => {

  console.log('Backend URL:', import.meta.env.REACT_APP_BACKEND_URL);


  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };


  return (
    <div className="min-h-screen bg-background">
      <Header openAuthModal={openAuthModal} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <ResourcesSection />
      </main>
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </div>
  );
};

export default Index;
