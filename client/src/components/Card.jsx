import React from "react"
import styles from './Card.module.css'

export default function Card({name, image, temperament, weightMin, weightMax}){
    return(
        <div className={styles.card}>
            <h3>{name}</h3>
            <h4>{temperament}</h4>
            <p>
                <span>Weight: </span>
                <span>{weightMin} - {weightMax}</span>
            </p>
            <img src={image} alt="img not found" />
        </div>
    )
};