import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

class InteriorService{
    constructor(){
        this.baseUrl = `${url}/api/interiors`;
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

    async create(interior){
        return (await this.api.post(this.baseUrl, interior)).data;
    }

    async get(id){
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }

    async update(id, interior){
        return (await this.api.put(`${this.baseUrl}/${id}`, interior)).data;
    }

    async delete(id){
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}

export const interiorService = new InteriorService;