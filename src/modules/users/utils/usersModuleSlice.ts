import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActionStore {
  id: string;
  active: boolean;
}

interface UserState {
  form_user: {
    actions: ActionStore[];
  };
}

const initialState: UserState = {
  form_user: {
    actions: [],
  },
};

const getActionsId = (actions: ActionStore[]) => {
  return actions.map((action: ActionStore) => action.id);
};

export const usersModuleSlice = createSlice({
  name: 'users_module',
  initialState,
  reducers: {
    loadActions: (state, action: PayloadAction<ActionStore[]>) => {
      state.form_user.actions = action.payload;
    },
    updateActions: (state, action: PayloadAction<ActionStore[]>) => {
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
