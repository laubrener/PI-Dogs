import React from "react";

export default function Pagination({dogsPerPage, allDogs, pagination}){
    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className="pagination">
            {
                pageNumbers?.map(number => {
                    <button onClick={() => pagination(number)} className="number">{number}</button>
                })
            }
        </div>
    );
};