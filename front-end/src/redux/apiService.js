import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop().split(";").shift());
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getCookie("XSRF-TOKEN");

      if (token) {
        headers.set("X-XSRF-TOKEN", token); // 🔥 THIS FIXES YOUR ISSUE
      }

      return headers;
    },
  }),
  tagTypes: ["Messages", "Chats", "Users", "User"],
  endpoints: (builder) => ({
    getChatsByUserId: builder.query({
      query: (user_id) => `api/chats?user_id=${user_id}`,
      providesTags: ["Chats"],
    }),
    getUserById: builder.query({
      query: (id) => `api/users/${id}`,
      providesTags: ["Users"],
    }),
    getUserByEmail: builder.query({
      query: (email) => `api/users?email=${email}`,
      providesTags: ["Users"],
    }),
    getMessagesByRoomId: builder.query({
      query: (room_id) => `api/messages?room_id=${room_id}`,
      providesTags: ["Messages"],
    }),
    getAuthenticatedUser: builder.query({
      query: () => `api/user`,
      transformResponse: (response, meta) => {
        return {
          data: response,
          status: meta?.response?.status,
          // headers: meta?.response?.headers,
        };
      },
      providesTags: ["User"],
    }),
    login: builder.mutation({
      async queryFn(credentials, _queryApi, _extraOptions, baseQuery) {
        // 1. Get CSRF cookie
        await baseQuery({
          url: "/sanctum/csrf-cookie",
          method: "GET",
        });

        // 2. Login
        const result = await baseQuery({
          url: "api/login",
          method: "POST",
          body: credentials,
        });

        return result;
      },
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"]
    }),
    postMessage: builder.mutation({
      query: (data) => ({
        url: "/api/messages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Messages"],
    }),
    postChat: builder.mutation({
      query: (data) => ({
        url: "/api/chats",
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
  useGetAuthenticatedUserQuery,
  useLazyGetMessagesByRoomIdQuery,
  useLazyGetUserByEmailQuery,
  useLazyGetAuthenticatedUserQuery,
  useLazyGetChatsByUserIdQuery,
  useLoginMutation,
  useLogoutMutation,
  usePostMessageMutation,
  usePostChatMutation,
} = api;
