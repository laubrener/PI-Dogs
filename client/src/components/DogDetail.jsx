import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import styles from './DogDetail.module.css';

export default function DogDetail(props){
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log(props);

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch]);

    const myDog = useSelector((state) => state.detail);

    return(
        <div >
            <Link to='/home'><button className="btn">Go back</button></Link>
            {
                myDog.length?
                <div className={styles.container}>
                    <div className={styles.detail}>
                        <img src={myDog[0].image} alt="img not found" width='400px' height='400px'/>
                        <h1>{myDog[0].name}</h1>
                        <h4>Height: {myDog[0].heightMin} - {myDog[0].heightMax}</h4>
                        <h4>Weight: {myDog[0].weightMin} - {myDog[0].weightMax}</h4>
                        <h4>Life span: {myDog[0].life_span}</h4>
                        <p>Temperaments: {myDog[0].createdInDb? 
                            myDog[0].temperaments.map(el => el.name + (' ')) : 
                            myDog[0].temperament? 
                                myDog[0].temperament + ' ' : 
                                " None"
                        }</p>
                    </div>
                </div>
                : <p className="loading">Loading...</p>
            }
            
        </div>
    )
}

// Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida