import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SaleDetail } from "../interfaces";

interface SaleState {
  details: SaleDetail[];
  total: number;
  quantity: number;
}

interface ModifySaleDetail {
  detail: SaleDetail;
  // oldClient: ObjectWithId;
  // oldCrop: ObjectWithId;
}

const initialState: SaleState = {
  details: [],
  total: 0,
  quantity: 0,
};

export const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<SaleDetail[]>) => {
      state.details.push(...action.payload);
    },
    modify: (state, action: PayloadAction<ModifySaleDetail>) => {
      const { detail } = action.payload;
      state.details = state.details.map((item) =>
        item.id !== detail.id ? item : detail
      );
    },

    remove: (state, action: PayloadAction<SaleDetail>) => {
      state.details = state.details.filter(
        (detail: SaleDetail) => detail.id !== action.payload.id
      );
    },
    reset: (state) => {
      state.details = [];
      state.total = 0;
      state.quantity = 0;
    },
    calculateTotal: (state) => {
      state.total = state.details.reduce(
        (total: number, detail: SaleDetail) => total + detail.total,
        0
      );
      state.quantity = state.details.reduce(
        (total: number, detail: SaleDetail) => total + detail.quantity,
        0
      );
    },
  },
});

export const { add, remove, reset, calculateTotal, modify } = saleSlice.actions;

export const saleReducer = saleSlice.reducer;
export default { saleReducer };
