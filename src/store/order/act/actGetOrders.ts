import axiosInstance from "@/config/axios.config";
import type { IOrderItem } from "@/interfaces";
import type { RootState } from "@/store";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actGetOrders = createAsyncThunk("order/actGetOrders", async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;

    const { auth } = getState() as RootState;

    try {
        const response = await axiosInstance.get<IOrderItem[]>(`orders?userId=${auth.user?.id}`,
            { signal }
        );
        console.log("from actions", response.data)
        return response.data;

    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actGetOrders;