import { CommandDialogApp } from '@/modules/core/components/CommandDialogApp';

import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useAuthenticationUser } from '@/modules/authentication/hooks/useAuthenticationUser';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './components/Home/Header';
import { Main } from './components/Home/Main';
import { MyAccount } from './components/Home/MyAccount';
import { NavBar } from './components/Home/NavBar';
import { NavElement } from './components/Home/NavElement';
import { ModeToggle } from './modules/core/components';
import { Route, routes } from './routes/RoutesNavBar';
import { useCheckAuthStatus } from './modules/authentication/hooks/useCheckAuthStatus';
import { useRenewToken } from './modules/authentication/hooks/useRenewToken';

export const Home = () => {
  const { toast } = useToast();
  const {
    redirectToLogin,
    isActiveSesion,
    TIME_ACTIVE_TOKEN,
    TIME_QUESTION_RENEW_TOKEN,
    modulesUser,
    getTokenSesion,
  } = useAuthenticationUser();

  const mutationCheckAuthStatus = useCheckAuthStatus();

  const mutationRenewToken = useRenewToken();

  const [visibleToastExtendSesion, setVisibleToastExtendSesion] =
    useState(false);

  useLayoutEffect(() => {
    !isActiveSesion() && redirectToLogin();
  }, [isActiveSesion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleToastExtendSesion(true);
    }, TIME_QUESTION_RENEW_TOKEN);

    return () => clearTimeout(timer);
  }, [visibleToastExtendSesion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      mutationCheckAuthStatus.mutate({ token: getTokenSesion() });
    }, TIME_ACTIVE_TOKEN);

    return () => clearTimeout(timer);
  }, [mutationCheckAuthStatus, visibleToastExtendSesion]);

  const handleAumentarSesion = () => {
    mutationRenewToken.mutate({ token: getTokenSesion() });
    setVisibleToastExtendSesion(false);
  };

  const showToast = () => {
    return toast({
      title: 'Aumentar tiempo de sesión',
      duration: 4000,
      description:
        'La sesión esta por expirar, si desea continuar por favor presione Clic',
      action: (
        <ToastAction
          onClick={() => {
            handleAumentarSesion();
          }}
          altText="Extender sesión"
        >
          Aumentar
        </ToastAction>
      ),
    });
  };

  useEffect(() => {
    if (visibleToastExtendSesion) {
      showToast();
    }
  }, [visibleToastExtendSesion]);

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
