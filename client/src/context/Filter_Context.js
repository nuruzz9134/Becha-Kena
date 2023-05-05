import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductsContext";
import filterReducer from "../reducer/Filter_Reducer";


const FilterContext = createContext();

const intialState = {
    filter_products : [],
    all_products : [],
    grid_view : false,
    sorting_value : "lowest",
    filters: {
            text:"",
            category:"All",
            company:"All",
            minPrice:0,
            price:0,
            maxPrice:0
    }
    }

export const FilterContextProvider = ({children}) => {

    const {products} = useProductContext()
    const [state , dispatch] = useReducer(filterReducer,intialState)

    const setGrideView = () =>{
        return dispatch({type : "SET_GRIDE_VIEW"})
    }
    const setListView = () =>{
        return dispatch({type : "SET_LIST_VIEW"})
    }

    // SORTING FUNCTION
    const sorting = (event) =>{
        const uservalue = event.target.value
        return dispatch({type : "GET_SORT_VALUE", payload : uservalue})
    }

    // TO SORT THE PRODUCTS
    useEffect(()=>{
        dispatch({type:"FILTER_SEARCHED_PRODUCT"})
        dispatch({type :"SORTING_PRODUCT",payload: products})
    },[products, state.sorting_value,state.filters])

    // search-filter updated value
    const search_filterupdatedValue = (event)=>{
        let name = event.target.name
        let value = event.target.value
        return dispatch({type:"UPDATE_SEARCH_FILTER_VALUE",payload:{name,value}})
    }

    //  clear the filter value
    const clearFilter = ()=>{
        dispatch({type:"CLEAR_FILTERS"})
    }

    // TO LOAD ALL PRODUCTS FOR GRID AND LIST VIEW
    useEffect(()=>{
        dispatch({ type:"LOAD_FILTER_PRODUCTS" , payload : products})
    },[products])

    return <FilterContext.Provider value={{...state,setGrideView , setListView, sorting,search_filterupdatedValue,clearFilter}}>
        {children}
    </FilterContext.Provider>
};


// custome hook
export const useFilterContext =()=>{
    return useContext(FilterContext)
}