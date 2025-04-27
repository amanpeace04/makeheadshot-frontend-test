import Hero from "@/components/Hero";
import ImageSlider from "@/components/image-slider";

import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import Customers from "@/components/Customers";
import Comparison from "@/components/Comparison";
import UseCases from "@/components/UseCases";
import QuotesSlider from "@/components/QuotesSlider";
import CTASection from "@/components/CTASection";
import PrivacySecurity from "@/components/PrivacySecurity";
export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* <div className="h-screen bg-black"></div> */}

      <Hero />
      <ImageSlider />
      <HowItWorks />
      <Customers />
      <Comparison />
      <UseCases />
      <QuotesSlider />
      <Pricing />
      <Testimonials />
      <PrivacySecurity />
      <FAQ />
      <CTASection />
    </div>
  );
}
