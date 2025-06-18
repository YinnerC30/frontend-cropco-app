import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { AxiosError } from 'axios';
import { createContext, ReactNode } from 'react';
import { AuthTenantContextProps } from '../interfaces/AuthTenantContextProps';

export const TIME_ACTIVE_TOKEN = 60_000 * 6;
export const TIME_QUESTION_RENEW_TOKEN = 60_000 * 5.5;
export type ModulesCropco =
  | 'users'
  | 'clients'
  | 'employees'
  | 'crops'
  | 'harvests'
  | 'suppliers'
  | 'supplies'
  | 'works'
  | 'sales'
  | 'payments'
  | 'shopping'
  | 'consumptions'
  | 'dashboard';
type GlobalActionsUser = Record<ModulesCropco, Record<string, boolean>>;

export interface HandleErrorProps {
  error: AxiosError<TypedAxiosError, unknown>;
  messagesStatusError: {
    notFound?: string;
    badRequest?: string;
    unauthorized?: string;
    conflict?: string;
    other?: string;
  };
}

interface DataActionsAuthorization {
  [key: string]: {
    actions: Set<string>;
  };
}

export const AuthTenantContext = createContext<
  AuthTenantContextProps | undefined
>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [executeQueryModule, setExecuteQueryModule] = useState(false);
  // const queryGetAllModules = useGetAllModules({
  //   executeQuery: executeQueryModule,
  // });

  // const { user } = useAppSelector((state: RootState) => state.authentication);
  // const { tenant } = useAppSelector((state: RootState) => state.tenant);

  // const queryClient = useQueryClient();
  // const tokenSession = user?.token;
  // const tenantId = tenant.id;

  // const dispatch = useDispatch();

  // const saveUserInState = (user: UserActive) => {
  //   dispatch(setUserActive(user));
  // };
  // const saveTenantInState = (tenant: Tenant) => {
  //   dispatch(setTenant(tenant));
  // };

  // const saveTenant = (tenant: Tenant) => {
  //   saveTenantInLocalStorage(tenant);
  //   saveTenantInState(tenant);
  // };
  // const saveUser = (user: UserActive) => {
  //   saveUserInLocalStorage(user);
  //   saveUserInState(user);
  // };

  // const removeTenantInState = () => {
  //   dispatch(removeUserActive());
  // };

  // const removeTenant = () => {
  //   removeTenantInLocalStorage();
  //   removeTenantInState();
  // };

  // const removeUserInState = () => {
  //   dispatch(removeUserActive());
  // };

  // const removeUser = () => {
  //   setExecuteQueryModule(false);
  //   removeUserInLocalStorage();
  //   removeUserInState();
  //   removeTenant();
  //   queryClient.clear();
  // };

  // const renewTokenInState = (token: string) => {
  //   dispatch(setToken(token));
  // };

  // const updateTokenInClient = (token: string) => {
  //   if (user) {
  //     renewTokenInLocalStorage(user, token);
  //     renewTokenInState(token);
  //   }
  // };

  // const handleError = ({ error, messagesStatusError }: HandleErrorProps) => {
  //   const { response } = error;
  //   const {
  //     badRequest = 'La solicitud contiene información incorrecta',
  //     unauthorized = 'No tienes permiso para realizar esta acción',
  //     other = 'Ocurrió un error inesperado',
  //     notFound = 'No se encontró la información solicitada',
  //     conflict = 'Existe un conflicto al realizar la solicitud',
  //   } = messagesStatusError;

  //   const handleNetworkError = () => {
  //     if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
  //       toast.error('El servicio actualmente no se encuentra disponible');
  //       return true;
  //     }
  //     return false;
  //   };

  //   if (handleNetworkError()) return;

  //   switch (response?.status) {
  //     case 400:
  //       toast.error(badRequest);
  //       break;
  //     case 401:
  //       removeUser();
  //       toast.error('Su sesión ha expirado, volveras al Login 😉');
  //       break;
  //     case 403:
  //       toast.error(unauthorized);
  //       break;
  //     case 404:
  //       toast.error(notFound);
  //       break;
  //     case 409:
  //       toast.error(conflict);
  //       break;
  //     default:
  //       toast.error(other);
  //       break;
  //   }
  // };

  // const navigate = useNavigate();

  // const nameModulesUser: string[] = useMemo(() => {
  //   return user?.modules?.map((module: Module) => module?.name) ?? [];
  // }, [user]);

  // const userAuthData: DataActionsAuthorization = useMemo(() => {
  //   return (
  //     user?.modules?.reduce((acc: DataActionsAuthorization, module: Module) => {
  //       acc[module.name] = {
  //         actions: new Set(
  //           module?.actions.map((action: Action) => action.name)
  //         ),
  //       };
  //       return acc;
  //     }, {}) ?? {}
  //   );
  // }, [user]);

  // const hasPermission = (moduleName: string, actionName: string): boolean => {
  //   return userAuthData[moduleName]?.actions.has(actionName) ?? false;
  // };

  // const getNameActionsModule = (nameModule: string) => {
  //   const module = queryGetAllModules.data?.find(
  //     (module: Module) =>
  //       module.name === nameModule && queryGetAllModules.isSuccess
  //   );
  //   return module?.actions.map((action: Action) => action.name) ?? [];
  // };

  // const validatePermissionsInModule = (
  //   moduleName: string
  // ): Record<string, boolean> => {
  //   const userActions = userAuthData[moduleName]?.actions ?? new Set();
  //   const moduleActions = getNameActionsModule(moduleName);

  //   const finalActions: Record<string, boolean> = moduleActions.reduce(
  //     (acc: Record<string, boolean>, action: string | undefined | null) => {
  //       if (action) {
  //         acc[action] = userActions.has(action);
  //       }
  //       return acc;
  //     },
  //     {}
  //   );
  //   return finalActions;
  // };

  // const getGlobalActionsUser = (): GlobalActionsUser => {
  //   if (!!queryGetAllModules && queryGetAllModules.isSuccess) {
  //     return queryGetAllModules.data?.reduce((acc, module) => {
  //       acc[module.name] = validatePermissionsInModule(module.name);
  //       return acc;
  //     }, {} as any);
  //   }

  //   return { ...defaultGlobalActionsUserAdmin };
  // };

  // const getActionsModule = (
  //   moduleName: ModulesCropco
  // ): Record<string, boolean> => {
  //   return { ...getGlobalActionsUser()[moduleName] };
  // };

  // const hasMoreThanOnePermission = (moduleName: string) => {
  //   return userAuthData[moduleName]?.actions.size ?? 0;
  // };

  // useEffect(() => {
  //   if (!user?.isLogin) {
  //     setExecuteQueryModule(false);
  //     navigate(PATH_LOGIN, { replace: true });
  //   } else if (user.isLogin) {
  //     setExecuteQueryModule(true);
  //   }
  // }, [navigate, user]);

  return (
    <AuthTenantContext.Provider
      value={
        {
          // saveUser,
          // isLogin: user?.isLogin ?? false,
          // removeUser,
          // updateTokenInClient,
          // tokenSession,
          // user,
          // handleError,
          // nameModulesUser,
          // hasMoreThanOnePermission,
          // hasPermission,
          // validatePermissionsInModule,
          // getGlobalActionsUser,
          // getActionsModule,
          // isLoading: queryGetAllModules.isLoading,
          // isError: queryGetAllModules.isError,
          // tenantId,
          // saveTenant,
        }
      }
    >
      {children}
    </AuthTenantContext.Provider>
  );
};

export default AuthProvider;
