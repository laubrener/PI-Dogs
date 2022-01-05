import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';

export function getDogs(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        })
    }
};

export function getTemperaments(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data
        })
    }
};

export function getDogsByName(name){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/dogs?name='+ name);
        return dispatch({
            type: GET_DOGS_BY_NAME,
            payload: json.data
        })
    }
};

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