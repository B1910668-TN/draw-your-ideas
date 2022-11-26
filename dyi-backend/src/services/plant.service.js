const knex = require('../database/knex');

class PlantService{
    constructor(){
        this.plants = knex('plants');
    }

    //Define methods for accessing the database

    #getPlant(payload){
        const plant = {...payload};
        const plantProperties = [
            "name", "mean", "story", "type"
        ];
        //Remove non-plant properties
        Object.keys(plant).forEach(function(key){
            if(plantProperties.indexOf(key) == -1){
                delete plant[key];
            }
        }); 
        return plant;
    }

    async createPlant(payload){
        const plant = this.#getPlant(payload);
        const [id] = await this.plants.insert(plant);
        return {id, ...plant};
    }

    async all(){
        return await this.plants.select('*');
    }

    async findByName(name){
        return await this.plants
            .where('name', 'like', `%${name}%`)
            .select('*');
    }
}



module.exports = PlantService;