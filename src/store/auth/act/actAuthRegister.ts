import axiosInstance from "@/config/axios.config";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface IFormData {
    firstName: string,
    lastName: string,
    email: string,
    password: string;
}

const actAuthRegister = createAsyncThunk("auth/actAuthRegister", async (formData: IFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const response = await axiosInstance.post("users", formData)
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }

})


export default actAuthRegister;