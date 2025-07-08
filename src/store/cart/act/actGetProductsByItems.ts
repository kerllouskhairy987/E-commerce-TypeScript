// axios
import axios from "axios";
import axiosInstance from "@/config/axios.config";
import type { RootState } from "@/store";
// redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// interfaces and types
import type { IProduct } from "@/interfaces";

const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems", async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemId = Object.keys(cart.items);

    if (itemId.length === 0) {
        return fulfillWithValue([])
    }

    try {
        const concatenatedItemsId = itemId.map((el) => `id=${el}`).join("&");
        const { data } = await axiosInstance.get<IProduct[]>(`products?${concatenatedItemsId}`)
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message)
        } else {
            return rejectWithValue("An expected error")
        }
    }

})


export default actGetProductsByItems;