
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlices";
import usersReducer from "../services/userReduxPlusRTK";
import { api } from "../services/api";
import {usersApi} from "../services/userReduxPlusRTK";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    
    [api.reducerPath]: api.reducer, // RTK Query reducer
    [usersApi.reducerPath]: usersApi.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
