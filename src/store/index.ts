import { combineReducers, configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './categories/categoriesSlice'
import ProductsSlice from './products/productsSlice'
import cartSlice from './cart/cartSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web 
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'


// nesting persist
const cartPersistConfig = {
    key: 'cart',
    storage: storage,
    whitelist: ['items']
}

const rootReducer = combineReducers({
    categories: categoriesSlice,
    products: ProductsSlice,
    cart: persistReducer(cartPersistConfig, cartSlice),
})


const store = configureStore({
    reducer: rootReducer,
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