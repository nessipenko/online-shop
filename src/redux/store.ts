import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlice'
import productsReducer from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'
import sliderReducer from './slices/sliderSlice'
import randomReducer from './slices/randomSlice'


export const store = configureStore({
    reducer: {
        shopBasket: basketReducer,
        items: productsReducer,
        categories: categoriesReducer,
        slider: sliderReducer,
        random: randomReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>