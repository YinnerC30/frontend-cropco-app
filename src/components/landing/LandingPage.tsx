import Features from './Features';
import Header from './Header';
import Hero from './Hero';

export const LandingPage = () => {
  const currentSubdomain = window.location.hostname.split('.')[0];
  const hasSubdomain =
    currentSubdomain !== 'www' &&
    currentSubdomain !== 'localhost' &&
    currentSubdomain !== '127.0.0.1';
  if (hasSubdomain) {
    window.location.href = 'http://localhost:5173';
  }

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
