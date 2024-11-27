import { AlertAction } from '@/modules/core/components/shared/AlertAction';
import { useFormCropContext } from './FormCropContext';

export const FormCropAlert = () => {
  const { hasPermission } = useFormCropContext();

  if (hasPermission('crops', 'find_one_crop')) return null;

  return (
    <AlertAction
      title="Error"
      description="Requieres del permiso de lectura para obtener la información del cultivo solicitado"
    />
  );
};
