const { Router } = require('express');
const axios = require('axios');
const { Temperament } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const router = Router();



router.get('/', async (req, res, next) => { 
    try {
        const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const temperaments = temperamentsApi.data.map(el => el.temperament); //trae el arreglo de temperamentos
        const tempEach = temperaments.join(', ').split(', ');
        tempEach.forEach(el => {
            Temperament.findOrCreate({ //guarda los temperamentos en la bd y si ya existen no hace nada
                where: { name: el }
            })
        })
        const alltemperaments = await Temperament.findAll();
        //console.log(tempEach);
        res.send(alltemperaments); //muestra todas los temperamentos
    } catch(error){
        next(error);
    }
});

module.exports = router;