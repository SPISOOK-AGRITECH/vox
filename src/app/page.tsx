import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import CallToAction from "@/components/CallToAction";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StarFieldBackground from "@/components/StarFieldBackground";

/**
 * Home page component
 * @returns The main landing page with all sections
 */
export default function Home() {
  return (
    <div className="min-h-screen relative bg-black">
      <StarFieldBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Services />
        <WhyChooseUs />
        <CallToAction />
        <Location />
        <Footer />
      </div>
      <FloatingWhatsApp />
    </div>
  );
}

