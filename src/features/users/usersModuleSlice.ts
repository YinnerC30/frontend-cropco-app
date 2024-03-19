import { createSlice } from '@reduxjs/toolkit';

export interface UsersModuleState {
  searchParameter: string;
}

const initialState: UsersModuleState = {
  searchParameter: '',
};

export const usersModuleSlice = createSlice({
  name: 'usersModule',
  initialState,
  reducers: {
    setSearchParameter: (state, action) =>
      void (state.searchParameter = action.payload),
  },
});

export const { setSearchParameter } = usersModuleSlice.actions;

export default usersModuleSlice.reducer;
