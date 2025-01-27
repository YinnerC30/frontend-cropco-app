import { useSidebar } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

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
      </div>
    </main>
  );
};
