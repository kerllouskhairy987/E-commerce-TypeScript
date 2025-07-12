import axiosInstance from "@/config/axios.config";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface IFormData {
    email: string,
    password: string;
}

interface IResponse {
    accessToken: string,
    user: {
        id: number,
        email: string,
        firstName: string,
        lastName: string
    }
}

const actAuthLogin = createAsyncThunk("auth/actAuthLogin", async (formData: IFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const response = await axiosInstance.post<IResponse>("login", formData)
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }

})


export default actAuthLogin;