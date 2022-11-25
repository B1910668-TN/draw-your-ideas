const express = require('express');
const cors = require('cors');
const ApiError = require('./api-error');

const app = express();

const memberController = require('./controllers/member.controller');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Welcome to contact book application.'});
});

app.route('/api/members')
    .post(memberController.createUser);

//Handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, 'Không tìm thấy trang!'));
});

//Define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
    });
});
module.exports = app;