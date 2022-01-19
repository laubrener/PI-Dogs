import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const FILTER_DOG_BY_TEMP = 'FILTER_DOG_BY_TEMP';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';

// export function getDogs(){
//     try{
//         return async function(dispatch){
//             let json = await axios.get('http://localhost:3001/dogs');
//             return dispatch({
//                 type: GET_DOGS,
//                 payload: json.data
//             })
//         }
//     }catch(error){
//         console.log(error);
//     }
    
// };

export function getDogs(){
    return function(dispatch){
        axios.get('http://localhost:3001/dogs')
        .then(json => {
            return dispatch({
                type: GET_DOGS,
                payload: json.data
            })
        })
        .catch(err => console.log(err))
    }
};


export function getTemperaments(){
    try{
        return async function(dispatch){
            let json = await axios.get('http://localhost:3001/temperaments');
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: json.data
            })
        }
    }catch(error){
        console.log(error);
    }
    
};

export function getDogsByName(name){
    try{
        return async function(dispatch){
            let json = await axios.get('http://localhost:3001/dogs?name='+ name);
            return dispatch({
                type: GET_DOGS_BY_NAME,
                payload: json.data
            })
        }
    }catch(error){
        console.log(error);
    }
    
};

export function getDetail(id){
    try{
        return async function(dispatch){
            let json = await axios.get('http://localhost:3001/dogs/'+ id);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        }
    }catch(error){
        console.log(error);
    }
    
};

export function postDog(payload){
    return async function(){
        let json = await axios.post('http://localhost:3001/dogs', payload);
        return json;
    }
};

export function filterDogByTemp(payload){
    return {
        type: FILTER_DOG_BY_TEMP,
        payload
    }
}

export function filterCreated(payload){
    return{
        type:FILTER_CREATED,
        payload
    }
};

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export function orderByWeight(payload){
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
};