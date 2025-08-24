import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersAsync } from "./userService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserListType } from "../types/user";
import { formatData } from "../utils/utils";

// Reducer part
export const fetchUsers = createAsyncThunk("users/fetchUsers", async() => {
    return await getUsersAsync();
})

type initialStateType = {
    data: UserListType[];
    loading: boolean;
    error: string | null;
}

const initialState: initialStateType = {data: [], loading: false, error: ""}

const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = formatData(action.payload);
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "Something went wrong";
        })
    }
})


// RTK Query part
export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com/"
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<UserListType[], void>({
            query: () => "users",
            transformResponse: (response: any): UserListType[] => {
                return formatData(response);
            },
        }),
    }),
})

// RTK export
export const { useGetUsersQuery } = usersApi;

// Reducer export
export default userSlice.reducer;