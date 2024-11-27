import { AlertAction } from '@/modules/core/components/AlertAction';
import { useFormSupplierContext } from './FormSupplierContext';

export const FormSupplierAlert = () => {
  const { hasPermission } = useFormSupplierContext();

  if (hasPermission('suppliers', 'find_one_supplier')) return null;

  return (
    <AlertAction
      title="Error"
      description="Requieres del permiso de lectura para obtener la información del suppliere solicitado"
    />
  );
};
