import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogsByName(name));//el nombre que el usuario escribio
        console.log(name);
        setName('');
    };

    return(
        <div>
            <input type="text" 
            placeholder="Buscar..."
            onChange={e => {handleInputChange(e)}}
            />
            <button type="submit" onClick={e => {handleSubmit(e)}}>Buscar</button>
        </div>
    )
}