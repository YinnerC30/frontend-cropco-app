import { FormContextProps } from '@/modules/core/interfaces/form/FormContextProps';
import { z } from 'zod';
import {
  formSchemaAdministrator,
  formSchemaAdministratorWithPassword,
} from '../../utils/formSchemaAdministrator';

export interface FormAdministratorContextProps extends FormContextProps {
  // userHasAction: ({ id }: { id: string }) => boolean;
  // handleInselectAllActions: () => void;
  // handleInselectAllActionsInModule: (nameModule: string) => void;
  // handleSelectAllActionInModule: (nameModule: string) => void;
  // handleSelectAllActions: () => void;
  // updateActionsAdministratorForm: (actions: AdministratorAction[]) => void;
  onSubmit: (
    values: z.infer<
      | typeof formSchemaAdministratorWithPassword
      | typeof formSchemaAdministrator
    >
  ) => void;
  hiddenPassword: boolean;
  // queryModules: UseQueryResult<Module[], AxiosError>;
  // isSelectedAllActions: boolean;
  // setIsSelectedAllActions: React.Dispatch<React.SetStateAction<boolean>>;
  // IsSelectedAllActionsInModule: (nameModule: string) => boolean;
}
