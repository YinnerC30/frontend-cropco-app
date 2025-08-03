import { useSubdomainRedirect } from '@/hooks';
import Features from './Features';
import Header from './Header';
import Hero from './Hero';

export const LandingPage = () => {
  useSubdomainRedirect({
    redirectRoute: '/',
    baseDomain: 'localhost',
    autoRedirect: true,
  });

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
