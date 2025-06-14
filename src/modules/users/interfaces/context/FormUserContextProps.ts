import { Module } from '@/modules/core/interfaces';
import { FormContextProps } from '@/modules/core/interfaces/form/FormContextProps';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { UserAction } from '../../components';
import { formSchemaUser, formSchemaUserWithPassword } from '../../utils';

export interface FormUserContextProps extends FormContextProps {
  userHasAction: ({ id }: { id: string }) => boolean;
  handleInselectAllActions: () => void;
  handleInselectAllActionsInModule: (nameModule: string) => void;
  handleSelectAllActionInModule: (nameModule: string) => void;
  handleSelectAllActions: () => void;
  updateActionsUserForm: (actions: UserAction[]) => void;
  onSubmit: (
    values: z.infer<typeof formSchemaUserWithPassword | typeof formSchemaUser>
  ) => void;
  hiddenPassword: boolean;
  queryModules: UseQueryResult<Module[], AxiosError>;
  isSelectedAllActions: boolean;
  setIsSelectedAllActions: React.Dispatch<React.SetStateAction<boolean>>;
  IsSelectedAllActionsInModule: (nameModule: string) => boolean;
}
