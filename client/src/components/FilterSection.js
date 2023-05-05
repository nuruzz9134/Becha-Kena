
import { useFilterContext } from '../context/Filter_Context'
import FormatePrice from '../helper/FormatePrice';

const FilterSection = () => {
  const { filters:{text,category,company,minPrice,maxPrice,price},
         search_filterupdatedValue,
          all_products,
          clearFilter } = useFilterContext();

  // ....to get unique data of each field....
  const getUniqData = (data,proparty)=>{
    let newValue = data.map((currElm)=>{
      return currElm[proparty]
    });
    return (newValue = ["All" , ...new Set(newValue)])
  };

  // ....we need unique data....
  const categoryData = getUniqData(all_products,"category")
  const companyData = getUniqData(all_products,"company")

  return (
    <div>

      <div className='filter-search'>
          <form onSubmit={(e)=>e.preventDefault()}>
            <input type='text' name='text' value={text}
            onChange={search_filterupdatedValue} 
            placeholder="search hear..."/>
          </form>
      </div>

      <div className='filter-category'>
        <h3>Catagory</h3>
        <div>
      {categoryData.map((currElm,index)=>{
        return(
            <button
            key={index}
            type="button"
            name="category"
            value={currElm}
            onClick={search_filterupdatedValue}
            >
            {currElm}
          </button>
        );
      })}
      </div>
      </div>
        <h3>company</h3>
        <form action='#'>
        <select name='company'
                id='company'
                onClick={search_filterupdatedValue}>
          {
            companyData.map((currElm,index)=>{
              return(
                <option key={index} value={currElm} name="company">
                        {currElm}
                </option>
              )
            })
          }
        </select>
        </form>
      </div>

    <div className='filter-price'>
      <h3>price</h3>
      <p>
      <FormatePrice price={price}/>
      </p>
      <input type='range' 
             name='price'
             min={minPrice}
             max={maxPrice}
             value={price}
             onChange={search_filterupdatedValue}
             >
      </input>

    </div>

    <div className='filter-clear'>
          <button onClick={clearFilter}>Clear Filter</button>
    </div>
    </div>
  )
}

export default FilterSection
