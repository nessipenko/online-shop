import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'
import { addToBasket, loadBasketFromLS, removeFromBasket } from '../../redux/slices/basketSlice'
import './Product.scss'

import refresh from '../../assets/icons/refresh.svg'
import basket from '../../assets/icons/basket_card.svg'
import heart from '../../assets/icons/heart.svg'

type TProps = {
    title: string,
    price: number,
    image: string,
    id: number,
    hot?: boolean,
    discount?: number;
}

const Product: React.FC<TProps> = (props) => {
    const { title, price, image, id, hot = false, discount = 0 } = props
    const dispatch: AppDispatch = useDispatch()
    const product = useSelector((state: RootState) =>
        state.shopBasket.basket.find((p) => p.id === id)
    )

    const [localQuantity, setLocalQuantity] = useState<number>(0)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

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

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }



    return (
        <div className="product">
            {hot && <div className="product__hot">Hot</div>}
            {discount > 0 && <div className="product__discount">-{discount}%</div>}
            <div className='product__image'>
                <img src={image} alt={title} />
            </div>

            <Link className='product__title' to={`/card/${id}`}>{title}</Link>

            <div className='product__price'>{price}$</div>
            <div className="product__btns">
                <button onClick={deleteFromBasket} className='product__btns_refresh btn'>
                    <img src={refresh} alt="" />
                </button>
                <button className={`product__btns_heart btn ${isFavorite ? 'favorite' : ''}`} onClick={toggleFavorite}>
                    <img src={heart} alt="" />
                </button>
                <div>
                    <button onClick={addBasket} className='product__btns_add btn'>
                        <img src={basket} alt="" />
                    </button>

                    <div className="product__btns_quantity">
                        <span>{localQuantity}</span>
                    </div>
                </div>
                {/* <button onClick={deleteFromBasket} className='product__btns_add'>Remove</button> */}
            </div>

        </div>
    )
}

export default Product
