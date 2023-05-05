

const productReducer = (state,action) => {

    switch(action.type){

        case "Api_loadding" :
            return{
                ...state,
                isLoading : true
            }
        
        case "Api_Data" :
            const featureData = action.payload.filter((currElm)=>{
                return currElm.featured === true ;
            })
            return{
                ...state,
                isLoading : false,
                products : action.payload,
                featureProducts : featureData
                };

        case "Api_error" :
                return{
                    ...state,
                    isLoading : false,
                    isError : true
                };

        case "Single_Product_loadding" :
            return{
                ...state,
                isSingleLoading : true
                 };
        case "Single_Product_Data" :
            return{
                ...state,
                isSingleLoading : false,
                singleProduct:action.payload
                 };
        case "Single_Product_error" :
             return{
                ...state,
                isSingleLoading : false,
                isError:true
                      };
    }

  return state
}

export default productReducer