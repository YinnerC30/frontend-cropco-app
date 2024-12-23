import { FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { formSchemaUser, formSchemaUserWithPassword } from '../../utils';
import { User } from '../User';

export interface FormUserProps
  extends FormProps<
    z.infer<typeof formSchemaUserWithPassword | typeof formSchemaUser>,
    User
  > {
  hiddenPassword?: boolean;
}
