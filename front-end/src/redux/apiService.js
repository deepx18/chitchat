import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define the API service

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  endpoints: (builder) => ({
    getChatsByUserId: builder.query({
      query: (user_id) => `chats?user_id=${user_id}`,
    }),
    getUserById: builder.query({
        query: (id) => `users/${id}`
    })
  }),
});

// Export the auto-generated hook
export const { useGetChatsByUserIdQuery, useGetUserByIdQuery } = api;