import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.com/products'


export const getCategoriesProd = createAsyncThunk<TItems[], string>(
    'items/fetchCategoriesProd',
    async (category: string, { rejectWithValue }) => {
        try {
            const url = category
                ? `${API_BASE_URL}/category/${category}`
                : API_BASE_URL

            const response = await axios.get<TItems[]>(url)
            return response.data
        } catch (error) {
            console.error('error', error)
            return rejectWithValue('Failed to get products')
        }
    }
)

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type TItems = {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}
type TInitialState = {
    items: TItems[],
    searchItems: string
    status: Status


}
const initialState: TInitialState = {
    items: [],
    searchItems: '',
    status: Status.LOADING,
}

const productSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setSearchWord: (state, action: PayloadAction<string>) => {
            state.searchItems = action.payload
        },
        getSearchProducts: (state, action: PayloadAction<string>) => {
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