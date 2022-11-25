const express = require('express');
const cors = require('cors');

const app = express();

const memberController = require('./controllers/member.controller');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Welcome to contact book application.'});
});

app.route('/api/members')
    .post(memberController.createUser);

module.exports = app;