import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import usersModuleReducer from '../features/users/usersModuleSlice';

export const store = configureStore({
  reducer: {
    usersModule: usersModuleReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
