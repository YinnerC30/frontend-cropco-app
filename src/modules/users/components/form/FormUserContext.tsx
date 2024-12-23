import { useCreateForm, useGetAllModules } from '@/modules/core/hooks';
import {
  Action,
  Module,
} from '@/modules/core/interfaces/responses/ResponseGetAllModules';
import React, { createContext, ReactNode, useMemo } from 'react';
import { UserForm } from '../../interfaces';
import { FormUserContextProps } from '../../interfaces/';
import { FormUserProps } from '../../interfaces/form/FormUserProps';
import { formSchemaUser, formSchemaUserWithPassword } from '../../utils';
import { UserAction } from './FormUserPermissionAction';

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
}) => {
  const queryModules = useGetAllModules();

  const { data = [] } = queryModules;

  const form = useCreateForm({
    schema: hiddenPassword ? formSchemaUser : formSchemaUserWithPassword,
    defaultValues,
  });

  const defaultActionsUser = useMemo(
    () => form.formState.defaultValues?.actions ?? [],
    [form.formState]
  );
  const currentActions: Action[] = useMemo(
    () => form.watch('actions') ?? [],
    [form.formState]
  );

  const userHasAction = ({ id }: { id: string }): boolean => {
    const actionsIds = currentActions.map((action: UserAction) => action.id);
    return actionsIds.includes(id);
  };

  const updateActionsUserForm = (actions: UserAction[]): void => {
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

  const handleSelectAllActions = (): void => {
    const actions = data.flatMap((item: Module): UserAction[] =>
      item.actions.map((act: Action) => ({ id: act.id, isActive: true }))
    );
    updateActionsUserForm(actions);
  };

  const handleInselectAllActions = (): void => {
    updateActionsUserForm([]);
  };

  const getIdsActionsModule = (
    activateActions: boolean,
    nameModule: string
  ): {
    id: string;
    isActive: boolean;
  }[] => {
    return (
      data
        .find((module: Module) => module.name === nameModule)
        ?.actions.map((action: Action) => ({
          id: action.id,
          isActive: activateActions,
        })) || []
    );
  };

  const handleSelectAllActionInModule = (nameModule: string): void => {
    const actions = getIdsActionsModule(true, nameModule);
    updateActionsUserForm(actions);
  };

  const handleInselectAllActionsInModule = (nameModule: string): void => {
    const actions = getIdsActionsModule(false, nameModule);
    updateActionsUserForm(actions);
  };

  return (
    <FormUserContext.Provider
      value={{
        form,
        userHasAction,
        handleInselectAllActions,
        handleInselectAllActionsInModule,
        handleSelectAllActionInModule,
        handleSelectAllActions,
        updateActionsUserForm,
        isSubmitting,
        onSubmit,
        readOnly,
        hiddenPassword,
        queryModules,
      }}
    >
      {children}
    </FormUserContext.Provider>
  );
};

export default FormUserProvider;
