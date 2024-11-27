import { AlertAction } from '@/modules/core/components/shared/AlertAction';
import { useFormUserContext } from './FormUserContext';

export const FormUserAlert = () => {
  const { hasPermission } = useFormUserContext();

  if (hasPermission('users', 'find_one_user')) return null;

  return (
    <AlertAction
      title="Error"
      description="Requieres del permiso de lectura para obtener la información del usuario solicitado"
    />
  );
};
