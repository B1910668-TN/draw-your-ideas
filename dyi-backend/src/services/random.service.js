const knex = require('../database/knex');

class RandomService{
    constructor(){
        this.plants = knex('plants');
        this.animals = knex('animals');
        this.interiors = knex('interiors');
    }

    async randomPlant(type, quantity){
        return await this.plants
            .select('*')
            .where('type', type)
            .orderByRaw('RAND()')
            .limit(quantity);
    }

    async randomInterior(type, quantity){
        return await this.interiors
            .select('*')
            .where('type', type)
            .orderByRaw('RAND()')
            .limit(quantity);
    }

    async randomAnimal(type, quantity){
        return await this.animals
            .select('*')
            .where('type', type)
            .orderByRaw('RAND()')
            .limit(quantity);
    }
}

module.exports = RandomService;