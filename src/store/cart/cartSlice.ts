import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// interfaces and types
import type { IProduct } from '@/interfaces';
import { getCartTotalQuantitySelector } from './selector';
import type { TLoading } from '@/types';
import actGetProductsByItems from './act/actGetProductsByItems';


interface ICartState {
    items: { [key: string]: number }; // refer index signature {1 ==> productId : 1 ==> quantity}
    productsFullInfo: IProduct[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICartState = {
    items: {},
    productsFullInfo: [],
    loading: "idle",
    error: null,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // console.log(action.payload)
            const id = action.payload
            if (state.items[id]) {
                state.items[id]++;
            } else {
                state.items[id] = 1;
            }
        },
        cartItemChangeQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            delete state.items[action.payload]
            state.productsFullInfo = state.productsFullInfo.filter(pro => pro.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(actGetProductsByItems.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetProductsByItems.fulfilled, (state, action) => {
                state.loading = "succeeded"
                state.error = null
                state.productsFullInfo = action.payload
            })
            .addCase(actGetProductsByItems.rejected, (state, action) => {
                state.loading = "failed"
                if (action.error && typeof action.payload === "string") {
                    state.error = action.payload;
                }
                state.productsFullInfo = []
            })
    }
})

export { getCartTotalQuantitySelector };

export const { addToCart, cartItemChangeQuantity, removeFromCart } = cartSlice.actions

export default cartSlice.reducer