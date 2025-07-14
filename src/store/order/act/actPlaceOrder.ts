import axiosInstance from "@/config/axios.config";
import type { RootState } from "@/store";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actPlaceOrder = createAsyncThunk("order/actPlaceOrder", async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, auth } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((el) => ({
        id: el.id,
        title: el.title,
        price: el.price,
        img: el.img,
        quantity: cart.items[el.id],
    }));

    try {
        const response = await axiosInstance.post("orders", {
            userId: auth.user?.id,
            items: orderItems,
            subtotal,
        })
        return response.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }

})

export default actPlaceOrder