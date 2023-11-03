import './Header.scss'
import React, { ChangeEvent } from 'react'
import basketIcon from '../../assets/icons/shopping_cart.svg'
import logoIcon from '../../assets/icons/logo.svg'
import Categories from '../Categories/Categories.tsx'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setSearchWord } from '../../redux/slices/productsSlice.ts'

const Header = ()=> {
    const dispatch = useDispatch()
    const selectedCategory = useSelector((state) => state.categories.selectedCategory)
    const totalProductCount = useSelector((state) => state.shopBasket.totalCount)
    const navigate = useNavigate()

    const goToHomePage = () => {
        navigate(`/products/${selectedCategory}`)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchWord(e.target.value))
    }

    return (
        <div className="header">
            <div className="container">
                <div className="header__wrapper">

                    <div className='header__category' >
                        <Categories
                            selectedCategory={selectedCategory} />

                    </div>

                    <div className="header__title">
                        <button className='header__title_logo'
                            onClick={goToHomePage}>
                            <img src={logoIcon} alt="logo" />
                        </button>
                        <Link className='header__title_name'
                            to='/'>
                            Online Market
                        </Link>
                    </div>

                    <div className="header__services">
                        <Link to='/order'
                            className='header__services_order'>
                            Order
                        </Link>
                        <Link to='/delivery'
                            className='header__services_delivery'>
                            Delivery
                        </Link>
                    </div>

                    <input className="header__search"
                        placeholder='Search'
                        // value={searchProduct}
                        onChange={handleChange} />

                </div>
                <Link className='header__basket'
                    to="/basket">
                    <img
                        className='header__basket_icon' src={basketIcon} alt="basket" />
                    <div className="header__basket_num">
                        {totalProductCount}
                    </div>
                </Link>

                {/* <Link to='/stock'>sale</Link> */}

            </div>
        </div >
    )
}

export default Header
