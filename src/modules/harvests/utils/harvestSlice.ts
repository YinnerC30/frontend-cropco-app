import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HarvestDetail } from '@/modules/harvests/interfaces/Harvest';
import { ObjectWithId } from '@/modules/core/interfaces/ObjectWithId';

interface HarvestState {
  details: HarvestDetail[];
  total: number;
  value_pay: number;
}

interface ModifyHarvestDetail {
  detail: HarvestDetail;
  oldEmployee: ObjectWithId;
}

const initialState: HarvestState = {
  details: [],
  total: 0,
  value_pay: 0,
};

export const harvestSlice = createSlice({
  name: 'harvest',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<HarvestDetail[]>) => {
      state.details.push(...action.payload);
    },
    modify: (state, action: PayloadAction<ModifyHarvestDetail>) => {
      const { detail, oldEmployee } = action.payload;
      const isDifferentEmployee = detail.employee.id !== oldEmployee.id;

      if (isDifferentEmployee) {
        state.details = [
          ...state.details.filter(
            (detail: HarvestDetail) => oldEmployee.id !== detail.employee.id,
          ),
          detail,
        ];
      } else {
        state.details = state.details.map((detailState: HarvestDetail) =>
          detailState.employee.id === detail.employee.id ? detail : detailState,
        );
      }
    },
    remove: (state, action: PayloadAction<HarvestDetail>) => {
      state.details = state.details.filter(
        (detail: HarvestDetail) =>
          detail.employee.id !== action.payload.employee.id,
      );
    },
    reset: state => {
      state.details = [];
      state.total = 0;
      state.value_pay = 0;
    },
    calculateTotal: state => {
      state.total = state.details.reduce(
        (total: number, detail: HarvestDetail) => total + detail.total,
        0,
      );
      state.value_pay = state.details.reduce(
        (total: number, detail: HarvestDetail) => total + detail.value_pay,
        0,
      );
    },
  },
});

export const { add, remove, reset, modify, calculateTotal } =
  harvestSlice.actions;

export const harvestReducer = harvestSlice.reducer;
export default { harvestReducer };
