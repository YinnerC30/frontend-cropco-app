import { useSidebar } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { Toaster as Sonner } from 'sonner';
import { Toaster } from '../ui/toaster';

export const MainContent: React.FC = () => {
  const { isMobile } = useSidebar();

  return (
    <main>
      <div
        className={`flex justify-center  ${isMobile ? 'w-[90vw]' : 'w-[80vw]'}`}
      >
        <div className="w-full mt-5 ml-10">
          <Outlet />
          <Sonner position="top-right" richColors closeButton />
          <Toaster />
        </div>
      </div>
    </main>
  );
};
