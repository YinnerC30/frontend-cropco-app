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
    {
      employee: {
        id: 'b208ee3b-f882-4dcf-82e8-08e2cee42769',
        first_name: 'Isabella',
      },
      total: 5,
      value_pay: 3300,
    },
    {
      employee: {
        id: '3de76098-b601-4e12-b22b-8b7573fa72de',
        first_name: 'Ava',
      },
      total: 1,
      value_pay: 50,
    },
    {
      employee: {
        id: '23e5ec57-0607-4c1b-bd18-aade6e2280fa',
        first_name: 'Andrew',
      },
      total: 2,
      value_pay: 100,
    },
    {
      employee: {
        id: '82a18deb-99de-4848-981d-cb7c78936082',
        first_name: 'David',
      },
      total: 2,
      value_pay: 150,
    },
    {
      employee: {
        id: '1a1d32ce-2c35-4909-a75d-1f6941a35664',
        first_name: 'Emily',
      },
      total: 4,
      value_pay: 150,
    },
    {
      employee: {
        id: '94db1394-19ac-4791-9d9e-5e1cdde2d8ce',
        first_name: 'William',
      },
      total: 4,
      value_pay: 250,
    },
    {
      employee: {
        id: '6ad7ca5d-7a5d-448d-b618-7c75852c8b7b',
        first_name: 'Sophia',
      },
      total: 10,
      value_pay: 200,
    },
    {
      employee: {
        id: 'f495411e-dbfd-4884-9ac2-0eb2f8cad6b1',
        first_name: 'Mia',
      },
      total: 4,
      value_pay: 200,
    },
    {
      employee: {
        id: '49ac8912-ef6c-4465-9bbb-e2cf002b74f9',
        first_name: 'Olivia',
      },
      total: 11,
      value_pay: 250,
    },
    {
      employee: {
        id: '3f8145a9-a2b6-4b9f-b939-514e9302567b',
        first_name: 'Jane',
      },
      total: 3,
      value_pay: 250,
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
