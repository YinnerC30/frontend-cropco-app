import { useCreateForm } from '@/modules/core/hooks';
import { useState } from 'react';
import { formSchemaUser, formSchemaUserWithPassword } from '../utils';
import { useAppSelector } from '@/redux/store';

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  passwords: {
    password1: '123456',
    password2: '123456',
  },
  modules: [],
};

interface Props {
  hiddenPassword?: boolean;
}

export const useUserForm = ({ hiddenPassword = false }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const { actions } = useAppSelector((state: any): any => state.user);
  const { modules } = useAppSelector(
    (state: any): any => state.authentication.user
  );

  const userHaveAction = ({ id }: any) => {
    return actions.includes(id);
  };

  const form = useCreateForm({
    schema: hiddenPassword ? formSchemaUser : formSchemaUserWithPassword,
    defaultValues,
  });
  return {
    showPassword,
    setShowPassword,
    togglePasswordVisibility,
    form,
    userActions: actions,
    userHaveAction,
    modules,
  };
};
