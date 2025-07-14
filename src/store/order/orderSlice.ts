import type { IOrderItem } from "@/interfaces";
import type { TLoading } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";


interface IOrderState {
    orderList: IOrderItem[];
    loading: TLoading;
    error: string | null;
}

const initialState: IOrderState = {
    orderList: [],
    // console.log(orderList[0].items)
    loading: "idle",
    error: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrderStatus: (state) => {
    // console.log(orderList[0].items)
            state.loading = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // place order
            .addCase(actPlaceOrder.pending, (state) => {
    // console.log(orderList[0].items)
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actPlaceOrder.fulfilled, (state) => {
    // console.log(orderList[0].items)
                state.loading = "succeeded";
                state.error = null;
            })
            .addCase(actPlaceOrder.rejected, (state, action) => {
    // console.log(orderList[0].items)
                state.loading = "failed";
                if (action.error && typeof action.payload === "string") {
                    state.error = action.payload;
                }
            })

            // get orders list
            .addCase(actGetOrders.pending, (state) => {
    // console.log(orderList[0].items)
                state.loading = "pending";
                state.error = null
            })
            .addCase(actGetOrders.fulfilled, (state, action) => {
    // console.log(orderList[0].items)
                state.loading = "succeeded";
                state.error = null;
                state.orderList = action.payload;
            })
            .addCase(actGetOrders.rejected, (state, action) => {
    // console.log(orderList[0].items)
                state.loading = "failed";
                if (action.error && typeof action.payload === "string") {
                    state.error = action.payload;
                }
            })
    }
})

export const { resetOrderStatus } = orderSlice.actions

export default orderSlice.reducer;