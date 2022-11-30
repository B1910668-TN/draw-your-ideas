const knex = require('../database/knex');

class AnimalService{
    constructor(){
        this.animals = knex('animals');
    }

    //Define methods for accessing the database
    
    #getAnimal(payload){
        const animal = {...payload};
        const animalProperties = [
            "name", 
            "mean", 
            "story", 
            "type", 
            "author",
            "quantity"
        ];
        //Remove non-animal properties
        Object.keys(animal).forEach(function(key){
            if(animalProperties.indexOf(key) == -1){
                delete animal[key];
            }
        }); 
        return animal;
    }

    async createAnimal(payload){
        const animal = this.#getAnimal(payload);
        const [id] = await this.animals.insert(animal);
        return {id, ...animal};
    }

    
    async all(){
        return await this.animals.select('*');
    }

    async findByName(name){
        return await this.animals
            .where('name', 'like', `%${name}%`)
            .select('*');
    }

    async findById(id){
        return await this.animals.where('id', id).select('*').first();
    }

    async updateAnimal(id, payload){
        const update = this.#getAnimal(payload);
        return await this.animals.where('id', id).update(update);
    }

    async deleleAnimal(id){
        return await this.animals.where('id', id).del();
    }

    async randomAnimal(type, quantity){
        return await this.animals
            .select('*')
            .where('type', type)
            .orderByRaw('RAND()')
            .limit(quantity);
    }
}
module.exports = AnimalService;