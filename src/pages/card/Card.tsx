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
            <div className='deal'>
                <div className="grey">
                    <div className="container">
                        <div className="deal__wrapper">
                            <div className="deal__img card__img">
                                <img src={product.image} alt={product.title} />
                                <div className="card__rate">Rate: {product.rating?.rate}</div>
                            </div>

                            <div className="deal__descr">
                                <div className="deal__title card__title">{product.title}</div>
                                <div className="deal__price">
                                    <span>{product.price}$</span>
                                </div>
                                <div className="deal__text card__text">{product?.description}</div>

                                <div className="card__count">Stock quantity: {product.rating?.count}</div>

                                <div className="deal__btns card__btns">

                                    <button className="deal__btns_add btn card__btns-add"
                                        onClick={handleAddToBasket}>Add to basket

                                        <span className="card__quantity">{quantityInBasket}</span>
                                    </button>

                                    <button className="card__remove btn card__btns-remove"
                                        onClick={handleRemoveFromBasket}>Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return <div className='card'>{renderContent()}</div>
}

export default Card
