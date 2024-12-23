import { Module } from '@/modules/core/interfaces';
import { FormContextProps } from '@/modules/core/interfaces/form/FormContextProps';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserAction } from '../../components';
import { UserForm } from '../UserForm';

export interface FormUserContextProps extends FormContextProps {
  userHasAction: ({ id }: { id: string }) => boolean;
  handleInselectAllActions: () => void;
  handleInselectAllActionsInModule: (nameModule: string) => void;
  handleSelectAllActionInModule: (nameModule: string) => void;
  handleSelectAllActions: () => void;
  updateActionsUserForm: (actions: UserAction[]) => void;
  onSubmit: (values: UserForm) => Promise<void>;
  hiddenPassword: boolean;
  queryModules: UseQueryResult<Module[], AxiosError>;
}
