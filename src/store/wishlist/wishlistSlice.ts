import { createSlice } from "@reduxjs/toolkit"
import actLikeToggle from "./act/actLikeToggle"
import actGetWishlist from "./act/actGetWishlist";
import type { TLoading } from "@/types";
import type { IProduct } from "@/interfaces";
import { logout } from "../auth/authSlice";

interface IWishlistState {
    itemsId: number[];
    productsFullInfo: IProduct[];
    error: string | null;
    loading: TLoading;

}

const initialState: IWishlistState = {
    itemsId: [],
    productsFullInfo: [],
    error: null,
    loading: "idle",
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        wishlistCleanUp: (state) => {
            state.productsFullInfo = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(actLikeToggle.pending, (state) => {
                state.error = null
            })
            .addCase(actLikeToggle.fulfilled, (state, action) => {
                if (action.payload.type === "add") {
                    state.itemsId.push(action.payload.id)
                } else if (action.payload.type === "remove") {
                    state.itemsId = state.itemsId.filter(id => id !== action.payload.id)
                    state.productsFullInfo = state.productsFullInfo.filter(
                        (el) => el.id !== action.payload.id
                    );
                }
            })
            .addCase(actLikeToggle.rejected, (state, action) => {
                if (action.error && typeof action.payload === "string") {
                    state.error = action.payload;
                }
            })

        // get wishlist items
        builder.addCase(actGetWishlist.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetWishlist.fulfilled, (state, action) => {
            state.loading = "succeeded";
            if (action.payload.dataType === "productsFullInfo") {
                state.productsFullInfo = action.payload.data as IProduct[]
            } else if (action.payload.dataType === "productsIds") {
                state.itemsId = action.payload.data as number[];
            } else {
                state.itemsId = []
                state.productsFullInfo = []
            }
        });
        builder.addCase(actGetWishlist.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        });

        // when logout reset
        builder.addCase(logout, (state) => {
            state.itemsId = []
            state.productsFullInfo = []
        })
    }
})

export const { wishlistCleanUp } = wishlistSlice.actions


export default wishlistSlice.reducer
