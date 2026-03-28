import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClassSchedule from "@/components/ClassSchedule";
import PricingSection from "@/components/PricingSection";
import BringAFriendSection from "@/components/BringAFriendSection";
import PaymentMethods from "@/components/PaymentMethods";
import EventsSection from "@/components/EventsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ClassSchedule />
      <PricingSection />
      <BringAFriendSection />
      <PaymentMethods />
      <EventsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
