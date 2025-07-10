// axios
import axiosInstance from "@/config/axios.config";
import type { RootState } from "@/store";
// redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// interfaces and types
import type { IProduct } from "@/interfaces";
import axiosErrorHandler from "@/utils/axiosErrorHandler";

const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems", async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemId = Object.keys(cart.items);

    if (itemId.length === 0) {
        return fulfillWithValue([])
    }

    try {
        const concatenatedItemsId = itemId.map((el) => `id=${el}`).join("&");
        const { data } = await axiosInstance.get<IProduct[]>(`products?${concatenatedItemsId}`, { signal })
        return data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }

})


export default actGetProductsByItems;