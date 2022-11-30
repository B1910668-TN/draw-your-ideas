const knex = require('../database/knex');

class InteriorService{
    constructor(){
        this.interiors = knex('interiors');
    }

    //Define methods for accessing the database
    
    #getInterior(payload){
        const interior = {...payload};
        const interiorProperties = [
            "name", 
            "mean", 
            "story", 
            "type", 
            "author",
            "quantity"
        ];
        //Remove non-interior properties
        Object.keys(interior).forEach(function(key){
            if(interiorProperties.indexOf(key) == -1){
                delete interior[key];
            }
        }); 
        return interior;
    }

    async createInterior(payload){
        const interior = this.#getInterior(payload);
        const [id] = await this.interiors.insert(interior);
        return {id, ...interior};
    }

    
    async all(){
        return await this.interiors.select('*');
    }

    async findByName(name){
        return await this.interiors
            .where('name', 'like', `%${name}%`)
            .select('*');
    }

    async findById(id){
        return await this.interiors.where('id', id).select('*').first();
    }

    async updateInterior(id, payload){
        const update = this.#getInterior(payload);
        return await this.interiors.where('id', id).update(update);
    }

    async deleleInterior(id){
        return await this.interiors.where('id', id).del();
    }

    async randomInterior(type, quantity){
        return await this.interiors
            .select('*')
            .where('type', type)
            .orderByRaw('RAND()')
            .limit(quantity);
    }
}
module.exports = InteriorService;