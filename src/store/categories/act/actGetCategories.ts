import axiosInstance from '@/config/axios.config'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ICategory } from '@/interfaces'

const actGetCategories = createAsyncThunk('categories/actGetCategories', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const { data } = await axiosInstance.get<ICategory[]>("categories")
        // const categories = data.map((le) => le.)
        return data;
    } catch (error) {
        if(axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message)
        } else {
            return rejectWithValue("An expected error")
        }
    }
})

export default actGetCategories