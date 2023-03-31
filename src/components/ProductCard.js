import { useState, useEffect, useCallback } from "react"
import { formatPrice, listIncludedProducts, getTotalCost, getTags } from "../helpers/cardHelpers"

const ProductCard = (props) => {
  const [included, setIncluded] = useState([])

  const getIncluded = useCallback( async (includedHandle) => {
    await fetch(`https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/product/${includedHandle}`)
      .then(r => r.json())
      .then(r => {
        setIncluded((prevIncluded) => {
          return [...prevIncluded, r]
        })
      })
      .catch(err => console.error(err))
  }, [])

  const handle = props.data.handle
  const imageSrc = props.data.imageSrc
  const title = props.data.title
  const currentPrice = props.data.price
  const includedArr = props.data['products_included']

  useEffect(() => {
    if (!included[0]) {
      // uncomment the next line to monitor how many fetches we're doing. can't be a ridiculous amount
      // console.log('retrieving included fetch')
      includedArr.forEach(includedHandle => {
        getIncluded(includedHandle)
      })
    }
  }, [getIncluded, includedArr])

  return (
    <div className="product-card" data-product-handle={handle} data-scents={included.length ? getTags(included).join(' ') : ''}>
      <img src={imageSrc} alt={title} />
      <h2 className="product-title">{title}</h2>

      <div className="price-line">
        {included.length && getTotalCost(included) !== currentPrice ? <p className="original-price">{formatPrice(getTotalCost(included))}&nbsp;</p> : ''}
        <p className="current-price">{formatPrice(currentPrice)}</p>
      </div>

      <div className="tags">
        {included.length ? getTags(included).map(x => <p key={x} className="scent-tag" data-scent={x}>{x}</p>) : ''}
      </div>

      <div className="included-section">
        <b>Included</b>
        {included.length ? listIncludedProducts(included) : ''}
      </div>
    </div>
  )
}

export default ProductCard