const MemberService = require('../services/member.service');
const ApiError = require('../api-error');

//Create and save a new Member

/*exports.createUser =(req, res) => {
    return res.send({message:'create user'})
};
*/

exports.createUser = async(req, res, next) => {
    if(!req.body?.username){
        return next(new ApiError(400, 'Tên đăng nhập không được trống!'));
    }try{
        const memberService = new MemberService();
        const member = await memberService.createUser(req.body);
        return res.send(member);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'Đã có lỗi khi tạo thành viên!')
        );
    }
};