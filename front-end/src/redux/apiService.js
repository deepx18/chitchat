import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API }),
  tagTypes: ["Messages", "Chats", "User"],
  endpoints: (builder) => ({
    getChatsByUserId: builder.query({
      query: (user_id) => `chats?user_id=${user_id}`,
      providesTags: ["Chats"],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: ["Users"],
    }),
    getUserByEmail: builder.query({
      query: (email) => `users?email=${email}`,
      providesTags: ["Users"],
    }),
    getMessagesByRoomId: builder.query({
      query: (room_id) => `messages?room_id=${room_id}`,
      providesTags: ["Messages"],
    }),
    postMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Messages"],
    }),
    postChat: builder.mutation({
      query: (data) => ({
        url: "/chats",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chats"],
    }),
  }),
});

export const {
  useGetChatsByUserIdQuery,
  useGetUserByIdQuery,
  useGetMessagesByRoomIdQuery,
  useLazyGetUserByEmailQuery,
  usePostMessageMutation,
  usePostChatMutation
} = api;
