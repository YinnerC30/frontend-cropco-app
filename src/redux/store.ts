import { harvestReducer } from "@/modules/harvests/utils/harvestSlice";
import { saleReducer } from "@/modules/sales/utils/saleSlice";
import { workReducer } from "@/modules/work/utils/workSlice";
import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    harvest: harvestReducer,
    sale: saleReducer,
    work: workReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
