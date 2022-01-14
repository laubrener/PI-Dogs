import React from "react";
import styles from './Pagination.module.css';

export default function Pagination({dogsPerPage, allDogs, pagination}){
    let pageNumbers = [];

    for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return(
        <div className={styles.pagination} >
            {
                pageNumbers?.map(number => {
                    return(
                        <button onClick={() => pagination(number)} className={styles.number} key={number}>
                            {number}
                        </button>
                    )
                })
            }
        </div>
    );
};