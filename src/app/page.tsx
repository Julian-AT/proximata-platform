import { Background } from "@/components/sites/proximata/background";
import { Header } from "@/components/sites/proximata/header";
import { Hud } from "@/components/sites/proximata/hud";
import { About } from "@/components/sites/proximata/sections/about";
import { Agenda } from "@/components/sites/proximata/sections/agenda";
import { Faq } from "@/components/sites/proximata/sections/faq";
import { Footer } from "@/components/sites/proximata/sections/footer";
import { Gallery } from "@/components/sites/proximata/sections/gallery";
import { Hero } from "@/components/sites/proximata/sections/hero";
import { Learn } from "@/components/sites/proximata/sections/learn";
import { Pricing } from "@/components/sites/proximata/sections/pricing";
import { Speakers } from "@/components/sites/proximata/sections/speakers";
import { Sponsors } from "@/components/sites/proximata/sections/sponsors";
import { TickerStrip } from "@/components/sites/proximata/sections/ticker-strip";
import { VideoSection } from "@/components/sites/proximata/sections/video-section";
import { MotionProvider } from "@/components/sites/proximata/motion-provider";
import { SmoothScroll } from "@/components/sites/proximata/smooth-scroll";

export default function Home() {
  return (
    <MotionProvider>
      <div className="relative overflow-x-clip bg-ink">
        <SmoothScroll />
        <Background />
        <Header />
        <Hud />
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
          <Pricing />
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
