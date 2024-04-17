import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '../utils/ElementsForm';
import { DefaultValuesUser } from '../interfaces/DefaultValues';


export const useUserForm = (defaultValues: DefaultValuesUser) => {
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
