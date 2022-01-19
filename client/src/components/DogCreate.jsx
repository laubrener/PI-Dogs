import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../actions";
import styles from './DogCreate.module.css';

function validate(input){
    let errors = {};
    //name
    if (!input.name) {
        errors.name = 'Name required';
    }
    //heightMin
    if(!input.heightMin) {
        errors.heightMin = 'Minimun height required';
    }else if (input.heightMin < 0 || input.heightMin > 100) {
        errors.heightMin = 'Number is invalid';
    }
    //heightMax
    if(!input.heightMax) {
        errors.heightMax = 'Maximum height required';
    }else if (input.heightMax < 0 || input.heightMax > 100) {
        errors.heightMax = 'Number is invalid';
    }
    //weightmin
    if(!input.weightMin) {
        errors.weightMin = 'Minimun weight required';
    }else if (input.weightMin < 0 || input.weightMin > 100) {
        errors.weightMin = 'Number is invalid';
    }
    //weightMax
    if(!input.weightMax) {
        errors.weightMax = 'Maximun weight required';
    }else if (input.weightMax < 0 || input.weightMax > 100) {
        errors.weightMax = 'Number is invalid';
    }
    return errors;
};

export default function DogCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});
 
    const [input, setInput] = useState({
        name:'',
        heightMin:'',
        heightMax:'',
        weightMin:'',
        weightMax:'',
        life_span:'',
        temperament:[]
    });

    function handleChange(e){
        setInput({
            ...input, //ademas de lo que tiene 
            [e.target.name]: e.target.value //agregale lo que el usuario pone
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
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
        alert('breed created successfully!');
        setInput({
            name:'',
            heightMin:'',
            heightMax:'',
            weightMin:'',
            weightMax:'',
            life_span:'',
            temperament:[]
        })
        navigate('/home');
    };

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== el)
        })
    };
    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    return(
        <div> <Link to='/home' ><button className="btn" style={{'margin-left':'77rem'}}>Go back</button></Link>
        <div className={styles.form}>
            <h1 className={styles.title}>My breed</h1>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div className={styles.input}>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={input.name}
                        name="name"
                        placeholder="Enter name"
                        onChange={(e) => {handleChange(e)}}  
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div className={styles.input}>
                    <label>Minimun height:</label>
                    <input 
                        type="number" 
                        value={input.heightMin}
                        name="heightMin" 
                        placeholder="Enter minimun height"
                        onChange={(e) => {handleChange(e)}} 
                    />
                    {errors.heightMin && (
                        <p className='error'>{errors.heightMin}</p>
                    )}
                </div>
                <div className={styles.input}>
                    <label>Maximum height:</label>
                    <input 
                        type="number" 
                        value={input.heightMax}
                        name="heightMax" 
                        placeholder="Enter maximum height"
                        onChange={(e) => {handleChange(e)}} 
                    />
                    {errors.heightMax && (
                        <p className='error'>{errors.heightMax}</p>
                    )}
                </div>
                <div className={styles.input}>
                    <label>Minimun weight:</label>
                    <input 
                        type="number" 
                        value={input.weightMin}
                        name="weightMin"  
                        placeholder="Enter minimun weight"
                        onChange={(e) => {handleChange(e)}}
                    />
                    {errors.weightMin && (
                        <p className='error'>{errors.weightMin}</p>
                    )}
                </div >
                <div className={styles.input}>
                    <label>Maximum weight:</label>
                    <input 
                        type="number" 
                        value={input.weightMax}
                        name="weightMax" 
                        placeholder="Enter maximum weight" 
                        onChange={(e) => {handleChange(e)}}
                    />
                    {errors.weightMax && (
                        <p className='error'>{errors.weightMax}</p>
                    )}
                </div>
                <div className={styles.input}>
                    <label>Life span:</label>
                    <input 
                        type="text" 
                        value={input.life_span}
                        name="life_span" 
                        placeholder="Enter life span"
                        onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                <div className={styles.input}>
                    <label>Image:</label>
                    <input 
                        type="text" 
                        value={input.image}
                        name="image" 
                        placeholder="Enter url"
                        onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                <select className={styles.select} onChange={(e) => {handleSelect(e)}} >
                    { temperaments?.map((el) => (
                        <option value={el.name} key={el.id}>{el.name}</option>
                    ))}
                </select>

                <button className="btn" type="submit">Create breed</button>
                
            </form>
            {input.temperament.map(el => 
                <div className={styles.divTemp}key={el}>
                    <p>{el}</p>
                    <button className='xButton' onClick={() => handleDelete(el)}>x</button>
                </div>
                )}
        </div>
        </div>
    )
}
