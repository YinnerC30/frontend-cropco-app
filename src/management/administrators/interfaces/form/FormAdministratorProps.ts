import { FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';

import { Administrator } from '../Administrator';
import { formSchemaAdministrator, formSchemaAdministratorWithPassword } from '../../utils/formSchemaAdministrator';

export interface FormAdministratorProps
  extends FormProps<
    z.infer<typeof formSchemaAdministratorWithPassword | typeof formSchemaAdministrator>,
    Administrator
  > {
  hiddenPassword?: boolean;
}
