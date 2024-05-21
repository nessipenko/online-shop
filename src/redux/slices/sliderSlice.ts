import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Product {
    id: number;
    image: string;
}

export const fetchImages = createAsyncThunk(
    'slider/fetchImages',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data: Product[] = await response.json();
        const shuffledData = data.sort(() => Math.random() - 0.5);
        return shuffledData.map(product => ({
            id: product.id,
            image: product.image
        }));
    }
)

interface SliderState {
    currentId: number | string;
    images: Product[];
    isAnimating: boolean; // Добавляем флаг анимации
}

const initialState: SliderState = {
    currentId: 0,
    images: [],
    isAnimating: false // Инициализируем флаг анимации
}

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload
        },
        nextSlide: (state) => {
            const currentIndex = state.images.findIndex(image => image.id === state.currentId);
            const nextIndex = (currentIndex + 1) % state.images.length;
            state.currentId = state.images[nextIndex].id;
            state.isAnimating = true; // Устанавливаем флаг анимации
        },
        prevSlide: (state) => {
            const currentIndex = state.images.findIndex(image => image.id === state.currentId);
            const prevIndex = (currentIndex + state.images.length - 1) % state.images.length;
            state.currentId = state.images[prevIndex].id;
            state.isAnimating = true; // Устанавливаем флаг анимации
        },
        // Добавляем дополнительный редьюсер для сброса флага анимации
        resetAnimation: (state) => {
            state.isAnimating = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchImages.fulfilled, (state, action) => {
            state.images = action.payload;
            if (action.payload.length > 0) {
                state.currentId = action.payload[0].id; // Установить currentId на ID первого изображения
            }
        })
    }
})

export const { setImages, nextSlide, prevSlide, resetAnimation } = sliderSlice.actions

export default sliderSlice.reducer
