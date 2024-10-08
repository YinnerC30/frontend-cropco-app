import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserActive } from "../interfaces/UserActive";
import { getUserInLocalStorage } from "./get-user-local-storage";

interface authenticationState {
  user: UserActive;
}

const initialState: authenticationState = {
  user: getUserInLocalStorage(),
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUserActive: (state, action: PayloadAction<UserActive>) => {
      const data = action.payload;
      state.user = data;
    },
    removeUserActive: (state) => {
      state.user = {
        email: "",
        id: "",
        token: "",
      };
    },
  },
});

export const { setUserActive, removeUserActive } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
export default { authenticationReducer };
