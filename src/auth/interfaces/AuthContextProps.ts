import { ModulesCropco } from '../components';
import { UseHandlerErrorProps } from '../hooks/errors/useHandlerError';
import { Tenant } from './Tenant';
import { UserActive } from './UserActive';

export interface AuthContextProps {
  saveUser: (user: UserActive) => void;
  saveTenant: (tenant: Tenant) => void;
  is_login: boolean;
  removeUser: () => void;
  updateTokenInClient: (token: string) => void;
  tokenSession: string | undefined;
  tenantId: string | undefined;
  user: UserActive | null;
  handleError: (props: UseHandlerErrorProps) => void;
  nameModulesUser: string[];
  hasMoreThanOnePermission: (moduleName: string) => number;
  hasPermission: (moduleName: string, actionName: string) => boolean;
  validatePermissionsInModule: (moduleName: string) => Record<string, boolean>;
  getGlobalActionsUser?: () => Record<string, Record<string, boolean>>;
  getActionsModule: (moduleName: ModulesCropco) => Record<string, boolean>;
  isLoading: boolean;
  isError: boolean;
}
