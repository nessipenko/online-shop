import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getCategories = createAsyncThunk<CategoryList>(
    'category/fetchCategories',
    async () => {
        try {
            const { data } = await axios.get('https://fakestoreapi.com/products/categories')
            return data
        } catch (e) {
            console.log('error in getCategories', e)
            throw e
        }
    })
type CategoryList = string[]
const initialState: { items: CategoryList, selectedCategory: string } = {
    items: [],
    selectedCategory: 'all'
}
type FulfilledAction<T> = {
    type: string
    payload: T
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<string[]>) => {
            state.items = action.payload
        },
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action: FulfilledAction<CategoryList>) => {
            state.items = action.payload
        })
    }
})
export const { setSelectedCategory, setCategories } = categorySlice.actions
export default categorySlice.reducer