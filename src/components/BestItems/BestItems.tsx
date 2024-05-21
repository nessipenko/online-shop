import React, { useEffect } from 'react';
import './BestItems.scss';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../Product/Product';
import { fetchRandomProducts, selectRandomProducts } from '../../redux/slices/randomSlice';

const BestItems = () => {
    const dispatch = useDispatch();
    const randomProducts = useSelector(selectRandomProducts)

    useEffect(() => {
        dispatch(fetchRandomProducts() as any);
    }, [dispatch]);

    const renderProducts = randomProducts.map((product, index) => (
        <Product
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            hot={index === 0 || index === 3 || index === 4 || index === 6}
            discount={index === 0 ? 5 : index === 4 ? 20 : index === 6 ? 17 : 0}
        />
    ));

    return (
        <div className="bestItems">
            <div className="container">
                <h2 className='bestItems__title'>Best Seller Items</h2>

                <div className="bestItems__wrapper">
                    {renderProducts}
                </div>
            </div>
        </div>
    );
};

export default BestItems;
