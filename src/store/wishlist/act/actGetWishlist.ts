import axiosInstance from "@/config/axios.config";
import type { IProduct } from "@/interfaces";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TResponse = IProduct[];

const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist", async (_, thunkAPI) => {
        const { rejectWithValue, fulfillWithValue, signal } = thunkAPI;

        try {
            const userWishlist = await axiosInstance.get<{ productId: number }[]>(
                "/wishlist?userId=1", { signal }
            );

            if (!userWishlist.data.length) {
                return fulfillWithValue([]);
            }

            const concatenatedItemsId = userWishlist.data
                .map((el) => `id=${el.productId}`)
                .join("&");

            const response = await axiosInstance.get<TResponse>(
                `/products?${concatenatedItemsId}`
            );
            return response.data;
        } catch (error) {
                    return rejectWithValue(axiosErrorHandler(error))
        }
    }
);

export default actGetWishlist;