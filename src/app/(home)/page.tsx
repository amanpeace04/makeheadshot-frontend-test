import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* <div className="h-screen bg-black"></div> */}
      <Hero />
      <Features />
      <BeforeAfter />
      <Testimonials />
      <Pricing />
      <FAQ />
    </div>
  );
}
