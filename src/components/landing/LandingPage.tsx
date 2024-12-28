import Features from './Features';
import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default { LandingPage };
