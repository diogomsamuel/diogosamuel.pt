import Head from "next/head";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { SocialSection } from "../components/sections/SocialSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Diogo Samuel | Lifestyle & Fitness</title>
        <meta name="description" content="Follow my journey through fitness, lifestyle, and personal growth. Let's grow together." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-background min-h-screen">
        <Navbar />
        
        <div className="pt-16">
          <HeroSection />
          <AboutSection />
          <SocialSection />
        </div>
        
        <Footer />
      </main>
    </>
  );
}
