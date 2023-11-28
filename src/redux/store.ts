import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlice'
import productsReducer from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'

export const store = configureStore({
    reducer: {
        shopBasket: basketReducer,
        items: productsReducer,
        categories: categoriesReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>