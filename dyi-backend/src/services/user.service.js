const knex = require('../database/knex');

class UserService{
    constructor(){
        this.users = knex('users');
    }

    //Define methods for accessing the database

    async createUser(username, password, email){
        const user = {username, password, email};
        return this.users.insert(user);
    }
}

module.exports = UserService;