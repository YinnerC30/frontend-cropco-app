import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TenantAdministrator } from '../interfaces/TenantAdministrator';
import { getTenantManagementToLocalStorage } from './manageTenantManagementInLocalStorage';

interface authenticationManagementState {
  user: TenantAdministrator;
}

const initialState: authenticationManagementState = {
  user: getTenantManagementToLocalStorage(),
};

export const authenticationManagementSlice = createSlice({
  name: 'authentication-management',
  initialState,
  reducers: {
    setUserActive: (state, action: PayloadAction<TenantAdministrator>) => {
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
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
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
