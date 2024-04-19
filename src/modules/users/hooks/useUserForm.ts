import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '../../clients/utils';

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  password: {
    password1: '',
    password2: '',
  },
};

export const useUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return {
    showPassword,
    setShowPassword,
    togglePasswordVisibility,
    form,
  };
};
