import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

const Products = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    await fetch('https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/bundles')
      .then(r => r.json())
      .then(r => { setProducts(r)})
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="products-list">
      {products.map(x =>
        <ProductCard key={x.handle} data={x} />
      )}
    </div>
  )
}

export default Products