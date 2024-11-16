import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserAction {
  id: string;
  active: boolean;
}

interface UserState {
  form_user: {
    actions: UserAction[];
  };
}

const initialState: UserState = {
  form_user: {
    actions: [],
  },
};

const getActionsId = (actions: UserAction[]) => {
  return actions.map((action: UserAction) => action.id);
};

export const usersModuleSlice = createSlice({
  name: 'users_module',
  initialState,
  reducers: {
    loadActions: (state, action: PayloadAction<UserAction[]>) => {
      state.form_user.actions = action.payload;
    },
    updateActions: (state, action: PayloadAction<UserAction[]>) => {
      const { payload } = action;
      const setActions = new Set([
        ...getActionsId(state.form_user.actions),
        ...getActionsId(payload),
      ]);

      payload.forEach(({ active, id }) => {
        if (!active) {
          setActions.delete(id);
        }
      });

      state.form_user.actions = Array.from(setActions).map(
        (actionId: string) => ({
          id: actionId,
          active: true,
        })
      );
    },
    removeAllActions: (state) => {
      state.form_user.actions = [];
    },
  },
});

export const { updateActions, removeAllActions, loadActions } =
  usersModuleSlice.actions;

export const usersModuleReducer = usersModuleSlice.reducer;
export default { usersModuleReducer };
