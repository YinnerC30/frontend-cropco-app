import { FormContextProps } from '@/modules/core/interfaces/form/FormContextProps';
import { z } from 'zod';
import {
  formSchemaAdministrator,
  formSchemaAdministratorWithPassword,
} from '../../utils/formSchemaAdministrator';

export interface FormAdministratorContextProps extends FormContextProps {
  onSubmit: (
    values: z.infer<
      | typeof formSchemaAdministratorWithPassword
      | typeof formSchemaAdministrator
    >
  ) => void;
  hiddenPassword: boolean;
}
