import React, { useEffect, useState } from 'react';
import './Home.scss';
import Product from '../../components/Product/Product';
import Categories from '../../components/Categories/Categories';
import { getCategoriesProd, getSearchProducts, increaseLimit } from '../../redux/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { loadBasketFromLS } from '../../redux/slices/basketSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Slider from '../../components/Slider/Slider';
import BestItems from '../../components/BestItems/BestItems';
import Deal from '../../components/Deal/Deal';

const Home = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedCategory = useSelector((state: RootState) => state.categories.selectedCategory);
    const [loadedItems, setLoadedItems] = useState(8);

    useEffect(() => {
        dispatch(loadBasketFromLS());
    }, [dispatch]);

    const loadMore = () => {
        dispatch(increaseLimit());
        setLoadedItems(prev => prev + 8);
    };

    useEffect(() => {
        selectedCategory === 'all'
            ? dispatch(getCategoriesProd(''))
            : dispatch(getCategoriesProd(selectedCategory));
    }, [selectedCategory, dispatch]);

    const filteredProducts = useSelector(getSearchProducts);

    const renderContent = () => {
        if (filteredProducts.length) {
            return (
                <>
                    {filteredProducts.slice(0, loadedItems).map(({ title, price, image, id }) => (
                        <Product
                            key={id}
                            title={title}
                            price={price}
                            image={image}
                            id={id}
                        />
                    ))}
                </>
            );
        } else {
            return <div className='home__loading'>Loading...</div>;
        }
    };

    return (
        <div className='home'>
            <Slider />
            <BestItems />
            <Deal />
            <div className="home__categories">
                <Categories />
            </div>
            <div className="container">
                <div className="home__wrapper">
                    {renderContent()}
                </div>
                <div className="home__load-more">
                    {loadedItems < filteredProducts.length && (
                        <button onClick={loadMore} className='home__btn btn'>Load more</button>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Home;
