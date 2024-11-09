import { Outlet } from 'react-router-dom';

export const RoutesController = () => {
  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
};
export default { RoutesController };
