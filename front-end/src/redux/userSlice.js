import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    user_id: null, //parseInt(Math.random() * 11)
    user_app_id: "",
    name: "",
    email: "",
  },
  chats: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state, payload) => {
      //   console.log(payload);
      state.currentUser = {
        user_id: payload.payload.id,
        user_app_id: payload.payload.user_app_id,
        name: payload.payload.name,
        email: payload.payload.email,
      };
    },
    initChats: (state, payload) => {
      state.chats = payload.payload
    } 
  },
});

export const { initUser, initChats } = userSlice.actions;
export default userSlice.reducer;
