import React, { useEffect, useState } from 'react'
import { getCategories, setSelectedCategory } from '../../redux/slices/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import prev from '../../assets/icons/prev.svg';
import next from '../../assets/icons/next.svg';
import electronics from '../../assets/icons/categ/electronics.svg'
import jewelry from '../../assets/icons/categ/jewelry.svg'
import mens from '../../assets/icons/categ/mens.svg'
import womens from '../../assets/icons/categ/womens.svg'
import all from '../../assets/icons/categ/all.svg'
import './Categories.scss'

const Categories: React.FC = () => {
    const categories = useSelector((state: RootState) => state.categories.items)
    const selectedCategory = useSelector((state: RootState) => state.categories.selectedCategory)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [activeIndex, setActiveIndex] = useState<number>(0)


    useEffect(() => {
        dispatch(getCategories() as any)
    }, [dispatch])

    useEffect(() => {
        setActiveIndex(categories.indexOf(selectedCategory))
    }, [selectedCategory, categories])

    const handleCategoryChange = (category: string, index: number) => {
        setActiveIndex(index);
        navigate(`/products/${category}`);
        dispatch(setSelectedCategory(category));
    };

    const handlePrev = () => {
        const newIndex = activeIndex === 0 ? categories.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
        handleCategoryChange(categories[newIndex], newIndex); // Передайте индекс newIndex
    };

    const handleNext = () => {
        const newIndex = activeIndex === categories.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
        handleCategoryChange(categories[newIndex], newIndex); // Передайте индекс newIndex
    };

    const categoryItems = categories.map((category: string, index: number) => (
        <div
            className={`categories__item ${selectedCategory === category ? 'active' : ''} ${activeIndex === index ? 'animate__animated animate__zoomIn' : ''}`}
            key={index}
            onClick={() => handleCategoryChange(category, index)}
        >
            <img src={getCategoryIcon(category)} alt={category} />
            <span className='categories__item_name'>{category}</span>
        </div>
    ));

    const allOption = (
        <div
            className={`categories__item ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all', -1)} // Передайте любой индекс, например, -1
        >
            <img src={all} alt="All" />
            <span className='categories__item_name'>All</span>
        </div>
    );


    return (
        <div className='categories' id='categories'>
            <div className="arrows">
                <button onClick={handlePrev}>
                    <img src={prev} className='prev' alt="prev" />
                </button>
                <button onClick={handleNext}>
                    <img src={next} className='next' alt="next" />
                </button>
            </div>
            <div className="container">
                <h2 className="categories__title">
                    TRENDING CATEGORIES
                </h2>
                <div className="categories__wrapper">
                    {allOption}
                    {categoryItems}
                </div>
            </div>
        </div>
    )
}


export default Categories

function getCategoryIcon(category: string) {

    if (category.includes('wom')) {
        return womens;
    } else if (category.includes('men')) {
        return mens;
    } else if (category === 'electronics') {
        return electronics;
    } else if (category.includes('jew')) {
        return jewelry;
    } else {
        return;
    }
}

