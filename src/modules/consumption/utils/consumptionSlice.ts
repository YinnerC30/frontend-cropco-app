import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConsumptionDetails } from "../interfaces/ConsumptionDetails";

interface ConsumptionState {
  details: ConsumptionDetails[];
}

interface ModifyConsumptionDetails {
  detail: ConsumptionDetails;
}

const initialState: ConsumptionState = {
  details: [],
};

export const consumptionSlice = createSlice({
  name: "consumption",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ConsumptionDetails[]>) => {
      state.details.push(...action.payload);
    },
    modify: (state, action: PayloadAction<ModifyConsumptionDetails>) => {
      const { detail } = action.payload;
      state.details = state.details.map((item: ConsumptionDetails) =>
        item.id !== detail.id ? item : detail
      );
    },

    remove: (state, action: PayloadAction<ConsumptionDetails>) => {
      state.details = state.details.filter(
        (detail: ConsumptionDetails) => detail.id !== action.payload.id
      );
    },
    reset: (state) => {
      state.details = [];
    },
  },
});

export const { add, remove, reset, modify } = consumptionSlice.actions;

export const consumptionReducer = consumptionSlice.reducer;
export default { consumptionReducer };
