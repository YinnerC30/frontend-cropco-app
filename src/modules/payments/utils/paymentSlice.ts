import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentsPending } from "../interfaces/PaymentsPending";

interface PaymentState {
  employeeId: string;
  dataEmployee: PaymentsPending;
  paymentsToPay: [] | any;
  totalToPay: number;
}

const initialState: PaymentState = {
  employeeId: "",
  dataEmployee: {
    harvests_detail: [],
    works_detail: [],
  },
  paymentsToPay: [],
  totalToPay: 0,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    modifyEmployeeId: (state, action: PayloadAction<any>) => {
      const { employeeId } = action.payload;
      state.employeeId = employeeId;
    },

    resetEmployeeId: (state) => {
      state.employeeId = "";
    },
    setDataEmployee: (state, action: PayloadAction<PaymentsPending>) => {
      state.dataEmployee = action.payload;
    },
    resetDataEmployee: (state) => {
      state.dataEmployee = {
        harvests_detail: [],
        works_detail: [],
      };
    },
    addRecordToPay: (state, action: PayloadAction<any>) => {
      state.paymentsToPay.push(action.payload);
      const { type, id } = action.payload;
      if (type === "harvest") {
        state.dataEmployee.harvests_detail =
          state.dataEmployee.harvests_detail.filter((item) => item.id !== id);
      } else {
        state.dataEmployee.works_detail =
          state.dataEmployee.works_detail.filter((item) => item.id !== id);
      }
    },
    addRecordsToPay: (state, action: PayloadAction<any[]>) => {
      state.paymentsToPay.push(...action.payload);
    },
    removeRecordToPay: (state, action: PayloadAction<any>) => {
      const { id, type } = action.payload;
      state.paymentsToPay = state.paymentsToPay.filter(
        (item: { id: any }) => item.id !== id
      );
      if (type === "harvest") {
        state.dataEmployee.harvests_detail.push({ ...action.payload });
      }
      if (type === "work") {
        state.dataEmployee.works_detail.push({ ...action.payload });
      }
    },
    resetPaymentsToPay: (state) => {
      state.paymentsToPay = [];
    },
    calculateTotal: (state) => {
      state.totalToPay = state.paymentsToPay.reduce(
        (total: number, record: any) => total + record.value_pay,
        0
      );
    },
    resetAll: (state) => {
      state.employeeId = "";
      state.dataEmployee = {
        harvests_detail: [],
        works_detail: [],
      };
      state.paymentsToPay = [];
      state.totalToPay = 0;
    },
  },
});

export const {
  resetEmployeeId,
  modifyEmployeeId,
  setDataEmployee,
  resetDataEmployee,
  resetPaymentsToPay,
  removeRecordToPay,
  addRecordToPay,
  calculateTotal,
  addRecordsToPay,
  resetAll,
} = paymentSlice.actions;

export const paymentReducer = paymentSlice.reducer;
export default { paymentReducer };
