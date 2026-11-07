import { Background } from "@/components/sites/confer/background";
import { Header } from "@/components/sites/confer/header";
import { About } from "@/components/sites/confer/sections/about";
import { Agenda } from "@/components/sites/confer/sections/agenda";
import { Faq } from "@/components/sites/confer/sections/faq";
import { Footer } from "@/components/sites/confer/sections/footer";
import { Gallery } from "@/components/sites/confer/sections/gallery";
import { Hero } from "@/components/sites/confer/sections/hero";
import { Journal } from "@/components/sites/confer/sections/journal";
import { Learn } from "@/components/sites/confer/sections/learn";
import { Pricing } from "@/components/sites/confer/sections/pricing";
import { Speakers } from "@/components/sites/confer/sections/speakers";
import { Sponsors } from "@/components/sites/confer/sections/sponsors";
import { TickerStrip } from "@/components/sites/confer/sections/ticker-strip";
import { VideoSection } from "@/components/sites/confer/sections/video-section";
import { SmoothScroll } from "@/components/sites/confer/smooth-scroll";
import { TemplateBadge } from "@/components/sites/confer/template-badge";

export default function Home() {
  return (
    <div className="relative overflow-x-clip bg-black">
      <SmoothScroll />
      <Background />
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <TickerStrip />
        <VideoSection />
        <Learn />
        <Speakers />
        <Agenda />
        <Sponsors />
        <Gallery />
        <Faq />
        <Journal />
        <Pricing />
      </main>
      <Footer />
      <TemplateBadge />
    </div>
  );
}
