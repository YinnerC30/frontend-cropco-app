// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const cropcoApi = createApi({
  reducerPath: 'cropcoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_HOST_API_CROPCO}`,
  }),
  endpoints: builder => ({
    getUserById: builder.query({
      query: id => `users/${id}`,
    }),
    getAllUsers: builder.query({
      query: () => `users`,
    }),
    updateUserById: builder.query({
      query: id => `users/${id}`,
    }),
    removeUserById: builder.query({
      query: id => `users/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateUserByIdQuery,
  useRemoveUserByIdQuery,
} = cropcoApi;
