import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './categories/categoriesSlice'
import ProductsSlice from './products/productsSlice'

const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: ProductsSlice
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;