import React from "react";
import { Link } from "react-router-dom";
//importo los hooks que voy a usar de React
import { useState, useEffect } from "react";
//importo los hooks de React redux 
import { useDispatch, useSelector } from "react-redux";
//importo las acciones que me interesa usar en este componente
import { filterCreated, getDogs, getTemperaments, filterDogByTemp, orderByName, orderByWeight } from "../actions";
//importo los componentes que voy a utilizar
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs); //traeme en esta constante todo lo que esta en el estado de dogs
    const allTemperaments = useSelector((state) => state.temperaments);
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1); //guarde en un estado local la pagina actual que es 1
    const [dogsPerPage, setDogsPerPage] = useState(8); //guarde cuantos perros quiero por pagina
    const indexOfLastDog = currentPage * dogsPerPage; // 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; //0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); //los perros que van a estar en la pagina actual

    const pagination = (pageNumber) => { //me va a ayudar al renderizado
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getDogs());
    },[dispatch]); //para que no se haga un loop infinito

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    };

    function handleWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    };

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
    };

    function handleFilterTemps(e){
        dispatch(filterDogByTemp(e.target.value));
    };

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    };

    console.log(allDogs);
    console.log(allTemperaments);

    return (
        <div>
            <Link to='/dog'>Create new breed</Link>
            <h1>Dog App</h1>
            <button onClick={(e) => {handleClick(e)}}>Reload breeds</button>
            <div>
                <select onChange={e => {handleSort(e)}}>
                    <option value="asc">Ascendent</option>
                    <option value="des">Descendent</option>
                </select>
                <select onChange={e => {handleWeight(e)}}>
                    <option value="min">Lower weight</option>
                    <option value="max">Higher weight</option>
                </select>
                <select onChange={e => {handleFilterCreated(e)}}>
                    <option value="All">All</option>
                    <option value="api">Existent</option>
                    <option value="created">Created</option>
                </select>
                <select onChange={e => {handleFilterTemps(e)}}>
                    { allTemperaments?.map(el => {
                        return(
                            <option value={el.name}>{el.name}</option>
                        )}
                    )}
                </select>
                <div>
                    <Pagination
                            dogsPerPage={dogsPerPage}
                            allDogs={allDogs.length}
                            pagination={pagination}
                            />
                </div>
                <SearchBar></SearchBar>
            {
                currentDogs?.map(el => {
                    return (
                        <div>
                            <Link to={'/home/'+ el.id}>
                                <Card name={el.name} image={el.image} temperament={currentDogs[0].createdInDb? currentDogs[0].temperaments.map(el => el.name + (' ')) : currentDogs[0].temperament} weightMin={el.weightMin} weightMax={el.weightMax} key={el.id}></Card>
                            </Link>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}