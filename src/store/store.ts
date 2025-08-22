
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlices";
import { api } from "../services/api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../features/user/userSlices";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// // types for dispatch and state
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
