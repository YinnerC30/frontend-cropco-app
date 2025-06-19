import { TenantAdministrator } from './TenantAdministrator';

export interface AuthTenantContextProps {
  // saveUser: (user: UserActive) => void;
  // saveTenant: (tenant: Tenant) => void;
  isLogin: boolean;
  // removeUser: () => void;
  // updateTokenInClient: (token: string) => void;
  // tokenSession: string | undefined;
  // tenantId: string | undefined;
  user: TenantAdministrator | null;
  // handleError: ({ error, messagesStatusError }: HandleErrorProps) => void;
  // nameModulesUser: string[];
  // hasMoreThanOnePermission: (moduleName: string) => number;
  // hasPermission: (moduleName: string, actionName: string) => boolean;
  // validatePermissionsInModule: (moduleName: string) => Record<string, boolean>;
  // getGlobalActionsUser?: () => Record<string, Record<string, boolean>>;
  // getActionsModule: (moduleName: ModulesCropco) => Record<string, boolean>;
  // isLoading: boolean;
  // isError: boolean;
  saveTenantManagement: (tenant: TenantAdministrator) => void;
  removeTenantManagement: () => void;
}
