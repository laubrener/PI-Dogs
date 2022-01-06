const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db');

require('dotenv').config();
const { API_KEY } = process.env;

const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            id: el.id,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            image: el.image.url,
            temperament: el.temperament,
        };
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Dog.findAll({ 
        include:{ //traeme todos los datos e incluime el modelo temperaments
            model: Temperament,
            attributes: ['name'], //incluime el atributo name del modelo
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/', async (req, res, next) => { 
    const { name } = req.query;
    let allDogs = await getAllDogs();
    try {
        if (name) {
            let dogName = await allDogs.filter(el => el.name.toLowerCase().includes(name.toLocaleLowerCase()));
            dogName.length ?
            res.send(dogName) :
            res.status(404).send('No se encuentra esa raza');
        }else{
            res.send(allDogs);
        }
    } catch(error) {
       next(error); 
    }
});

router.get('/:id', async (req, res, next) => { 
    try{
        const { id } = req.params;
        const allDogs = await getAllDogs();

        if (id){
            let dogId = await allDogs.filter(el => el.id.toString() === id.toString());
            if(dogId.length) {
                res.json(dogId);
            } else {
                res.status(404).send('No existe una raza con ese id');
            }
        }
    } catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next) => { //funciona pero no me pone los temperamentos
    try {
        const { name, //traigo los parametros pasados en el body
            height,
            weight,
            life_span,
            image,
            createdInDb,
            temperament
        } = req.body;

        const dogCreated = await Dog.create({ //creo un perro con esos parametros
            name,
            height,
            weight,
            life_span,
            image,
            createdInDb
            //no le paso el temperamento porque ya hice la relacion
        });

        const temperamentDb = await Temperament.findAll({ //busco el temperamento que esta en el modelo de temperamentos, ya guardado en db
            where: { name: temperament} //traeme los temperamentos que coincidan con el modelo que le estoy pasando por body
        });
        dogCreated.addTemperament(temperamentDb); //al perro creado agregale el temperamento
        res.status(201).send('Raza creada con éxito');
    } catch (error) {
        next(error);
    }
});

module.exports = router;