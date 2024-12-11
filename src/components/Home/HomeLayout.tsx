import { CommandDialogApp } from '@/modules/core/components/shared/CommandDialogApp';

import { useAuthContext, useCheckAuthStatus } from '@/auth/hooks';
import { PATH_LOGIN } from '@/config';
import { Loading } from '@/modules/core/components';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Route, routes } from '../../routes/components/RoutesNavBar';
import { useHome } from '../hooks/useHome';
import { Header } from './Header';
import { Main } from './Main';
import { MyAccount } from './MyAccount';
import { NavBar } from './NavBar';
import { NavElement } from './NavElement';
import { SheetNavBar } from './SheetNavBar';
import { useDialogStatus } from '../common/DialogStatusContext';

export const HomeLayout = () => {
  const { tokenSesion, isLogin } = useAuthContext();

  const { nameModulesUser } = useHome();
  const { isActiveDialog } = useDialogStatus();

  const query = useCheckAuthStatus({
    token: tokenSesion,
  });

  if (query.isLoading) {
    return <Loading />;
  }

  if (!isLogin) {
    return <Navigate to={PATH_LOGIN} replace />;
  }

  return (
    <div
      className={`grid h-screen grid-cols-12 grid-rows-12 ${
        isActiveDialog && 'z-50 fixed inset-0 blur-sm pointer-events-none'
      }`}
    >
      <CommandDialogApp />

      <Header className="fixed top-0 left-0 z-10 flex flex-row items-center w-screen py-4 border-b justify-evenly bg-background">
        <SheetNavBar nameModulesUser={nameModulesUser} />
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
        <Link to={PATH_LOGIN}>Login</Link>
        <Link to={'/'}>Root</Link>
      </Header>

      <NavBar className="flex-col hidden gap-1 py-2 pl-4 mt-16 border-r lg:flex lg:col-span-2 row-span-11 min-w-44">
        {routes.map((route: Route) => {
          if (
            nameModulesUser.includes(route.name_module) ||
            route.name_module === 'N/A'
          ) {
            return <NavElement key={route.path} route={route} />;
          }
        })}
      </NavBar>

      <Main className="col-span-12 p-2 mt-16 row-span-11 lg:col-span-10 sm:col-span-12">
        <Outlet />
      </Main>
    </div>
  );
};
