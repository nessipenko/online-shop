import React, { useEffect, ChangeEvent } from 'react'
import './Categories.scss'
import {
    getCategories,
    setSelectedCategory,
} from '../../redux/slices/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'

const Categories: React.FC = () => {
    const categories = useSelector((state: RootState) => state.categories.items)
    const selectedCategory = useSelector(
        (state: RootState) => state.categories.selectedCategory
    )
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories() as any)
    }, [dispatch])

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.currentTarget.value
        navigate(`/products/${selectedCategory}`)
        dispatch(setSelectedCategory(selectedCategory))
    }

    const categoryList = categories.map((category: string, id: number) => (
        <option
            value={category}
            key={id}
        >
            {category}
        </option>
    ))

    const allOption = <option value='all'>all</option>

    return (
        <div className='categories'>
            <label htmlFor='categorySelect'>Select a category: </label>
            <br />
            <select
                className='categories__select'
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                {allOption}
                {categoryList}
            </select>
        </div>
    )
}

export default Categories
