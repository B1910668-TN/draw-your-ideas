import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

class PlantService{
    constructor(){
        this.baseUrl = `${url}/api/plants`;
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

    async create(plant){
        return (await this.api.post(this.baseUrl, plant)).data;
    }

    async get(id){
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }

    async update(id, plant){
        return (await this.api.put(`${this.baseUrl}/${id}`, plant)).data;
    }

    async delete(id){
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}

export const plantService = new PlantService;