import axiosInstance from '@/config/axios.config'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ICategory } from '@/interfaces'
import axiosErrorHandler from '@/utils/axiosErrorHandler'

const actGetCategories = createAsyncThunk('categories/actGetCategories', async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
        const { data } = await axiosInstance.get<ICategory[]>("categories", { signal })
        // const categories = data.map((le) => le.)
        return data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actGetCategories