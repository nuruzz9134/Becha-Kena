
const FilterReducer = (state,action) => {

    switch(action.type){

        case "LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((currElm)=> currElm.price)

            // using reduce method for finding max value

            // let maxPrice = priceArr.reducer((initialValue,currentValue)=>
            //                                 Math.max(initialValue,currentValue),0)

            // using sprade operator to find max value
            let maxPrice = Math.max(...priceArr)        

            return{
                ...state,
                filter_products : [...action.payload],
                all_products: [...action.payload],
                filters:{
                    ...state.filters,
                    price : maxPrice,
                    maxPrice : maxPrice
                }
            };

        case "SET_GRIDE_VIEW":
            return{
                ...state,
                grid_view : false
            };

        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view : true
            };

        case "GET_SORT_VALUE":
            return {
                ...state,
                sorting_value : action.payload
            };

        case "SORTING_PRODUCT":

            const { filter_products , sorting_value } = state
            let tempSortProducts = [...filter_products]
            
            const sortingProducs = (a,b)=>{
                if (sorting_value === "lowest"){
                    return a.price - b.price
                }

                if (sorting_value === "highest"){
                    return b.price - a.price
                }

                if (sorting_value === "a-z"){
                    return a.name.localeCompare(b.name)
                }

                if (sorting_value === "z-a"){
                    return b.name.localeCompare(a.name)
                }
            }
            const newSortData = tempSortProducts.sort(sortingProducs)
            return{
                ...state,
                filter_products : newSortData
            }

        case "UPDATE_SEARCH_FILTER_VALUE" :
            const {name , value} = action.payload;
            return{
                ...state,
                filters :{
                    ...state.filters,
                    [name]: value,
                },
            }

        case "FILTER_SEARCHED_PRODUCT" :
            let {all_products} = state ;
            let  tempFileProduct  = [...all_products] ;

            const {text,category,company,price} = state.filters

            if (text){
                tempFileProduct = tempFileProduct.filter((currElm)=>{
                    return currElm.name.toLowerCase().includes(text);
                });
            }

            if (category !== "All"){
                tempFileProduct = tempFileProduct.filter((currElm)=>{
                    return currElm.category === category;
                });
            }

            if (company !== "All"){
                tempFileProduct = tempFileProduct.filter((currElm)=>{
                    return currElm.company === company;
                });
            }

            if (price){
                tempFileProduct = tempFileProduct.filter((currElm)=>{
                    return currElm.price <= price;
                });
            }

            return{
                ...state,
                filter_products : tempFileProduct
            }
        case "CLEAR_FILTERS" :
            return{
                ...state,
                filters:{
                    ...state.filters,
                    text:"",
                    category:"All",
                    company:"All",
                    minPrice: 0,
                    price:state.filters.maxPrice,
                    maxPrice: state.filters.maxPrice,
                    // state.filter.maxPrice
                }
            }
        

        default : return state;
    }
}

export default FilterReducer