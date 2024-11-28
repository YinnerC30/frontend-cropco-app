import { AlertAction } from '@/modules/core/components/shared/AlertAction';
import { useFormSupplyContext } from './FormSupplyContext';

export const FormSupplyAlert = () => {
  const { hasPermission } = useFormSupplyContext();

  if (hasPermission('supplies', 'find_one_supply')) return null;

  return (
    <AlertAction
      title="Error"
      description="Requieres del permiso de lectura para obtener la información del suministro solicitado"
    />
  );
};
