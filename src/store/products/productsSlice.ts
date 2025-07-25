import { createSlice } from '@reduxjs/toolkit'
import type { IProduct } from '@/interfaces';
import type { TLoading } from '@/types';
import actGetProductsByCatPrefix from './act/actGetProductsByCatPrefix';
import actGetAllProducts from './act/actGetAllProducts';


interface IProductsState {
    records: IProduct[];
    loading: TLoading;
    error: string | null;
}

const initialState: IProductsState = {
    records: [],
    loading: "idle",
    error: null,
}

export const ProductsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        productsCleanUp: (state) => { // reset state
            state.records = [];
        }
    },
    // get products by cat prefix
    extraReducers: (builder) => {
        builder
            .addCase(actGetProductsByCatPrefix.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
                state.loading = "succeeded"
                state.error = null
                state.records = action.payload
            })
            .addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
                state.loading = "failed"
                if (action.payload && typeof action.payload === "string") {
                    state.error = action.payload // or as string (garbage collector will do it)
                }
                state.records = []
            })

            // get all products 
            .addCase(actGetAllProducts.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetAllProducts.fulfilled, (state, action) => {
                state.loading = "succeeded"
                state.error = null
                state.records = action.payload
            })
            .addCase(actGetAllProducts.rejected, (state, action) => {
                state.loading = "failed"
                if (action.payload && typeof action.payload === "string") {
                    state.error = action.payload // or as string (garbage collector will do it)
                }
                state.records = []
            })
    }
})

export const { productsCleanUp } = ProductsSlice.actions

export default ProductsSlice.reducer
