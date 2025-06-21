import { HandleErrorProps } from '../components/AuthTenantContext';
import { Administrator } from './Administrator';


export interface AuthTenantContextProps {
  // saveUser: (user: UserActive) => void;
  // saveTenant: (tenant: Tenant) => void;
  is_login: boolean;
  // removeUser: () => void;
  // updateTokenInClient: (token: string) => void;
  tokenSession: string | undefined;
  // tenantId: string | undefined;
  user: Administrator | null;
  handleError: ({ error, messagesStatusError }: HandleErrorProps) => void;
  // nameModulesUser: string[];
  // hasMoreThanOnePermission: (moduleName: string) => number;
  // hasPermission: (moduleName: string, actionName: string) => boolean;
  // validatePermissionsInModule: (moduleName: string) => Record<string, boolean>;
  // getGlobalActionsUser?: () => Record<string, Record<string, boolean>>;
  // getActionsModule: (moduleName: ModulesCropco) => Record<string, boolean>;
  // isLoading: boolean;
  // isError: boolean;
  saveTenantManagement: (tenant: Administrator) => void;
  removeTenantManagement: () => void;
}
