import { Nav } from "@/components/nav";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/hero";
import { Anatomy } from "@/components/anatomy";
import { Method } from "@/components/method";
import { Library } from "@/components/library";
import { StatsBand } from "@/components/stats-band";
import { Research } from "@/components/research";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <ScrollProgress />
      <main>
        <Hero />
        <Anatomy />
        <Method />
        <Library />
        <StatsBand />
        <Research />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
