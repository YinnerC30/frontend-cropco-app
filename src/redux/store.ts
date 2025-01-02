import { authenticationReducer } from '@/auth/utils/authenticationSlice';
import { consumptionReducer } from '@/modules/consumption/utils/consumptionSlice';
import { paymentReducer } from '@/modules/payments/utils/paymentSlice';

import { shoppingReducer } from '@/modules/shopping/utils/shoppingSlice';

import { configureStore } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    payment: paymentReducer,
    shopping: shoppingReducer,
    consumption: consumptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
