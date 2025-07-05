import axiosInstance from '@/config/axios.config'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { IProduct } from '@/interfaces'

const actGetProductsByCatPrefix = createAsyncThunk('products/actGetProductsByCatPrefix', async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const { data } = await axiosInstance.get<IProduct[]>(`products?cat_prefix=${prefix}`)
        // const categories = data.map((le) => le.)
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message)
        } else {
            return rejectWithValue("An expected error")
        }
    }
})

export default actGetProductsByCatPrefix