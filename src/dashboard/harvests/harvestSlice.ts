import { HarvestDetail } from '@/interfaces/Harvest';
import { ObjectWithId } from '@/interfaces/ObjectWithId';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HarvestState {
  details: HarvestDetail[];
  total: number;
  value_pay: number;
}

interface ModifyHarvestDetail {
  harvestDetail: HarvestDetail;
  oldEmployee: ObjectWithId;
}

const initialState: HarvestState = {
  details: [],
  total: 0,
  value_pay: 0,
};

export const harvestSlice: any = createSlice({
  name: 'harvest',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<HarvestDetail>) => {
      state.details.push(action.payload);
      state.total += action.payload.total;
      state.value_pay += action.payload.value_pay;
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

    remove: (state, action: PayloadAction<HarvestDetail>) => {
      state.details = state.details.filter(
        item => item.employee.id !== action.payload.employee.id,
      );
      state.total -= action.payload.total;
      state.value_pay -= action.payload.value_pay;
    },
    reset: state => {
      state.details = [];
      state.total = 0;
      state.value_pay = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, reset, modify } = harvestSlice.actions;

export default harvestSlice.reducer;
