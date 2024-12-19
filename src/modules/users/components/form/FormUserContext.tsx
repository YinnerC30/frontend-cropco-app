import { useAuthContext } from '@/auth/hooks';
import { useCreateForm, useGetAllModules } from '@/modules/core/hooks';
import {
  Action,
  Module,
} from '@/modules/core/interfaces/responses/ResponseGetAllModules';
import { RootState, useAppSelector } from '@/redux/store';
import React, { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../../interfaces';
import { FormUserProps } from '../../interfaces/FormUserProps';
import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';
import { formSchemaUser, formSchemaUserWithPassword } from '../../utils';
import { UserAction } from './FormUserPermissionAction';
import { FormUserContextProps } from '../../interfaces/FormUserContextProps';

export const defaultValues: UserForm = {
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

const areArraysEqual = (arr1: UserAction[], arr2: UserAction[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  const ids1 = new Set(arr1.map((item: UserAction) => item.id));
  const ids2 = new Set(arr2.map((item: UserAction) => item.id));

  for (const id of ids1) {
    if (!ids2.has(id)) return false;
  }

  return true;
};

export const FormUserContext = createContext<FormUserContextProps | undefined>(
  undefined
);

export const FormUserProvider: React.FC<
  FormUserProps & { children: ReactNode }
> = ({
  children,
  defaultValues,
  hiddenPassword = false,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
  showAlert = false,
}) => {
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
    defaultValues,
  });

  const defaultActionsUser = form.formState.defaultValues?.actions ?? [];
  const currentActions = form.watch('actions') ?? [];

  const userHasAction = ({ id }: { id: string }) => {
    const actionsIds = currentActions.map((action: UserAction) => action.id);
    return actionsIds.includes(id);
  };

  const updateActionsUserForm = (actions: UserAction[]) => {
    const actionSet: Set<string> = new Set(
      currentActions.map((action: UserAction) => action.id)
    );

    if (actions.length === 0) {
      actionSet.clear();
    }

    actions.forEach(({ isActive, id }) => {
      isActive ? actionSet.add(id) : actionSet.delete(id);
    });

    const arrayIds = Array.from(actionSet);
    const finalData = arrayIds.map((actionId: string) => ({ id: actionId }));

    const hasChanged = !areArraysEqual(defaultActionsUser, finalData);

    form.setValue('actions', finalData, { shouldDirty: true });

    if (!hasChanged) {
      form.reset(form.getValues());
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

  const navigate = useNavigate();
  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_USER_PATHS.ViewAll);
  };

  return (
    <FormUserContext.Provider
      value={{
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
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hiddenPassword,
        hasPermission,
        showAlert,
      }}
    >
      {children}
    </FormUserContext.Provider>
  );
};

export default FormUserProvider;
