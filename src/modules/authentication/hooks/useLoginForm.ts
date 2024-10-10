import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { useEffect, useState } from 'react';

import { formSchemaLogin } from '../utils';
import { useAuthenticationUser } from './useAuthenticationUser';

export const useLoginForm = () => {
  // Modificación de meta etiquetas
  useEffect(() => {
    document.title = 'Login - Cropco';
  }, []);

  // Creación formulario de validación
  const formLogin = useCreateForm({
    schema: formSchemaLogin,
    defaultValues: {
      email: 'andreshernandez@example.com',
      password: '123456',
    },
  });

  // Obtener estado de autenticación del usuario actual
  const { redirectToHome, isActiveSesion } = useAuthenticationUser();

  useEffect(() => {
    isActiveSesion() && redirectToHome();
  }, [isActiveSesion]);

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
