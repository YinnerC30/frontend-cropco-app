import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { useState } from 'react';

import { formSchemaLogin } from '../utils';

export const useLoginForm = () => {
  // Creación formulario de validación
  const formLogin = useCreateForm({
    schema: formSchemaLogin,
    defaultValues: {
      email: 'yinnerchilito@example.com',
      password: '123456',
    },
  });

  // Control de visibilidad del campo de contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Modificar la visibilidad de la contraseña
  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return {
    formLogin,
    showPassword,
    togglePasswordVisibility,
  };
};
