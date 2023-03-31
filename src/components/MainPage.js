import React, { useState } from 'react'
import TopBanner from './TopBanner'
import Filter from './Filter'
import Products from './Products'

const defaultFilters = ['woodsy', 'fresh', 'citrus', 'rich', 'herbal', 'spiced']

const MainPage = (props) => {
  const [filters, setFilters] = useState(defaultFilters)

  const setFilterHandler = (tagName) => {
    if(filters.includes(tagName)) {
      setFilters((prevFilters) => {
        const newFilters = prevFilters.filter((tag) => { return tag !== tagName })
        return newFilters
      })
    }
    else {
      setFilters((prevFilters) => {
        return [...prevFilters, tagName]
      })
    }
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return (
    <>
      <TopBanner />
      <Filter defaultFilters={defaultFilters} activeFilters={filters} onFilter={setFilterHandler} onReset={resetFilters} />
      <Products filters={filters} />
    </>
  )
}

export default MainPage