import { Outlet } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';

export const MainContent: React.FC = () => {
  const { isMobile } = useSidebar();

  return (
    <main>
      <div
        className={`flex justify-center  ${isMobile ? 'w-[90vw]' : 'w-[80vw]'}`}
      >
        <div className="w-full mt-5 ml-10">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
