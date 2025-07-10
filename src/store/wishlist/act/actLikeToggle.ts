import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/config/axios.config";
import axiosErrorHandler from "@/utils/axiosErrorHandler";


const actLikeToggle = createAsyncThunk("wishlist/actLikeToggle", async (id: number, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const isRecordExist = await axiosInstance.get(`wishlist?userId=1&productId=${id}`);
            
            if(isRecordExist.data.length) {
                await axiosInstance.delete(`wishlist/${isRecordExist.data[0].id}`);
                return {type: "remove", id}
            } else {
                await axiosInstance.post(`wishlist/`, {userId: "1", productId: id});
                return {type: "add", id};
            }
            
        } catch (error) {
                    return rejectWithValue(axiosErrorHandler(error))
        }
    }
);

export default actLikeToggle;