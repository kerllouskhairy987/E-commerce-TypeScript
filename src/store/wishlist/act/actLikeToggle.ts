import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/config/axios.config";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import type { RootState } from "@/store";


const actLikeToggle = createAsyncThunk("wishlist/actLikeToggle", async (id: number, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;

    const {auth} = getState() as RootState;
    try {
        const isRecordExist = await axiosInstance.get(`wishlist?userId=${auth.user?.id}&productId=${id}`, { signal });

        if (isRecordExist.data.length) {
            await axiosInstance.delete(`wishlist/${isRecordExist.data[0].id}`);
            return { type: "remove", id }
        } else {
            await axiosInstance.post(`wishlist/`, { userId: auth.user?.id, productId: id });
            return { type: "add", id };
        }

    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
}
);

export default actLikeToggle;