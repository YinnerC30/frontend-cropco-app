import { useCreateForm, useGetAllModules } from '@/modules/core/hooks';
import {
  Action,
  Module,
} from '@/modules/core/interfaces/responses/ResponseGetAllModules';
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserForm } from '../../interfaces';
import { FormUserContextProps } from '../../interfaces/';
import { FormUserProps } from '../../interfaces/form/FormUserProps';
import { formSchemaUser, formSchemaUserWithPassword } from '../../utils';
import { UserAction } from './FormUserPermissionAction';

export const defaultValues: UserForm = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  passwords: {
    password1: '',
    password2: '',
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
  defaultValues: propsDefaultValues,
  hiddenPassword = false,
  isSubmitting = false,
  onSubmit = (values) => {},
  readOnly = false,
}) => {
  const queryModules = useGetAllModules({ executeQuery: true });

  const { data = [] } = queryModules;

  const combinedDefaultValues = useMemo(
    () => ({
      ...defaultValues,
      ...(propsDefaultValues || {}),
      passwords: {
        ...(defaultValues.passwords || {}),
        ...(propsDefaultValues?.passwords || {}),
      },
      modules: propsDefaultValues?.modules ?? defaultValues.modules,
      actions: propsDefaultValues?.actions ?? defaultValues.actions,
    }),
    [propsDefaultValues]
  );

  const [isSelectedAllActions, setIsSelectedAllActions] = useState(false);

  const form = useCreateForm({
    schema: hiddenPassword ? formSchemaUser : formSchemaUserWithPassword,
    defaultValues: combinedDefaultValues,
    validationMode: 'onSubmit',
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
    setIsSelectedAllActions(true);
  };

  const handleInselectAllActions = (): void => {
    updateActionsUserForm([]);
    setIsSelectedAllActions(false);
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

  const IsSelectedAllActionsInModule = (nameModule: string) => {
    const actions = getIdsActionsModule(true, nameModule);
    return actions.every((action) =>
      currentActions.some((currentAction) => currentAction.id === action.id)
    );
  };

  useEffect(() => {
    if (currentActions.length > 0) {
      const actions = data.flatMap((item: Module): string[] =>
        item.actions.map((act: Action) => act.id)
      );
      const result = actions.every((actionId) =>
        currentActions.some((currentAction) => currentAction.id === actionId)
      );
      setIsSelectedAllActions(result);
    }
  }, [currentActions, isSelectedAllActions]);

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
        isSelectedAllActions,
        setIsSelectedAllActions,
        IsSelectedAllActionsInModule,
      }}
    >
      {children}
    </FormUserContext.Provider>
  );
};

export default FormUserProvider;
