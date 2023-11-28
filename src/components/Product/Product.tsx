import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'
import { addToBasket, loadBasketFromLS, removeFromBasket } from '../../redux/slices/basketSlice'
import './Product.scss'

type TProps = {
    title: string,
    price: number,
    image: string,
    id: number
}

const Product: React.FC<TProps> = (props) => {
    const { title, price, image, id } = props
    const dispatch: AppDispatch = useDispatch()
    const product = useSelector((state: RootState) =>
        state.shopBasket.basket.find((p) => p.id === id)
    )

    const [localQuantity, setLocalQuantity] = useState<number>(0)

    useEffect(() => {
        dispatch(loadBasketFromLS())
    },
        [dispatch])

    useEffect(() => {
        if (product) {
            setLocalQuantity(product.quantity)
        }
    }, [dispatch, product])

    const addBasket = () => {
        setLocalQuantity(localQuantity + 1)
        dispatch(addToBasket({
            id,
            title,
            price,
            image,
            quantity: 1,
            total: localQuantity * price,
        }))
    }

    const deleteFromBasket = () => {
        if (localQuantity > 0) {
            const newQuantity = localQuantity - 1
            setLocalQuantity(newQuantity)

            dispatch(removeFromBasket({ id, price }))
        }
    }

    return (
        <div className='product'>
            <img className='product__image' src={image} alt={title} />
            <Link className='product__title' to={`/card/${id}`}>{title}</Link>

            <div className='product__price'>{localQuantity > 0 ? (price * localQuantity).toFixed(2) : price}$</div>
            <div className="product__btns">
                <button onClick={addBasket} className='product__btns_add'>Add to basket</button>
                <button onClick={deleteFromBasket} className='product__btns_add'>Remove</button>
            </div>
            <div className="product__quantity">
                Quantity: <span>{localQuantity}</span>
            </div>
        </div>
    )
}

export default Product
