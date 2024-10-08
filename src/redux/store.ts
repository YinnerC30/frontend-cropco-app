import { authenticationReducer } from '@/modules/authentication/utils/authenticationSlice';
import { consumptionReducer } from '@/modules/consumption/utils/consumptionSlice';
import { harvestReducer } from '@/modules/harvests/utils/harvestSlice';
import { paymentReducer } from '@/modules/payments/utils/paymentSlice';
import { saleReducer } from '@/modules/sales/utils/saleSlice';
import { shoppingReducer } from '@/modules/shopping/utils/shoppingSlice';
import { userReducer } from '@/modules/users/utils/userSlice';
import { workReducer } from '@/modules/work/utils/workSlice';
import { configureStore } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    harvest: harvestReducer,
    payment: paymentReducer,
    sale: saleReducer,
    work: workReducer,
    shopping: shoppingReducer,
    consumption: consumptionReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
