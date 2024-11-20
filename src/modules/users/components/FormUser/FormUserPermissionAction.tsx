import { Switch } from '@/components/ui/switch';
import { CapitalizeFirstWord } from '@/modules/authentication/helpers';
import { useFormChange } from '@/modules/core/components/form/FormChangeContext';
import { Action } from '@/modules/core/interfaces/Responses/ResponseGetAllModules';
import { useAppDispatch } from '@/redux/store';
import { updateActions } from '../../utils';
import { useFormUserContext } from './FormUserContext';

interface Props {
  action: Action;
  readOnly: boolean;
  isChecked: boolean;
}

// Función para comparar si dos arrays tienen exactamente los mismos elementos
const areArraysEqual = (arr1: string[], arr2: string[]): boolean =>
  arr1.length === arr2.length && arr1.every((item) => arr2.includes(item));

export const FormUserPermissionAction = ({
  action,
  readOnly,
  isChecked,
}: Props) => {
  const dispatch = useAppDispatch();
  const {
    form: {
      watch,
      setValue,
      formState: { defaultValues },
    },
  } = useFormUserContext();

  const { markChanges } = useFormChange();

  // Obtenemos el estado actual de las acciones
  const currentActions = watch('actions');

  // Actualiza las acciones basándose en si están activas o no
  const updateActionsSet = (actionId: string, isActive: boolean): string[] => {
    const actionSet = new Set(currentActions);
    isActive ? actionSet.add(actionId) : actionSet.delete(actionId);
    return Array.from(actionSet) as string[];
  };

  // Maneja el cambio en el estado del Switch
  const handleOnChange = (isActive: boolean) => {
    // Actualiza las acciones en el store
    dispatch(updateActions([{ id: action.id, active: isActive }]));

    // Genera las nuevas acciones actualizadas
    const updatedActions = updateActionsSet(action.id, isActive);

    // Verifica si las acciones actuales son diferentes a las iniciales
    const isDirty = !areArraysEqual(defaultValues.actions, updatedActions);

    // Actualiza los valores del formulario
    setValue('actions', updatedActions, {
      shouldDirty: isDirty,
      shouldValidate: true,
    });

    const currentValues = watch(); // Obtiene los valores actuales del formulario

    // Comparar los valores actuales con los iniciales
    const haveValuesChanged =
      JSON.stringify(currentValues) !== JSON.stringify(defaultValues);

    // Marca los cambios según sea necesario
    !haveValuesChanged && markChanges(isDirty);
  };

  return (
    <div className="flex justify-between gap-2">
      <span className="text-xs">{CapitalizeFirstWord(action.description)}</span>
      <Switch
        disabled={readOnly}
        checked={isChecked}
        defaultChecked={isChecked}
        onCheckedChange={handleOnChange}
      />
    </div>
  );
};
