import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from "../store"
import { Status, TItems } from "./productsSlice";

const API_BASE_URL = 'https://fakestoreapi.com/products'


export const getAllProducts = createAsyncThunk<TItems[], void>(
    'items/fetchAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<TItems[]>(API_BASE_URL);
            return response.data;
        } catch (error) {
            console.error('error', error);
            return rejectWithValue('Failed to get products');
        }
    }
);

type TInitialState = {
    items: TItems[],
    searchItems: string,
    status: Status,
}
const initialState: TInitialState = {
    items: [],
    searchItems: '',
    status: Status.LOADING,

}

const productSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {
        setSearchWord: (state, action: PayloadAction<string>) => {
            state.searchItems = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.status = Status.LOADING
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(getAllProducts.rejected, (state) => {
            state.status = Status.ERROR
        })
    }
})

export const { setSearchWord } = productSlice.actions;


export const getSearchProducts = createSelector(
    (state: RootState) => state.items.items,
    (state: RootState) => state.items.searchItems,
    (items, searchItems) =>
        items.filter(item =>
            item.title.toLowerCase().includes(searchItems.toLowerCase())
        )
);

export default productSlice.reducer;