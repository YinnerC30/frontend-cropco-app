import { useSidebar } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { Toaster as Sonner } from 'sonner';
import { Toaster } from '../ui/toaster';

export const MainContent: React.FC = () => {
  const { isMobile, open } = useSidebar();

  return (
    <main>
      <div
        className={`h-screen px-5 pt-5  ${
          isMobile
            ? 'w-screen'
            : open
            ? 'w-[calc(100vw-var(--sidebar-width))]'
            : 'w-screen'
        }`}
      >
        <Outlet />
        <Sonner position="top-right" richColors closeButton />
        <Toaster />
      </div>
    </main>
  );
};
