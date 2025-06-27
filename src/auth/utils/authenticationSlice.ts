import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserActive } from '../interfaces/UserActive';
import { UserCookieManager } from './UserCookieManager';

interface authenticationState {
  user: UserActive;
}

const initialState: authenticationState = {
  user: UserCookieManager.getUser(),
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUserActive: (state, action: PayloadAction<UserActive>) => {
      const data = action.payload;
      state.user = data;
    },
    removeUserActive: (state) => {
      state.user = {
        first_name: '',
        last_name: '',
        email: '',
        id: '',
        token: '',
        modules: [],
        is_login: false,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
  },
});

export const { setUserActive, removeUserActive, setToken } =
  authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
export default { authenticationReducer };
