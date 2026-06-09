import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
// added: educational "Learn More" gateway section (target of the hero button)
import LearnMore from '../components/LearnMore';
// import CTA from '../components/CTA';
// old: CTA rendered a second "Ready to get started?" section directly below
//      LearnMore, which already ends with its own CtaPanel ("Sign Up Now").
//      that produced a visually identical duplicate heading + button pair.
//      commented out — LearnMore's CTA is the one that stays.
import Footer from '../components/Footer';

const Onboarding = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <LearnMore />
      {/* <CTA /> — old duplicate "Ready to get started?" removed (see comment above) */}
      <Footer />
    </>
  );
};

export default Onboarding;