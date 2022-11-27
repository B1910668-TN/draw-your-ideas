const express = require('express');
const cors = require('cors');
const ApiError = require('./api-error');

const app = express();

const plantController = require('./controllers/plant.controller');
const animalController = require('./controllers/animal.controller');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Welcome to DYI'});
});

// Thuc Vat

app.route('/api/plants')
    .get(plantController.findAllPlant)
    .post(plantController.createPlant);

app.route('/api/plants/randomplants')
    .get(plantController.randomPlant);

app.route('/api/plants/:id')
    .get(plantController.findOnePlant)
    .put(plantController.updatePlant)
    .delete(plantController.deletePlant);

// Dong vat

app.route('/api/animals')
    .get(animalController.findAllAnimal)
    .post(animalController.createAnimal);

app.route('/api/animals.randomanimals')
    .get(animalController.randomAnimal);

app.route('api/animals/:id')
    .get(animalController.findOneAnimal)
    .put(animalController.updateAnimal)
    .delete(animalController.deleteAnimal);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Không tìm được trang!'));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message:error.message || 'Internal Server Error',
    });
});

module.exports = app;