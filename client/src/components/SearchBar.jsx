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

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogsByName(name));//el nombre que el usuario escribio
        setName('');
    };

    return(
        <div>
            <input type="text" 
            placeholder="Type here to search"
            onChange={e => {handleInputChange(e)}}
            />
            <button type="submit" onClick={e => {handleClick(e)}}>Search</button>
        </div>
    )
}