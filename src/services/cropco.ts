// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const cropcoApi = createApi({
  reducerPath: 'cropcoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_HOST_API_CROPCO}`,
  }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    createUser: builder.mutation({
      query: ({ user }) => ({ url: `users`, method: 'POST', body: user }),
      invalidatesTags: ['Users'],
    }),
    getUserById: builder.query({
      query: id => `users/${id}`,
      providesTags: ['Users'],
    }),
    getAllUsers: builder.query({
      query: ({ limit = 100, offset = 0, parameter = '' }) =>
        `users?limit=${limit}&offset=${offset}&parameter=${parameter}`,
      providesTags: ['Users'],
    }),

    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    removeUser: builder.mutation({
      query: ({ id }) => ({ url: `users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = cropcoApi;
