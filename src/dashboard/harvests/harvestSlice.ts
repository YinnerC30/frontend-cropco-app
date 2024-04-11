import { HarvestDetail } from '@/interfaces/Harvest';
import { ObjectWithId } from '@/interfaces/ObjectWithId';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HarvestState {
  details: HarvestDetail[];
}

interface ModifyHarvestDetail {
  harvestDetail: HarvestDetail;
  oldEmployee: ObjectWithId;
}

const initialState: HarvestState = {
  details: [
    {
      employee: {
        id: '7f257e39-7d51-47e3-857d-1a5d8cf547de',
        first_name: 'Joseph',
      },
      total: 5,
      value_pay: 500,
    },
    {
      employee: {
        id: '2cb772f9-1dfe-4149-ad2a-3b00c103f9e0',
        first_name: 'John',
      },
      total: 4,
      value_pay: 100,
    },
    
  ],
};

export const harvestSlice: any = createSlice({
  name: 'harvest',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<HarvestDetail>) => {
      state.details.push(action.payload);
    },
    modify: (state, action: PayloadAction<ModifyHarvestDetail>) => {
      const { harvestDetail, oldEmployee } = action.payload;
      const isDifferentEmployee = harvestDetail.employee.id !== oldEmployee.id;

      if (isDifferentEmployee) {
        state.details = [
          ...state.details.filter(
            (item: HarvestDetail) => oldEmployee.id !== item.employee.id,
          ),
          harvestDetail,
        ];
      } else {
        state.details = state.details.map((item: HarvestDetail) =>
          harvestDetail.employee.id === item.employee.id ? harvestDetail : item,
        );
      }
    },

    remove: (state, action: PayloadAction<string>) => {
      state.details = state.details.filter(
        item => item.employee.id !== action.payload,
      );
    },
    reset: state => {
      state.details = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, reset, modify } = harvestSlice.actions;

export default harvestSlice.reducer;
