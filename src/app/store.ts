import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersModuleReducer from '../features/users/usersModuleSlice';
import { pokemonApi } from '../services/pokemon';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cropcoApi } from '../services/cropco';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    usersModule: usersModuleReducer,
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [cropcoApi.reducerPath]: cropcoApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(cropcoApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
