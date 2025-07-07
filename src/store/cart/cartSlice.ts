import { createSlice } from '@reduxjs/toolkit'
// interfaces and types
import type { IProduct } from '@/interfaces';
import { getCartTotalQuantitySelector } from './selector';


interface ICartState {
    items: { [key: number]: number }; // refer index signature {1 ==> productId : 1 ==> quantity}
    productFullInfo: IProduct[];
}

const initialState: ICartState = {
    items: {},
    productFullInfo: [],
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
        }
    },
})

export { getCartTotalQuantitySelector };

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer