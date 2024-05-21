import React, { useEffect } from 'react'
import './Deal.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesProd } from '../../redux/slices/productsSlice'
import { selectRandomProduct, selectRandomProductImages } from '../../redux/slices/randomSlice'
import { Link } from 'react-router-dom'

const Deal = () => {
    const dispatch = useDispatch();
    const randomProduct = useSelector(selectRandomProduct);
    const randomImages = useSelector(selectRandomProductImages);

    useEffect(() => {
        dispatch(getCategoriesProd('') as any);
    }, [dispatch]);

    return (
        <div className='deal'>
            <div className="grey">
                <div className="container">

                    <div className="deal__wrapper">

                        <Link to={randomProduct ? `/card/${randomProduct.id}` : '#'}>
                            <div className="deal__img">
                                {randomProduct && <img src={randomProduct.image} alt={randomProduct.title} />}
                            </div>
                        </Link>


                        <div className="deal__descr">
                            <div className="deal__title">DEAL OF THE WEEK</div>
                            <div className="deal__price">
                                from <span>${randomProduct && randomProduct.price}</span>
                            </div>
                            <div className="deal__text">{randomProduct && randomProduct.description}</div>
                            <div className="deal__btns">
                                <Link to={randomProduct ? `/card/${randomProduct.id}` : '#'}>
                                    <button className="deal__btns_add btn">SHOP NOW</button>
                                </Link>


                            </div>
                            <div className="deal__images">
                                {randomImages.map((image, index) => (
                                    image && (
                                        <Link key={index} to={`/card/${randomProduct.id}`}>
                                            <img src={image} alt={`Product ${index + 1}`} />
                                        </Link>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Deal;
