import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../actions";

export default function DogCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);
    // Nombre
    // Altura (Diferenciar entre altura mínima y máxima)
    // Peso (Diferenciar entre peso mínimo y máximo)
    // Años de vida
    const [input, setInput] = useState({
        name:'',
        height:'',
        weight:'',
        life_span:'',
        temperament:''
    });

    function handleChange(e){
        setInput({
            ...input, //ademas de lo que tiene 
            [e.target.name]: e.target.value //agregale lo que el usuario pone
        })
    };

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postDog(input));
        alert('Raza creada con éxito!');
        setInput({
            name:'',
            height:'',
            weight:'',
            life_span:'',
            temperament:''
        })
        navigate('/home');
    };

    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    return(
        <div>
            <Link to='/home' ><button>Volver</button></Link>
            <h1>Crea tu personaje</h1>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={input.name}
                        name="name"
                        onChange={(e) => {handleChange(e)}}  
                    />
                </div>
                <div>
                    <label>Altura:</label>
                    <input 
                        type="text" 
                        value={input.height}
                        name="height" 
                        onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                <div>
                    <label>Peso:</label>
                    <input 
                        type="text" 
                        value={input.weight}
                        name="weight"  
                        onChange={(e) => {handleChange(e)}}
                    />
                </div>
                <div>
                    <label>Años:</label>
                    <input 
                        type="text" 
                        value={input.life_span}
                        name="life_span" 
                        onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        type="text" 
                        value={input.image}
                        name="image" 
                        onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                <select onChange={(e) => {handleSelect(e)}} >
                    { temperaments?.map((el) => (
                        <option value={el.name}>{el.name}</option>
                    ))}
                </select>

                <button type="submit">Crear Personaje</button>
            </form>
        </div>
    )
}
