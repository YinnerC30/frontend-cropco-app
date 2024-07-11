import { authenticationReducer } from "@/modules/authentication/utils/authenticationSlice";
import { harvestReducer } from "@/modules/harvests/utils/harvestSlice";
import { paymentReducer } from "@/modules/payments/utils/paymentSlice";
import { saleReducer } from "@/modules/sales/utils/saleSlice";
import { workReducer } from "@/modules/work/utils/workSlice";
import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    harvest: harvestReducer,
    payment: paymentReducer,
    sale: saleReducer,
    work: workReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
