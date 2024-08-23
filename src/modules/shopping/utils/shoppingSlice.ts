import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingDetails } from "../interfaces/ShoppingDetails";


interface ShoppingState {
  details: ShoppingDetails[];
  total: number;
}

interface ModifyShoppingDetails {
  detail: ShoppingDetails;
}

const initialState: ShoppingState = {
  details: [],
  total: 0,
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ShoppingDetails[]>) => {
      state.details.push(...action.payload);
    },
    modify: (state, action: PayloadAction<ModifyShoppingDetails>) => {
      const { detail } = action.payload;
      state.details = state.details.map((item) =>
        item.id !== detail.id ? item : detail
      );
    },

    remove: (state, action: PayloadAction<ShoppingDetails>) => {
      state.details = state.details.filter(
        (detail: ShoppingDetails) => detail.id !== action.payload.id
      );
    },
    reset: (state) => {
      state.details = [];
      state.total = 0;
    },
    calculateTotal: (state) => {
      state.total = state.details.reduce(
        (total: number, detail: ShoppingDetails) => total + detail.total,
        0
      );
    },
  },
});

export const { add, remove, reset, calculateTotal, modify } =
  shoppingSlice.actions;

export const shoppingReducer = shoppingSlice.reducer;
export default { shoppingReducer };
