import React from "react"

export default function Card({name, image, temperament, weightMin, weightMax}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt="img not found" width='200px' height='200px'/>
            <h4>{temperament}</h4>
            <h5>{weightMin} - {weightMax}</h5>
        </div>
    )
};