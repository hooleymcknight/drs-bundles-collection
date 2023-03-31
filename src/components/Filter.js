import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const filter_options = ['woodsy', 'fresh', 'citrus', 'herbal', 'rich', 'spiced']

const Filter = () => {

  return (
    <div className="filter-section">
      <p>Filter by Scent <FontAwesomeIcon icon={faChevronDown} /></p>
      <ul>
        {filter_options.map(filterName => 
          <li key={filterName}>
            <button> <input type="checkbox" defaultChecked /> {filterName} </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Filter