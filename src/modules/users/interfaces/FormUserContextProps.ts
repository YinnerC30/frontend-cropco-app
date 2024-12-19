import { useCreateForm } from '@/modules/core/hooks';

import { UserAction } from '../components';
import { UserForm } from './UserForm';
import { Module } from '@/modules/core/interfaces';

export interface FormUserContextProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  togglePasswordVisibility: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  form: ReturnType<typeof useCreateForm>;
  userActions: UserAction[];
  userHasAction: ({ id }: { id: string }) => boolean;
  modules: Module[];
  data: Module[];
  isLoadingModules: boolean;
  isSuccess: boolean;
  handleInselectAllActions: () => void;
  handleInselectAllActionsInModule: (nameModule: string) => void;
  handleSelectAllActionInModule: (nameModule: string) => void;
  handleSelectAllActions: () => void;
  updateActionsUserForm: (actions: UserAction[]) => void;
  isSubmitting: boolean;
  onSubmit: (values: UserForm) => Promise<void>;
  readOnly: boolean;
  handleReturnToModule: () => void;
  hiddenPassword: boolean;
  hasPermission: (module: string, action: string) => boolean;
  showAlert: boolean;
}
