import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { SocialSection } from "../components/sections/SocialSection";
import { BarberSection } from "../components/sections/BarberSection";
import { ContentGridSection } from "../components/sections/ContentGridSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Diogo Samuel - Personal Trainer & Barber</title>
        <meta name="description" content="Personal trainer and professional barber based in Portugal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ContentGridSection />
        <BarberSection />
        <SocialSection />
      </main>

      <Footer />
    </div>
  );
}
