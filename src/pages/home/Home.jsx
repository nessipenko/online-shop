import React, { useEffect } from 'react'
import './Home.scss'
import Product from '../../components/Product/Product.tsx'
import Categories from '../../components/Categories/Categories.tsx'
import { getCategoriesProd, getSearchProducts } from '../../redux/slices/productsSlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { loadBasketFromLS } from '../../redux/slices/basketSlice.ts'


const Home = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.items.items)
    const search = useSelector((state) => state.items.searchItems)
    const selectedCategory = useSelector((state) => state.categories.selectedCategory)

    useEffect(() => {
        dispatch(loadBasketFromLS())
    }, [dispatch])

    useEffect(() => {
        selectedCategory === 'all'
            ? dispatch(getCategoriesProd())
            : dispatch(getCategoriesProd(selectedCategory))
    }, [selectedCategory, dispatch])

    useEffect(() => {
        search === ''
            ? dispatch(getCategoriesProd())
            : dispatch(getSearchProducts(search))
    }, [search, dispatch])

    const filteredProducts = products.filter((product) => {
        if (selectedCategory === 'all') {
            return true
        }
        return product.category === selectedCategory
    })

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
