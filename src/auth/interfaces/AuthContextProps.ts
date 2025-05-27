import { HandleErrorProps, ModulesCropco } from '../components';
import { UserActive } from './UserActive';

export interface AuthContextProps {
  saveUser: (user: UserActive) => void;
  isLogin: boolean;
  removeUser: () => void;
  updateTokenInClient: (token: string) => void;
  tokenSession: string | undefined;
  user: UserActive | null;
  handleError: ({ error, messagesStatusError }: HandleErrorProps) => void;
  nameModulesUser: string[];
  hasMoreThanOnePermission: (moduleName: string) => number;
  hasPermission: (moduleName: string, actionName: string) => boolean;
  validatePermissionsInModule: (moduleName: string) => Record<string, boolean>;
  getGlobalActionsUser?: () => Record<string, Record<string, boolean>>;
  getActionsModule: (moduleName: ModulesCropco) => Record<string, boolean>;
  isLoading: boolean;
  isError: boolean;
}
