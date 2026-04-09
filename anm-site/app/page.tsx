import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import CaseStudy from "@/components/CaseStudy";
import Industries from "@/components/Industries";
import WhyAnm from "@/components/WhyAnm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <CaseStudy />
        <Industries />
        <WhyAnm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
