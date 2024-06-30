import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkDetail } from "../interfaces/WorkDetail";

interface WorkState {
  details: WorkDetail[];
  total: number;
}

interface ModifyWorkDetail {
  detail: WorkDetail;
}

const initialState: WorkState = {
  details: [],
  total: 0,
};

export const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<WorkDetail[]>) => {
      state.details.push(...action.payload);
    },
    modify: (state, action: PayloadAction<ModifyWorkDetail>) => {
      const { detail } = action.payload;
      state.details = state.details.map((item) =>
        item.id !== detail.id ? item : detail
      );
    },

    remove: (state, action: PayloadAction<WorkDetail>) => {
      state.details = state.details.filter(
        (detail: WorkDetail) => detail.id !== action.payload.id
      );
    },
    reset: (state) => {
      state.details = [];
      state.total = 0;
    },
    calculateTotal: (state) => {
      state.total = state.details.reduce(
        (total: number, detail: WorkDetail) => total + detail.value_pay,
        0
      );
    },
  },
});

export const { add, remove, reset, calculateTotal, modify } = workSlice.actions;

export const workReducer = workSlice.reducer;
export default { workReducer };
