import { GET_DOGS, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, FILTER_CREATED, ORDER_BY_NAME } from "../actions";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs:action.payload,
                allDogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            }
        case GET_DOGS_BY_NAME:
            return{
                ...state,
                dogs: action.payload
            }
        case FILTER_CREATED:
            const allDogs = state.allDogs;
            const createdFilter = action.payload === 'created' 
                ? allDogs.filter(el => el.createdInDb)
                : allDogs.filter(el => !el.createdInDb);
            return{
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : createdFilter
            }
        case ORDER_BY_NAME:
            const sortedArr = action.payload === 'asc' ?
            state.dogs.sort(function(a, b) {
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0
            }) :
            state.dogs.sort(function(a, b) {
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0
            });
            return{
                ...state,
                dogs: sortedArr
            }    
        default:
            return state;
    }

}
export default rootReducer;