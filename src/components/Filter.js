import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'

const Filter = (props) => {
  const [filtersShown, setFiltersShown] = useState(false)

  const filterClickHandler = (e) => {
    const btn = e.target.closest('button')
    btn.querySelector('input').checked = !btn.querySelector('input').checked
    props.onFilter(btn.textContent.trim())
  }

  const clearFilterHandler = () => {
    props.onReset()
  }

  const toggleHandler = () => {
    setFiltersShown(!filtersShown)
  }

  return (
    <div className="filter-section" shown={`${filtersShown}`}>
      <button className="filter-toggle" onClick={toggleHandler}>
        <h2>Filter by Scent <FontAwesomeIcon icon={faChevronDown} /></h2>
      </button>

      <div className="filter-dropdown">
        <ul>
          {props.defaultFilters.map(filterName => 
            <li key={filterName}>
              <button onClick={(e) => {filterClickHandler(e)}}> <input type="checkbox" checked={props.activeFilters.includes(filterName) ? true : false} onClick={(e) => {filterClickHandler(e)}} /> {filterName} </button>
            </li>
          )}
        </ul>
        <button className="clear-filters" onClick={clearFilterHandler}><FontAwesomeIcon icon={faXmark} /> Clear Filters</button>
      </div>
    </div>
  )
}

export default Filter