import React from 'react'
import { BsFillGridFill, BsList } from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';
import "../components/allCSS/Sort.css"
import { useFilterContext } from '../context/Filter_Context';


const Sort = () => {

  const {grid_view,setGrideView , setListView , sorting  } = useFilterContext();

  return (
    <div className='sort-filter'>
      <div>
      <button className={! grid_view ? 'sort-filter-button-active' : 'sort-filter-button' }
                        onClick={setGrideView}>
          <BsFillGridFill/>
      </button>
      </div>

      <div>
      <button className={  grid_view ? 'sort-filter-button-active' : 'sort-filter-button'  }
                          onClick={setListView}>
          <BsList/>
      </button>
      </div>

      <div className='priceFilter'>
        <form action='#'>
          <label htmlFor='sort'></label>
          <select name='sort' id='sort' onClick={sorting}>
            <option value="lowest">Price (lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price (highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Price (a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Price (z-a)</option>
            <option value="#" disabled></option>
          </select>
        </form>
      </div>

    </div>
  )
}

export default Sort