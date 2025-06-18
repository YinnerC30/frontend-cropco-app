import Features from './Features';
import Header from './Header';
import Hero from './Hero';

export const LandingPage = () => {
  return (
    <div className="h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
    </div>
  );
};

export default { LandingPage };
