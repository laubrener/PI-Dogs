import { GET_DOGS, 
    GET_TEMPERAMENTS, 
    GET_DOGS_BY_NAME, 
    GET_DETAIL, 
    FILTER_DOG_BY_TEMP, 
    FILTER_CREATED, 
    ORDER_BY_NAME, 
    ORDER_BY_WEIGHT } from "../actions";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    allTemps: [],
    detail: []
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
            const breeds = state.allDogs;
            let tempFilter = breeds.filter(el => {
                if (typeof el.temperament === 'string') return el.temperament.includes(action.payload)
                if (Array.isArray(el.temperaments)){
                    let temps = el.temperaments.map(el => el.name);
                    return temps.includes(action.payload);
                }
                return false
                });
            console.log(action.payload)
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
            const orderByWeight = action.payload === 'min' ?
            state.dogs.sort(function(a, b) {
                if (!a.weightMin || !a.weightMax) { //para que me ponga al final todos los que np tienen weight
                    return 1
                }
                if ((a.weightMin + a.weightMax) > (b.weightMin + b.weightMax)){
                    return 1;
                }
                if ((b.weightMin + b.weightMax) > (a.weightMin + a.weightMax)){
                    return -1;
                }
                return 0
            }) :
            state.dogs.sort(function(a, b) {
                if ((a.weightMin + a.weightMax) > (b.weightMin + b.weightMax)){
                    return -1;
                }
                if ((b.weightMin + b.weightMax) > (a.weightMin + a.weightMax)){
                    return 1;
                }
                return 0
            });
            return{
                ...state,
                dogs: orderByWeight
            }   
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }

}
export default rootReducer;