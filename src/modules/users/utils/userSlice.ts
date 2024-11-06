import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  actions: string[];
}

export interface UpdateActionsPayload {
  id: string;
  state: boolean;
}

const initialState: UserState = {
  actions: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadActions: (state, action: PayloadAction<string[]>) => {
      state.actions = action.payload;
    },
    updateActions: (state, action: PayloadAction<UpdateActionsPayload[]>) => {
      const { payload } = action;
      const setActions = new Set([
        ...state.actions,
        ...payload.map((action: UpdateActionsPayload) => action.id),
      ]);

      for (const { state, id } of payload) {
        if (!state) {
          setActions.delete(id);
        }
      }

      state.actions = Array.from(setActions);
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
