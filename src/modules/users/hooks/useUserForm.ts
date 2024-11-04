import { useCreateForm, useGetAllModules } from '@/modules/core/hooks';
import { useEffect, useState } from 'react';
import {
  formSchemaUser,
  formSchemaUserWithPassword,
  removeAllActions,
  updateActions,
} from '../utils';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useFormChange } from '@/modules/core/components/form/FormChangeContext';

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  passwords: {
    password1: '123456',
    password2: '123456',
  },
  modules: [],
};

interface Props {
  hiddenPassword?: boolean;
}

export const useUserForm = ({ hiddenPassword = false }: Props) => {
  const { data = [], isLoading, isSuccess } = useGetAllModules();
  const { actions } = useAppSelector((state: any): any => state.user);
  const { modules } = useAppSelector(
    (state: any): any => state.authentication.user
  );
  const [showPassword, setShowPassword] = useState(false);
  const { markChanges } = useFormChange();

  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const userHaveAction = ({ id }: any) => {
    return actions.includes(id);
  };

  const form = useCreateForm({
    schema: hiddenPassword ? formSchemaUser : formSchemaUserWithPassword,
    defaultValues,
  });

  const dispatch = useAppDispatch();

  const handleSelectAllActions = () => {
    const idsActionsModules = data
      .map((item: any) => item.actions.map((act: any) => act.id))
      .flat(1);

    for (const element of idsActionsModules) {
      dispatch(updateActions({ id: element, state: true }));
    }
  };

  const handleInselectAllActions = () => {
    dispatch(removeAllActions());
  };

  const handleSelectAllActionInModule = (nameModule: string) => {
    const moduleActionsIds = data
      .find((module: any) => module.name === nameModule)
      .actions.map((action: any) => action.id);

    for (const element of moduleActionsIds) {
      dispatch(updateActions({ id: element, state: true }));
    }
  };

  const handleInselectAllActionsInModule = (nameModule: string) => {
    const moduleActionsIds = data
      .find((module: any) => module.name === nameModule)
      .actions.map((action: any) => action.id);

    for (const element of moduleActionsIds) {
      dispatch(updateActions({ id: element, state: false }));
    }
  };

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
    userHaveAction,
    modules,
    data,
    isLoading,
    isSuccess,
    handleInselectAllActions,
    handleInselectAllActionsInModule,
    handleSelectAllActionInModule,
    handleSelectAllActions,
  };
};
