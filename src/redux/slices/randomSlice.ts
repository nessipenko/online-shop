import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store"
import axios from 'axios'
import { Status, TItems } from "./productsSlice"

const API_BASE_URL = 'https://fakestoreapi.com/products'

export const fetchRandomProducts = createAsyncThunk<TItems[]>(
    'random/fetchRandomProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<TItems[]>(`${API_BASE_URL}`);
            const shuffledItems = response.data.sort(() => 0.5 - Math.random());
            return shuffledItems.slice(0, 7); 
        } catch (error) {
            console.error('error', error)
            return rejectWithValue('Failed to get random products')
        }
    }
)

export const selectRandomProduct = createSelector(
    (state: RootState) => state.random.items,
    (items) => {
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }
);

export const selectRandomProductImages = createSelector(
    (state: RootState) => state.random.items,
    (items) => {
        const shuffledItems = [...items].sort(() => 0.5 - Math.random());
        const randomImages: string[] = [];

        for (let i = 0; i < 4; i++) {
            if (shuffledItems[i]) {
                randomImages.push(shuffledItems[i].image);
            }
        }

        return randomImages;
    }
);

export const selectRandomProducts = createSelector(
    (state: RootState) => state.random.items,
    (items) => items
);

type TInitialState = {
    items: TItems[],
    status: Status
}

const initialState: TInitialState = {
    items: [],
    status: Status.LOADING
}

const randomSlice = createSlice({
    name: 'random',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRandomProducts.pending, (state) => {
            state.status = Status.LOADING;
        });
        builder.addCase(fetchRandomProducts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchRandomProducts.rejected, (state) => {
            state.status = Status.ERROR;
        });
    }
});

export default randomSlice.reducer;
