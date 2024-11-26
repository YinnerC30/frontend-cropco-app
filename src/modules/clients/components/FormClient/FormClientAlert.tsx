import { AlertAction } from '@/modules/core/components/AlertAction';
import { useFormClientContext } from './FormClientContext';

export const FormClientAlert = () => {
  const { hasPermission } = useFormClientContext();

  if (hasPermission('employees', 'find_one_employee')) return null;

  return (
    <AlertAction
      title="Error"
      description="Requieres del permiso de lectura para obtener la información del empleado solicitado"
    />
  );
};
