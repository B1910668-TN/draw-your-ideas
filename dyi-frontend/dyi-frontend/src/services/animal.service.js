import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

class AnimalService{
    constructor(){
        this.baseUrl = `${url}/api/animals`;
        this.api = axios.create({
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
    }

    async getMany(){
        return (await this.api.get(this.baseUrl)).data;
    }

    async create(animal){
        return (await this.api.post(this.baseUrl, animal)).data;
    }

    async get(id){
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }

    async update(id, animal){
        return (await this.api.put(`${this.baseUrl}/${id}`, animal)).data;
    }

    async delete(id){
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}

export const animalService = new AnimalService;