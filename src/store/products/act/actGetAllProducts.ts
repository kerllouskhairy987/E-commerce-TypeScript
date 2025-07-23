import axiosInstance from "@/config/axios.config";
import type { IProduct } from "@/interfaces";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actGetAllProducts = createAsyncThunk("products/actGetAllProducts", async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
        const { data } = await axiosInstance.get<IProduct[]>(`products`, { signal })
        // const categories = data.map((le) => le.)
        return data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actGetAllProducts