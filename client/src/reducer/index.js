import { GET_DOGS, 
    GET_TEMPERAMENTS, 
    GET_DOGS_BY_NAME, 
    FILTER_DOG_BY_TEMP, 
    FILTER_CREATED, 
    ORDER_BY_NAME, 
    ORDER_BY_WEIGHT } from "../actions";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    allTemps: [],
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
                temperaments: action.payload,
                allTemps: action.payload
            }
        case GET_DOGS_BY_NAME:
            return{
                ...state,
                dogs: action.payload
            }
        case 'POST_DOG':
            return {
                ...state,
            }
        case FILTER_DOG_BY_TEMP:
            const tempFilter = state.allTemps;
            tempFilter.filter(el => el.id === action.payload);
            console.log(action.payload)
            console.log(tempFilter)
            return{
                ...state,
                dogs: tempFilter
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
        case ORDER_BY_WEIGHT:
            let promedio = allDogs.map(el => {
                let arr = el.weight.split('-');
                promedio = (arr[0] + arr[1])/2
                return(promedio);
            })
            console.log(promedio);
            const orderByWeight = action.payload === 'min' ?
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
                dogs: orderByWeight
            }   
        default:
            return state;
    }

}
export default rootReducer;