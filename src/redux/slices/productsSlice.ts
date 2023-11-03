import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.com/products'


export const getCategoriesProd = createAsyncThunk(
    'items/fetchCategoriesProd',
   async (category, ) => {
        try {
            const url = category
                ? `${API_BASE_URL}/category/${category}`
                : API_BASE_URL

            const { data } = await axios.get(url)
            return data
        } catch (e) {
            console.log('error', e)
            return null
        }
    })

    enum Status{
        LOADING= 'loading',
        SUCCESS= 'success',
        ERROR='error',
    }

type TItems = {
    id: number,
    title:  ``,
    price: string | number,
    category: string,
    description: string,
    image: string
}
type TInitialState = {
    items: Array<TItems>[],
    searchItems:string
    status:Status


}
const initialState:TInitialState = {
    items: [],
    searchItems: '',
    status:Status.LOADING,
}

const productSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setSearchWord: (state, action) => {
            state.searchItems = action.payload
        },
        getSearchProducts: (state, action) => {
            state.items = state.items.filter
                (item => item.title.toLowerCase()
                    .includes(action.payload.toLowerCase()))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoriesProd.pending, (state) => {
            state.status = Status.LOADING
        })
        builder.addCase(getCategoriesProd.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(getCategoriesProd.rejected, (state) => {
            state.status = Status.ERROR
        })
    }
})

export const { setSearchWord, getSearchProducts } = productSlice.actions
export default productSlice.reducer