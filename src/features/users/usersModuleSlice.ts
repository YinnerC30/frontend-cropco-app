import { createSlice } from '@reduxjs/toolkit';
import { User } from './ColumnsUser';

export interface UsersModuleState {
  searchParameter: string;
  // userToUpdate: User;
}

const initialState: UsersModuleState = {
  searchParameter: '',
  // userToUpdate: {
  //   id: '',
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   cell_phone_number: '',
  //   password: '',
  // },
};

export const usersModuleSlice = createSlice({
  name: 'usersModule',
  initialState,
  reducers: {
    setSearchParameter: (state, action) =>
      void (state.searchParameter = action.payload),
    // setUserToUpdate: (state, action) => (state.userToUpdate = action.payload),
  },
});

export const { setSearchParameter /* setUserToUpdate */ } =
  usersModuleSlice.actions;

export default usersModuleSlice.reducer;
