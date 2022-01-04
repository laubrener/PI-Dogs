const { Router } = require('express');

const dogRoute = require('./Dog');
const temperamentRoute = require('./Temperament');


const router = Router();

// Configurar los routers
router.use('/dogs', dogRoute);
router.use('/temperaments', temperamentRoute);


module.exports = router;
