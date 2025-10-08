import { authenticationReducer } from '@/auth/utils/authenticationSlice';
import { tenantReducer } from '@/auth/utils/tenantSlice';
import { authenticationManagementReducer } from '@/management/auth/utils/authenticationManagementSlice';

import { configureStore } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    tenant: tenantReducer,
    authenticationManagement: authenticationManagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
