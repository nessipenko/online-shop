import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getCategories = createAsyncThunk('category/fetchCategories', async () => {
    try {
        const { data } = await axios.get('https://fakestoreapi.com/products/categories')
        return data
    } catch (e) {
        console.log('error in getCategories', e)
        throw e
    }
})

const initialState: {items:string[], selectedCategory:string}={
    items: [],
    selectedCategory: 'all'
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.items = action.payload
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})
export const { setSelectedCategory, setCategories } = categorySlice.actions
export default categorySlice.reducer