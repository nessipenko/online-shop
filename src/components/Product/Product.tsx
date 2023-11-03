import { Link } from 'react-router-dom'
import './Product.scss'
import { addToBasket, loadBasketFromLS, removeFromBasket } from '../../redux/slices/basketSlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

const Product = (props) => {
    const { title, price, image, id } = props
    const dispatch = useDispatch()
    const product = useSelector((state) =>
        state.shopBasket.basket.find((p) => p.id === id)
    )

    const [localQuantity, setLocalQuantity] = useState<number>(0)

    useEffect(() => {
        dispatch(loadBasketFromLS())
        if (product) {
            setLocalQuantity(product.quantity)
        }
    }, [])

    const addBasket = () => {
        const newQuantity = localQuantity + 1
        setLocalQuantity(newQuantity)
        dispatch(addToBasket({
            id,
            title,
            price,
            image,

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

            <div className='product__price'>{localQuantity>0? price*localQuantity:price}$</div>
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
