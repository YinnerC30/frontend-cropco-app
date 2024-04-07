import { HarvestDetail } from '@/interfaces/Harvest';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HarvestState {
  details: HarvestDetail[];
}
const initialState: HarvestState = {
  details: [],
};

export const harvestSlice = createSlice({
  name: 'harvest',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<HarvestDetail>) => {
      state.details.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.details = state.details.filter(item => item.id !== action.payload);
    },
    reset: state => {
      state.details = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, reset } = harvestSlice.actions;

export default harvestSlice.reducer;
