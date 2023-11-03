import { useParams } from 'react-router-dom'
import './Card.scss'
import React, { useEffect, useState } from 'react'

type TProduct = {
    id:number,
    title: string,
    price: number,
    description: string,
    category:string ,
    image: string ,
    rating: {
    rate: number ,
    count: number
}
}

const Card = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<TProduct>()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/' + id)
            .then(res => res.json())
            .then(json => setProduct(json))
            .catch(err => console.log(err))
    }, [id])



    const renderContent = () => {
        if (product) {
            return (
                <div className="product-card__wrapper">
                    <div className='product-card'>
                        <div className="product-card__img">
                            <img src={product.image} alt="product" />
                            <div className='product-card__rate'>Rate: {product.rating?.rate}</div >
                        </div>
                        <h2 className='product-card__title'>{product.title}</h2>
                        <div className='product-card__descr'> {product?.description}</div>
                        <div className='product-card__price'>{product.price}$
                            <div className='product-card__count'>Quantity:{product.rating?.count}</div>
                        </div>
                    </div>
                </div>)
        } else {
            return <div className='home__loading'>loading...</div>
        }
    }

    return (
        <div className="container">
            {renderContent()}
        </div>

    )
}

export default Card