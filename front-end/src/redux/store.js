import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import { api } from './apiService';

const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;


