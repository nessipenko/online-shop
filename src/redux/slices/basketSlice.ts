import { createSlice } from '@reduxjs/toolkit'

type TBasket = {
    id:number,
    title:string,
    price:number,
    image:string,
    quantity:number,
    total:number,
}
type TInitialState = {
    basket:Array<TBasket>,
    totalSum:number,
    totalCount:number,
}
const initialState:TInitialState = {
    basket: [],
    totalSum: 0,
    totalCount: 0,
}

const calculateTotalCount = (basket) => basket.reduce((acc, item) => acc + item.quantity, 0)
const calculateTotalSum = (basket) => basket.reduce((acc, item) => acc + item.total, 0).toFixed(2)

const updLocalStorage = (id, basket) => {
    const product = basket.find((p) => p.id === id)

    if (product && product.quantity > 0) {
        const { title, price, quantity, image, total } = product
        localStorage.setItem(id, JSON.stringify({
            id,
            title,
            price,
            quantity,
            image,
            total
            
        }))
    } else {
        localStorage.removeItem(id)
    }
}


export const basketSlice = createSlice({
    name: 'shopBasket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const { id, price } = action.payload
            const product = state.basket.find((p) => p.id === id)

            if (product) {
                product.quantity++
                product.total += price
            } else {
                state.basket.push({ ...action.payload, quantity: 1, total: price})
            }
            updLocalStorage(id, state.basket)
            state.totalCount = calculateTotalCount(state.basket)
            state.totalSum = calculateTotalSum(state.basket)

        },
        loadBasketFromLS: (state) => {
            const basketItems = Object.keys(localStorage).map((id) => {
                const productObj = JSON.parse(localStorage.getItem(id))
                return { id, ...productObj }
            })
            state.basket = [...basketItems]
            state.totalCount = calculateTotalCount(state.basket)
            state.totalSum = calculateTotalSum(state.basket)
        },
        removeFromBasket: (state, action) => {
            const { id, price } = action.payload
            const productIndex = state.basket.findIndex((p) => p.id === id)

            if (productIndex !== -1) {
                const product = state.basket[productIndex]
                if (product.quantity > 1) {
                    product.quantity--
                    product.total -= price

                } else {
                    state.basket.splice(productIndex, 1)
                }
                updLocalStorage(id, state.basket)
            }
            state.totalCount = calculateTotalCount(state.basket)
            state.totalSum = calculateTotalSum(state.basket)

        },
    },
})

export const { addToBasket, removeFromBasket, loadBasketFromLS } = basketSlice.actions
export default basketSlice.reducer
