import { useCreateForm, useGetAllModules } from '@/modules/core/hooks';
import {
  Action,
  Module,
} from '@/modules/core/interfaces/Responses/ResponseGetAllModules';
import { RootState, useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { UserAction } from '../components/FormUser/FormUserPermissionAction';
import { formSchemaUser, formSchemaUserWithPassword } from '../utils';

export const defaultValues = {
  first_name: 'demo',
  last_name: 'demo',
  email: 'demo@gmail.com',
  cell_phone_number: '3145674356',
  passwords: {
    password1: '123456',
    password2: '123456',
  },
  modules: [],
  actions: [],
};

interface Props {
  hiddenPassword?: boolean;
  formValues: any;
}

const areArraysEqual = (arr1: UserAction[], arr2: UserAction[]) => {
  if (arr1.length !== arr2.length) return false; // Si tienen diferente tamaño, no son iguales
  const ids1 = new Set(arr1.map((item: UserAction) => item.id)); // Crear un Set con los IDs del primer array
  const ids2 = new Set(arr2.map((item: UserAction) => item.id)); // Crear un Set con los IDs del segundo array

  // Verificar si ambos Sets contienen los mismos elementos
  for (const id of ids1) {
    if (!ids2.has(id)) return false;
  }

  return true;
};

export const useUserForm = ({
  hiddenPassword = false,
  formValues = defaultValues,
}: Props) => {
  const { data = [], isLoading, isSuccess } = useGetAllModules();

  const { modules } = useAppSelector(
    (state: RootState) => state.authentication.user
  );
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const form = useCreateForm({
    schema: hiddenPassword ? formSchemaUser : formSchemaUserWithPassword,
    defaultValues: formValues,
  });

  const defaultActionsUser = form.formState.defaultValues?.actions ?? [];
  const currentActions = form.watch('actions') ?? [];

  const userHasAction = ({ id }: { id: string }) => {
    const actionsIds = currentActions.map((action: UserAction) => action.id);
    return actionsIds.includes(id);
  };

  const updateActionsUserForm = (actions: UserAction[]) => {
    // Crear un Set inicial con los IDs actuales
    const actionSet = new Set(
      currentActions.map((action: UserAction) => action.id)
    );

    if (actions.length === 0) {
      actionSet.clear();
    }

    // Actualizar el Set basado en las acciones proporcionadas
    actions.forEach(({ isActive, id }) => {
      isActive ? actionSet.add(id) : actionSet.delete(id);
    });

    // Convertir el Set actualizado en el formato requerido
    const arrayIds: any[] = Array.from(actionSet);
    const finalData = arrayIds.map((actionId: string) => ({ id: actionId }));

    // Comparar con las acciones iniciales para determinar si hubo cambios
    const hasChanged = !areArraysEqual(defaultActionsUser, finalData);

    // Actualizar los valores en el formulario
    form.setValue('actions', finalData, { shouldDirty: true });

    // Si no hubo cambios, restablecer el formulario a su estado actual
    if (!hasChanged) {
      form.reset(form.getValues()); // Usar los valores actuales del formulario
    }
  };

  const handleSelectAllActions = () => {
    const actions = data.flatMap((item: Module): UserAction[] =>
      item.actions.map((act: Action) => ({ id: act.id, isActive: true }))
    );
    updateActionsUserForm(actions);
  };

  const handleInselectAllActions = () => {
    updateActionsUserForm([]);
  };

  const getIdsActionsModule = (stateActions: boolean, nameModule: string) => {
    return (
      data
        .find((module: Module) => module.name === nameModule)
        ?.actions.map((action: Action) => ({
          id: action.id,
          isActive: stateActions,
        })) || []
    );
  };

  const handleSelectAllActionInModule = (nameModule: string) => {
    const actions = getIdsActionsModule(true, nameModule);
    updateActionsUserForm(actions);
  };

  const handleInselectAllActionsInModule = (nameModule: string) => {
    const actions = getIdsActionsModule(false, nameModule);

    updateActionsUserForm(actions);
  };

  return {
    showPassword,
    setShowPassword,
    togglePasswordVisibility,
    form,
    userActions: currentActions,
    userHasAction,
    modules,
    data,
    isLoadingModules: isLoading,
    isSuccess,
    handleInselectAllActions,
    handleInselectAllActionsInModule,
    handleSelectAllActionInModule,
    handleSelectAllActions,
    updateActionsUserForm,
  };
};
