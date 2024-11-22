import { AlertAction } from '@/modules/core/components/AlertAction';
import { useFormEmployeeContext } from './FormEmployeeContext';

export const FormEmployeeAlert = () => {
  const { hasPermission } = useFormEmployeeContext();

  if (hasPermission('employees', 'find_one_employee')) return null;

  return (
    <AlertAction
      title="Error"
      description="Requieres del permiso de lectura para obtener la información del empleado solicitado"
    />
  );
};
