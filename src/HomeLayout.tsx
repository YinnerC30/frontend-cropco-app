import { CommandDialogApp } from '@/modules/core/components/shared/CommandDialogApp';

import { Link, Outlet } from 'react-router-dom';
import { Header } from './components/Home/Header';
import { Main } from './components/Home/Main';
import { MyAccount } from './components/Home/MyAccount';
import { NavBar } from './components/Home/NavBar';
import { NavElement } from './components/Home/NavElement';
import { useCheckAuthStatus } from './modules/authentication/hooks';
import useAuthentication from './modules/authentication/hooks/useAuthentication';
import { Loading } from './modules/core/components';
import { Route, routes } from './routes/components/RoutesNavBar';
import { SheetNavBar } from './SheetNavBar';
import { useHome } from './useHome';

export const HomeLayout = () => {
  const { tokenSesion = '' } = useAuthentication();
  const { modulesUser } = useHome();

  const query = useCheckAuthStatus({
    token: tokenSesion,
  });

  if (query.isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid h-screen grid-cols-12 grid-rows-12">
      <CommandDialogApp />

      <Header className="fixed top-0 left-0 z-50 flex flex-row items-center w-full py-4 border-b justify-evenly bg-background">
        <SheetNavBar modulesUser={modulesUser} />
        <div className="flex items-center w-auto">
          <img src="/public/icon.png" width={30} />
          <Link
            className="mx-1 text-3xl font-medium hover:text-blue-500"
            to="/app/home"
          >
            Cropco
          </Link>
        </div>

        <MyAccount />
        <Link to={'../authentication/login'}>Ir Login</Link>
        <Link to={'/'}>Ir a Root</Link>
      </Header>

      <NavBar className="flex-col hidden gap-1 py-2 pl-4 mt-16 border-r lg:flex lg:col-span-2 row-span-11 min-w-44">
        {routes.map((route: Route) => {
          if (
            modulesUser.includes(route.name_module) ||
            route.name_module === 'N/A'
          ) {
            return <NavElement key={route.path} route={route} />;
          }
        })}
      </NavBar>

      <Main className="col-span-12 p-5 mt-16 row-span-11 lg:col-span-10 sm:col-span-12">
        <Outlet />
      </Main>
    </div>
  );
};
