import axiosInstance from "@/config/axios.config";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import type { IProduct } from "@/interfaces";

type TResponse = IProduct[];
type TDataType = "productsFullInfo" | "productIds";

const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist", async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState

    try {
        const userWishlist = await axiosInstance.get<{ productId: number }[]>(
            `wishlist?userId=${auth.user?.id}`, { signal }
        );

        if (!userWishlist.data.length) {
            return { data: [], dataType: "empty" }
        }

        if (dataType === "productIds") {
            const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
            return { data: concatenatedItemsId, dataType: "productsIds" }
        } else {
            const concatenatedItemsId = userWishlist.data
                .map((el) => `id=${el.productId}`)
                .join("&");

            const response = await axiosInstance.get<TResponse>(
                `/products?${concatenatedItemsId}`
            );
            return { data: response.data, dataType: "productsFullInfo" };
        }


    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
}
);

export default actGetWishlist;

// signal ==> use for cancelling request
// getState ==> بتديك نسخه من ال store---- بس لازم تديها type
