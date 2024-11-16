import { useFormChange } from '@/modules/core/components/form/FormChangeContext';
import { useCreateForm, useGetAllModules } from '@/modules/core/hooks';
import {
  Action,
  Module,
} from '@/modules/core/interfaces/Responses/ResponseGetAllModules';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import {
  UserAction,
  formSchemaUser,
  formSchemaUserWithPassword,
  loadActions,
  removeAllActions,
  updateActions,
} from '../utils';

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
};

interface Props {
  hiddenPassword?: boolean;
  formValues: any;
}

export const useUserForm = ({
  hiddenPassword = false,
  formValues = defaultValues,
}: Props) => {
  const { data = [], isLoading, isSuccess } = useGetAllModules();
  const { actions } = useAppSelector(
    (state: RootState) => state.users_module.form_user
  );
  const { modules } = useAppSelector(
    (state: RootState) => state.authentication.user
  );
  const [showPassword, setShowPassword] = useState(false);
  const { markChanges } = useFormChange();

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const userHasAction = ({ id }: { id: string }) => {
    const actionsIds = actions.map((action: UserAction) => action.id);
    return actionsIds.includes(id);
  };

  const form = useCreateForm({
    schema: hiddenPassword ? formSchemaUser : formSchemaUserWithPassword,
    defaultValues: formValues,
  });

  const dispatch = useAppDispatch();

  const loadActionsUser = (actions: UserAction[]) => {
    dispatch(loadActions(actions));
  };

  const removeAllActionsUser = () => {
    dispatch(removeAllActions());
  };

  const updateActionsInState = (actions: UserAction[]) => {
    dispatch(updateActions(actions));
  };

  const handleSelectAllActions = () => {
    const actions = data.flatMap((item: Module): UserAction[] =>
      item.actions.map(
        (act: Action): UserAction => ({ id: act.id, active: true })
      )
    );

    updateActionsInState(actions);
  };

  const handleInselectAllActions = () => {
    dispatch(removeAllActions());
  };

  const handleSelectAllActionInModule = (nameModule: string) => {
    const actions =
      data
        .find((module: Module) => module.name === nameModule)
        ?.actions.map((action: Action) => ({ id: action.id, active: true })) ||
      [];

    updateActionsInState(actions);
  };

  const handleInselectAllActionsInModule = (nameModule: string) => {
    const actions =
      data
        .find((module: Module) => module.name === nameModule)
        ?.actions.map((action: Action) => ({ id: action.id, active: false })) ||
      [];

    updateActionsInState(actions);
  };

  useEffect(() => {
    const { modules = [] } = formValues;
    form.reset(formValues);
    const actions =
      modules?.flatMap((module: Module) =>
        module.actions.map((action: Action) => ({
          id: action.id,
          active: true,
        }))
      ) ?? [];
    loadActionsUser(actions);
  }, [formValues]);

  const { isDirty } = form.formState;

  useEffect(() => {
    if (isDirty) {
      markChanges(true);
    } else {
      markChanges(false);
    }
  }, [isDirty]);

  return {
    showPassword,
    setShowPassword,
    togglePasswordVisibility,
    form,
    userActions: actions,
    userHasAction,
    modules,
    data,
    isLoadingModules: isLoading,
    isSuccess,
    handleInselectAllActions,
    handleInselectAllActionsInModule,
    handleSelectAllActionInModule,
    handleSelectAllActions,
    loadActionsUser,
    removeAllActionsUser,
  };
};
