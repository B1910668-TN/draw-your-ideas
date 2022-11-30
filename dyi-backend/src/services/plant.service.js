const knex = require('../database/knex');

class PlantService{
    constructor(){
        this.plants = knex('plants');
    }

    //Define methods for accessing the database
    
    #getPlant(payload){
        const plant = {...payload};
        const plantProperties = [
            "name", 
            "mean", 
            "story", 
            "type", 
            "author",
            "quantity"
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
        return await this.plants.select('*').limit(5);
    }

    async findByName(name){
        return await this.plants
            .where('name', 'like', `%${name}%`)
            .select('*');
    }

    async findById(id){
        return await this.plants.where('id', id).select('*').first();
    }

    async updatePlant(id, payload){
        const update = this.#getPlant(payload);
        return await this.plants.where('id', id).update(update);
    }

    async delelePlant(id){
        return await this.plants.where('id', id).del();
    }

    async randomPlant(type, quantity){
        return await this.plants
            .select('*')
            .where('type', type)
            .orderByRaw('RAND()')
            .limit(quantity);
    }
}
module.exports = PlantService;