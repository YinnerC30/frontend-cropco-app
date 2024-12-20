import { UserActive } from './UserActive';
import { HandleErrorProps, ModulesCropco } from '../components';
import { Module } from '@/modules/core/interfaces';

export interface AuthContextProps {
  saveUser: (user: UserActive) => void;
  isLogin: boolean;
  removeUser: () => void;
  updateUserActions: (modules: Module[]) => void;
  updateTokenInClient: (token: string) => void;
  tokenSession: string | undefined;
  user: UserActive | null;
  handleError: (props: HandleErrorProps) => void;
  nameModulesUser: string[];
  hasMoreThanOnePermission: (moduleName: string) => number;
  hasPermission: (moduleName: string, actionName: string) => boolean;
  validatePermissionsInModule: (moduleName: string) => Record<string, boolean>;
  globalActionsUser?: Record<string, Record<string, boolean>>;
  getActionsModule: (moduleName: ModulesCropco) => Record<string, boolean>;
}
