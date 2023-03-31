import React from 'react'
import TopBanner from './TopBanner'
import Filter from './Filter'
import Products from './Products'

const MainPage = (props) => {

  return (
    <>
      <TopBanner />
      <Filter />
      <Products />
    </>
  )
}

export default MainPage