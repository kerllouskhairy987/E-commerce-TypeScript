import categoriesSlice from './categories/categoriesSlice'
import ProductsSlice from './products/productsSlice'
import cartSlice from './cart/cartSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web 
import persistStore from 'redux-persist/es/persistStore'
import wishlistSlice from './wishlist/wishlistSlice'
import authSlice from './auth/authSlice'
import orderSlice from './order/orderSlice'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

// root persist
const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'auth']
}

// nesting persist
const cartPersistConfig = {
    key: 'cart',
    storage: storage,
    whitelist: ['items']
}

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'accessToken']
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    categories: categoriesSlice,
    products: ProductsSlice,
    cart: persistReducer(cartPersistConfig, cartSlice),
    wishlist: wishlistSlice,
    order: orderSlice,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)
export { store, persistor };