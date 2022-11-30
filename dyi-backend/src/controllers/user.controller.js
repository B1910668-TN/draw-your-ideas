const UserService = require('../services/user.service');
const crypto = require('crypto');
const ApiError = require('../api-error');

exports.createUser = async(req, res, next) => {
    if(!req.body?.username) {
        return next(new ApiError(400, 'Tên không được trống!'));
    }try{
        const userService = new UserService();
        const password = crypto.createHash('md5').update(req.body.password).digest('hex');
        const user = await userService.createUser(req.body.username, password ,req.body.email);
        return res.send(user);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'Đã có lỗi xảy ra khi cố gắng tạo thực vật!')
        );
    }
};
