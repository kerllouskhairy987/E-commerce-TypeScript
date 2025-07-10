import { createSlice } from '@reduxjs/toolkit'
import actGetCategories from './act/actGetCategories';
import type { ICategory } from '@/interfaces';
import type { TLoading } from '@/types';


interface ICategoriesState {
    records: ICategory[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICategoriesState = {
    records: [],
    loading: "idle",
    error: null,
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoryCleanUp: (state) => {
            state.records = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(actGetCategories.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetCategories.fulfilled, (state, action) => {
                state.loading = "succeeded"
                state.error = null
                state.records = action.payload
            })
            .addCase(actGetCategories.rejected, (state, action) => {
                state.loading = "failed"
                if (action.payload && typeof action.payload === "string") {
                    state.error = action.payload // or as string (garbage collector will do it)
                }
                state.records = []
            })
    }
})
export { actGetCategories };
export const { categoryCleanUp } = categoriesSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default categoriesSlice.reducer
