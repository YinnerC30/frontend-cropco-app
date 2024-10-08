import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { useState } from 'react';
import { formSchemaUser } from '../utils';
// import { useAppSelector } from '@/redux/store';

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  password: {
    password1: '',
    password2: '',
  },
  modules: [],
};

export const useUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  // const { actions } = useAppSelector((state: any) => state.user);

  const form = useCreateForm({ schema: formSchemaUser, defaultValues });
  return {
    showPassword,
    setShowPassword,
    togglePasswordVisibility,
    form,
    // userActions: actions,
    // updateActionsUser,
  };
};
