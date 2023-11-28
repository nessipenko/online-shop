import './Basket.scss'
import { useDispatch, useSelector } from 'react-redux'
import { loadBasketFromLS } from '../../redux/slices/basketSlice'
import React, { useEffect } from 'react'
import Product from '../../components/Product/Product'
import { AppDispatch, RootState } from '../../redux/store'

const Basket = () => {
    const productBasket = useSelector((state: RootState) => state.shopBasket.basket)
    const dispatch: AppDispatch = useDispatch()
    const totalSum = useSelector((state: RootState) => state.shopBasket.totalSum)

    useEffect(() => {
        dispatch(loadBasketFromLS())
    }, [dispatch])

    const productBasketUI = productBasket.map(({ id, title, image, price }) => (
        <Product key={id}
            title={title}
            price={price}
            image={image}
            id={id}
        />
    ))

    return (
        <div>
            <div className="container">
                <div className="home__wrapper basket">
                    {productBasketUI.length > 0 ? (
                        productBasketUI
                    ) : (
                        <h2 className='home__loading'>Basket is empty</h2>
                    )}
                </div>
                <h2>Total sum: {totalSum}$</h2>
            </div>
        </div>
    )

}

export default Basket