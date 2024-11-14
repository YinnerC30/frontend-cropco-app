import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActionStore {
  id: string;
  active: boolean;
}

interface UserState {
  actions: ActionStore[];
}

const initialState: UserState = {
  actions: [],
};

const getActionsId = (actions: ActionStore[]) => {
  return actions.map((action: ActionStore) => action.id);
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadActions: (state, action: PayloadAction<ActionStore[]>) => {
      state.actions = action.payload;
    },
    updateActions: (state, action: PayloadAction<ActionStore[]>) => {
      const { payload } = action;
      const setActions = new Set([
        ...getActionsId(state.actions),
        ...getActionsId(payload),
      ]);

      payload.forEach(({ active, id }) => {
        if (!active) {
          setActions.delete(id);
        }
      });

      state.actions = Array.from(setActions).map((actionId: string) => ({
        id: actionId,
        active: true,
      }));
    },
    removeAllActions: (state) => {
      state.actions = [];
    },
  },
});

export const { updateActions, removeAllActions, loadActions } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
export default { userReducer };
