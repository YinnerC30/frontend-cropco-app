import { createSlice } from '@reduxjs/toolkit';

interface UsersModuleState {
  searchParameter: string;
}

const initialState: UsersModuleState = {
  searchParameter: '',
} satisfies UsersModuleState as UsersModuleState;

export const usersModuleSlice = createSlice({
  name: 'usersModule',
  initialState,
  reducers: {
    setSearchParameter: (state, action) =>
      void (state.searchParameter = action.payload.parameter),
  },
});

export const { setSearchParameter } = usersModuleSlice.actions;

export default usersModuleSlice.reducer;
