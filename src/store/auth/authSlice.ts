import type { TLoading } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import actAuthRegister from './act/actAuthRegister';
import actAuthLogin from './act/actAuthLogin';

interface IAuthState {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    accessToken: string | null;
    loading: TLoading;
    error: string | null;
}

const initialState: IAuthState = {
    user: null,
    accessToken: null,
    loading: "idle",
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        accountCleanUpData: (state) => {
            state.error = null;
            state.loading = "idle";
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
        }
    },
    extraReducers: (builder) => {
        // register
        builder
            .addCase(actAuthRegister.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actAuthRegister.fulfilled, (state) => {
                state.loading = "succeeded"
                state.error = null
            })
            .addCase(actAuthRegister.rejected, (state, action) => {
                state.loading = "failed"
                if (action.error && typeof action.payload === "string") {
                    state.error = action.payload;
                }
            })
        // login
        builder
            .addCase(actAuthLogin.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actAuthLogin.fulfilled, (state, action) => {
                state.loading = "succeeded"
                state.error = null
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
            })
            .addCase(actAuthLogin.rejected, (state, action) => {
                state.loading = "failed"
                if (action.error && typeof action.payload === "string") {
                    state.error = action.payload;
                }
            })
    }
})

export const { accountCleanUpData, logout } = authSlice.actions

export default authSlice.reducer