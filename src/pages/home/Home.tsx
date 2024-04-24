import React, { useEffect } from 'react'
import './Home.scss'
import Product from '../../components/Product/Product'
import Categories from '../../components/Categories/Categories'
import { getCategoriesProd, getSearchProducts } from '../../redux/slices/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { loadBasketFromLS } from '../../redux/slices/basketSlice'
import { AppDispatch, RootState } from '../../redux/store'


const Home = () => {
    const dispatch: AppDispatch = useDispatch()
    const selectedCategory = useSelector((state: RootState) => state.categories.selectedCategory)

    useEffect(() => {
        dispatch(loadBasketFromLS())
    }, [dispatch])

    useEffect(() => {
        selectedCategory === 'all'
            ? dispatch(getCategoriesProd(''))
            : dispatch(getCategoriesProd(selectedCategory))
    }, [selectedCategory, dispatch])

    const filteredProducts = useSelector(getSearchProducts);

    const renderContent = () => {
        if (filteredProducts.length) {
            return filteredProducts.map(({ title, price, image, id }) => (
                <Product
                    key={id}
                    title={title}
                    price={price}
                    image={image}
                    id={id}
                />
            ))
        } else {
            return <div className='home__loading'>Loading...</div>
        }
    }

    return (
        <div className='home'>
            <div className="container">
                <div className="home__categories">
                    <Categories />
                </div>
                <div className="home__wrapper">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Home
