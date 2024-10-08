import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  actions: string[];
}

const initialState: UserState = {
  actions: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadActions: (state, action: PayloadAction<any>) => {
      state.actions = action.payload.map((act: any) => act);
    },
    updateActions: (state, action: PayloadAction<any>) => {
      const setActions = new Set([...state.actions, action.payload.id]);

      if (!action.payload.state) {
        setActions.delete(action.payload.id);
      }

      state.actions = [...Array.from(setActions)];
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
