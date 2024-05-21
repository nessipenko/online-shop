import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { getSearchProducts, setSearchWord } from '../../redux/slices/productsSlice'


import basketIcon from '../../assets/icons/basket.svg'
import searchIcon from '../../assets/icons/search.svg'
import personIcon from '../../assets/icons/person.svg'

import './Header.scss'

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrollLocked, setIsScrollLocked] = useState(false)
    const searchItems = useSelector((state: RootState) => state.items.searchItems);
    const foundItems = useSelector(getSearchProducts);
    const dispatch: AppDispatch = useDispatch();
    const totalProductCount = useSelector((state: RootState) => state.shopBasket.totalCount);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(setSearchWord(searchTerm));
        setIsSearchOpen(searchTerm.trim().length > 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setIsSearchOpen(false);
            setIsScrollLocked(false);
        }
    };

    const handleToggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsScrollLocked(!isSearchOpen)
    };

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
        setIsScrollLocked(false);
    };

    useEffect(() => {
        if (!isSearchOpen) {
            dispatch(setSearchWord(''));
            setIsScrollLocked(false);
        }
    }, [isSearchOpen, dispatch]);

    useEffect(() => {
        if (isScrollLocked) {
            document.body.classList.add('scroll-locked');
        } else {
            document.body.classList.remove('scroll-locked');
        }
    }, [isScrollLocked]);

    return (
        <div className='header'>
            <div className='container'>
                <div className='header__wrapper'>

                    <div className='header__title'>
                        <Link to='/'>
                            Nova Nexus
                        </Link>

                    </div>
                    <div className='header__links'>
                        <Link
                            to='/'
                            className='header__links-home'>
                            Home
                        </Link>
                        <Link
                            to='/'
                            className='header__links-shop'>
                            Shop
                        </Link>
                        <Link
                            to='/'
                            className='header__links-product'>
                            Product
                        </Link>
                        <Link
                            to='/'
                            className='header__links-blog'>
                            Blog
                        </Link>
                        <Link
                            to='/'
                            className='header__links-contact'>
                            Contact
                        </Link>
                    </div>


                    <div className="header__services">

                        <div className="header__search">
                            <button onClick={handleToggleSearch}>
                                <img className="header__search-icon" src={searchIcon} alt="search" />
                            </button>
                            {isSearchOpen && (
                                <div className="header__search-input-container animate__animated animate__flipInX">
                                    <input
                                        autoFocus
                                        className="header__search-input"
                                        placeholder="Search"
                                        value={searchItems}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <div className='header__search-input-close'
                                        onClick={handleCloseSearch}>
                                        <svg width="12" height="12" viewBox="0 0 29 30" fill="#ccc" xmlns="http://www.w3.org/2000/svg"><path d="M17.1568 14.5231L28.4489 3.23075C29.1837 2.49623 29.1837 1.30861 28.4489 0.574085C27.7144 -0.160437 26.5267 -0.160437 25.7922 0.574085L14.4998 11.8665L3.20781 0.574085C2.47295 -0.160437 1.28567 -0.160437 0.551149 0.574085C-0.183716 1.30861 -0.183716 2.49623 0.551149 3.23075L11.8432 14.5231L0.551149 25.8155C-0.183716 26.55 -0.183716 27.7376 0.551149 28.4721C0.917206 28.8385 1.39852 29.0226 1.87948 29.0226C2.36045 29.0226 2.84141 28.8385 3.20781 28.4721L14.4998 17.1798L25.7922 28.4721C26.1586 28.8385 26.6396 29.0226 27.1205 29.0226C27.6015 29.0226 28.0825 28.8385 28.4489 28.4721C29.1837 27.7376 29.1837 26.55 28.4489 25.8155L17.1568 14.5231Z" fill="black"></path></svg>
                                    </div>
                                </div>
                            )}
                            {isSearchOpen && (
                                <div className="header__search-results animate__animated animate__fadeInDown">
                                    {foundItems.map((item) => (
                                        <Link key={item.id} to={`/card/${item.id}`} className="header__search-item">
                                            <img src={item.image} alt={item.title} />
                                            <p>{item.title}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            className='header__services-basket'
                            to='/basket'
                        >
                            <img
                                className='header__services-icon'
                                src={basketIcon}
                                alt='basket'
                            />
                            <div className='header__services-basket_num'>{totalProductCount}</div>
                        </Link>
                        <Link
                            className='header__services-profile'
                            to='/singin'>
                            <img
                                src={personIcon}
                                alt='person'
                            />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header

