import React, { FormEvent, useEffect } from 'react'
import './Categories.scss'
import { getCategories, setSelectedCategory } from '../../redux/slices/categoriesSlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Categories = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.items)
    const selectedCategory = useSelector((state) => state.categories.selectedCategory)
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])


    const handleCategoryChange = (e:FormEvent<HTMLSelectElement>) => {
        const selectedCategory = e.currentTarget.value
        navigate(`/products/${selectedCategory}`)
        dispatch(setSelectedCategory(selectedCategory))
    }

    const categoryList = categories.map((category:string, id:number) => (
        <option
            value={category}
            key={id}>{category}</option>
    ))

    const allOption = <option value="all">all</option>


    return (
        <div className="categories" >
            <label htmlFor="categorySelect">Select a category: </label>
            <br />
            <select
                className='categories__select'
                value={selectedCategory}
                onChange={handleCategoryChange}>
                {allOption}
                {categoryList}
            </select>
        </div >
    )

}

export default Categories