import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Administrator } from '../interfaces/Administrator';
import { AdministratorLocalStorageManager } from './AdministratorLocalStorageManager';

interface authenticationManagementState {
  user: Administrator;
}

const initialState: authenticationManagementState = {
  user: AdministratorLocalStorageManager.getAdministrator(),
};

export const authenticationManagementSlice = createSlice({
  name: 'authentication-management',
  initialState,
  reducers: {
    setUserActive: (state, action: PayloadAction<Administrator>) => {
      const data = action.payload;
      state.user = data;
    },
    removeUserActive: (state) => {
      state.user = {
        first_name: '',
        last_name: '',
        email: '',
        cell_phone_number: '',
        password: '',
        id: '',
        token: '',
        role: '',
        is_active: false,
        is_login: false,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
  },
});

export const { setUserActive, removeUserActive, setToken } =
  authenticationManagementSlice.actions;

export const authenticationManagementReducer =
  authenticationManagementSlice.reducer;
export default { authenticationManagementReducer };
