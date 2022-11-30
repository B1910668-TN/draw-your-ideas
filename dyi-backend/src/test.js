//const { createPlant } = require('../src/controllers/plant.controller');
const knex = require('../src/database/knex');

class PlantService{
    constructor(){
        this.plants = knex('plants');
    }
    //Define methods for accessing the database
}

const test = {
    name: "test",
    type: "test"
}

async function createPlant(plant){
    const [id] = await this.plants.insert(plant);
    return {id, ...plant};
}

