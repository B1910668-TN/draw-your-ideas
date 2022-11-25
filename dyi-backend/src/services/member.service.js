const knex = require('../database/knex');
class MemberService {
    constructor() {
        this.accounts = knex('accounts');
    }
    // Define methods for accessing the database

    #getMember(payload){
        const member = {...payload};
        const memberProperties = [
            "username", "password", "email"
        ];
        //Remove non-contact properties
        Object.keys(member).forEach(function(key){
            if(memberProperties.indexOf(key) == -1){
                delete member[key];
            }
        });
        return member;
    }

    async createUser(payload){
        const member = this.#getMember(payload);
        const [id] = await this.accounts.insert(member);
        return {id, ...member};
    }
}
module.exports = MemberService;