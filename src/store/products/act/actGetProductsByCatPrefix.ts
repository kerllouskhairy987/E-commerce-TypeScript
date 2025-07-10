import axiosInstance from '@/config/axios.config'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { IProduct } from '@/interfaces'
import axiosErrorHandler from '@/utils/axiosErrorHandler'

const actGetProductsByCatPrefix = createAsyncThunk('products/actGetProductsByCatPrefix', async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
        const { data } = await axiosInstance.get<IProduct[]>(`products?cat_prefix=${prefix}`, { signal })
        // const categories = data.map((le) => le.)
        return data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actGetProductsByCatPrefix