import { CommandDialogApp } from '@/modules/core/components/CommandDialogApp';

import { useEffect, useLayoutEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './components/Home/Header';
import { Main } from './components/Home/Main';
import { MyAccount } from './components/Home/MyAccount';
import { NavBar } from './components/Home/NavBar';
import { NavElement } from './components/Home/NavElement';
import { useAuthenticationUser } from './modules/authentication/hooks/useAuthenticationUser';
import { ModeToggle } from './modules/core/components';
import { RootState, useAppSelector } from './redux/store';
import { useRoutesManager } from './routes/hooks/useRoutesManager';
import { Route, routes } from './routes/RoutesNavBar';
import { useHome } from './useHome';
import { useRenewToken } from './modules/authentication/hooks/useRenewToken';
import { useToast } from './components/ui/use-toast';
import { ToastAction } from './components/ui/toast';
import { useCheckAuthStatus } from './modules/authentication/hooks/useCheckAuthStatus';

export const Home = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);
  const modulesUser = user?.modules?.map((module: any) => module?.name) ?? [];

  const { isLogin, tokenSesion } = useAuthenticationUser();

  const { redirectToLogin } = useRoutesManager();

  useLayoutEffect(() => {
    if (!isLogin) {
      redirectToLogin();
    }
  }, []);

  // const { tokenSesion } = useAuthenticationUser();
  const mutationRenewToken = useRenewToken();
  const mutationCheckAuthStatus = useCheckAuthStatus();

  const handleExtendedSesion = () => {
    mutationRenewToken.mutate({ token: tokenSesion });
  };

  const handleCheckToken = () => {
    console.log(tokenSesion);
    mutationCheckAuthStatus.mutate({ token: tokenSesion });
  };

  const { toast } = useToast();

  const showToast = () => {
    return toast({
      title: 'Aumentar tiempo de sesión',
      duration: 3000,
      description:
        'La sesión esta por expirar, si desea continuar por favor presione Clic',
      action: (
        <ToastAction
          onClick={() => {
            handleExtendedSesion();
          }}
          altText="Extender sesión"
        >
          Aumentar
        </ToastAction>
      ),
    });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log('Mostrando timeout desde hook');
      showToast();
    }, 15_000);

    return () => clearTimeout(timeOut);
  }, [mutationRenewToken]);

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     console.log('Mostrando timeout desde hook');
  //     showToast();
  //   }, 15_000);

  //   return () => clearTimeout(timeOut);
  // }, [mutationCheckAuthStatus]);

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     console.log('Mostrando timeout 2 desde hook');
  //     handleCheckToken();
  //   }, 20_000);

  //   return () => clearTimeout(timeOut);
  // }, [mutationRenewToken]);

  return (
    <div className="grid h-screen grid-cols-12 grid-rows-12">
      <CommandDialogApp />

      <Header className="flex flex-row items-center col-span-12 col-start-1 row-span-1 py-4 border-b justify-evenly">
        <Link
          className="mx-4 text-3xl font-medium hover:text-blue-500"
          to="/app/home"
        >
          Cropco
        </Link>
        <ModeToggle />
        <MyAccount />
        <Link to={'../authentication/login'}>Ir Login</Link>
      </Header>

      <NavBar className="flex flex-col col-span-2 gap-1 py-2 pl-4 border-r row-span-11">
        {routes.map((route: Route) => {
          if (
            modulesUser.includes(route.name_module) ||
            route.name_module === 'N/A'
          ) {
            return (
              <NavElement key={route.path} route={route} className="w-auto " />
            );
          }
        })}
      </NavBar>

      <Main className="col-span-10 mx-5 row-span-11">
        <Outlet />
      </Main>
    </div>
  );
};
