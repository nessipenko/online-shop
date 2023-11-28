import { useParams } from 'react-router-dom'
import './Card.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, loadBasketFromLS, removeFromBasket } from '../../redux/slices/basketSlice'
import { AppDispatch, RootState } from '../../redux/store'

type TProduct = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
    quantity: number
}

const Card = () => {
    const { id: productId } = useParams()
    const [product, setProduct] = useState<TProduct | null>(null)
    const dispatch: AppDispatch = useDispatch()
    const basketItems = useSelector((state: RootState) => state.shopBasket.basket)

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.json())
            .then((productData) => setProduct(productData))
            .catch((err) => console.log(err))
    }, [productId])

    useEffect(() => {
        dispatch(loadBasketFromLS())
    }, [dispatch])

    const handleAddToBasket = () => {
        if (!product) return

        const existingProduct = basketItems.find((item) => item.id === product.id)
        const updatedQuantity = existingProduct ? existingProduct.quantity + 1 : 1

        dispatch(
            addToBasket({
                ...existingProduct,
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: updatedQuantity,
                total: product.price * updatedQuantity,
            })
        )
    }

    const handleRemoveFromBasket = () => {
        if (product) {
            dispatch(removeFromBasket({ id: product.id, price: product.price }))
        }
    }

    const renderContent = () => {
        if (!product) return <div className="home__loading">loading...</div>

        const productInBasket = basketItems.find((item) => item.id === product.id)
        const quantityInBasket = productInBasket ? productInBasket.quantity : 0

        return (
            <div className="product-card__wrapper">
                <div className="product-card">
                    <div className="product-card__img">
                        <img src={product.image} alt="product" />
                        <div className="product-card__rate">Rate: {product.rating?.rate}</div>
                    </div>
                    <h2 className="product-card__title">{product.title}</h2>
                    <div className="product-card__descr">{product?.description}</div>
                    <div className="product-card__price">
                        {product.price}$
                        <div className="product__btns">
                            <button onClick={handleAddToBasket} className="product__btns_add">
                                Add to basket
                            </button>
                            <button onClick={handleRemoveFromBasket} className="product__btns_add">
                                Remove
                            </button>
                        </div>
                        <div className="product__quantity card">Quantity in basket: <span>{quantityInBasket}</span></div>
                        <div className="product-card__count">Stock quantity: {product.rating?.count}</div>
                    </div>
                </div>
            </div>
        )
    }

    return <div className="container">{renderContent()}</div>
}

export default Card
