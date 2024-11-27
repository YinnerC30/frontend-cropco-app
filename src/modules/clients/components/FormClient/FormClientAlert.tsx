import { AlertAction } from '@/modules/core/components/shared/AlertAction';
import { useFormClientContext } from './FormClientContext';

export const FormClientAlert = () => {
  const { hasPermission } = useFormClientContext();

  if (hasPermission('clients', 'find_one_client')) return null;

  return (
    <AlertAction
      title="Error"
      description="Requieres del permiso de lectura para obtener la información del cliente solicitado"
    />
  );
};
