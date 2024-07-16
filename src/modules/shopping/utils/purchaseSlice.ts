import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PurchaseDetails } from "../interfaces/PurchaseDetails";

interface PurchaseState {
  details: PurchaseDetails[];
  total: number;
}

interface ModifyPurchaseDetails {
  detail: PurchaseDetails;
}

const initialState: PurchaseState = {
  details: [],
  total: 0,
};

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<PurchaseDetails[]>) => {
      state.details.push(...action.payload);
    },
    modify: (state, action: PayloadAction<ModifyPurchaseDetails>) => {
      const { detail } = action.payload;
      state.details = state.details.map((item) =>
        item.id !== detail.id ? item : detail
      );
    },

    remove: (state, action: PayloadAction<PurchaseDetails>) => {
      state.details = state.details.filter(
        (detail: PurchaseDetails) => detail.id !== action.payload.id
      );
    },
    reset: (state) => {
      state.details = [];
      state.total = 0;
    },
    calculateTotal: (state) => {
      state.total = state.details.reduce(
        (total: number, detail: PurchaseDetails) => total + detail.total,
        0
      );
    },
  },
});

export const { add, remove, reset, calculateTotal, modify } =
  purchaseSlice.actions;

export const purchaseReducer = purchaseSlice.reducer;
export default { purchaseReducer };
