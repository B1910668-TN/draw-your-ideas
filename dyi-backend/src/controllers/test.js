const string = "nga123";

const crypto = require('crypto');

const hash = crypto.createHash('md5').update(string).digest('hex');

console.log(hash);
