const InteriorService = require('../services/interior.service');
const ApiError = require('../api-error');

// Create and save a new interior
/*exports.createInterior = (req, res) =>{
    return res.send({message: 'Thêm nội thất'});
};
*/
exports.createInterior = async(req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, 'Tên không được trống!'));
    }try{
        const interiorService = new InteriorService();
        const interior = await interiorService.createInterior(req.body);
        return res.send(interior);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'Đã có lỗi xảy ra khi cố gắng tạo nội thất!')
        );
    }
};


//Retrieve all interiors from the database
/*exports.findAllInterior = (req, res) => {
    return res.send({message: 'Tìm toàn bộ nội thất'});
};
*/
exports.findAllInterior = async (req, res, next) => {
    let interiors = [];

    try{
        const interiorService = new InteriorService();
        const {name} = req.query;
        if(name){
            interiors = await interiorService.findByName(name);
        }else{
            interiors = await interiorService.all();
        }
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, "Đã có lỗi xảy ra khi truy xuất nội thất")
        );
    }

    return res.send(interiors);
}

// Find one interior id
/*exports.findOneInterior = (req, res) =>{
    return res.send({message: 'Tìm một nội thất'});
};*/
exports.findOneInterior = async(req, res, next) => {
    try{
        const interiorService = new InteriorService();
        const interior = await interiorService.findById(req.params.id);
        if(!interior){
            return next(new ApiError(404, 'Không tìm thấy nội thất!'));
        }
        return res.send(interior);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, `Lỗi xảy ra khi cố truy xuất nội thất với id=${req.params.id}`)
        );
    }
};

//Update a interior by the id in the request
/*exports.updateInterior = (req, res) => {
    return res.send({message: 'Chỉnh sửa nội thất'});
};
*/
exports.updateInterior = async(req, res, next) => {
    if(Object.keys(req.body).length == 0){
        return next(new ApiError(400, 'Phải có thay đổi!'));
    }
    try{
        const interiorService = new InteriorService();
        const updated = await interiorService.updateInterior(req.params.id, req.body);
        if(!updated){
            return next(new ApiError(404, 'Không tìm thấy nội thất!'));
        }
        return res.send({message: 'Thực vật đã được chỉnh sửa thành công!'});
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500,`Đã có lỗi xảy ra khi cập nhật nội thất có id=${req.params.id}`)
        );
    }
};

// Delete a interior with the specified id in the request
/*exports.deleteInterior = (req, res) => {
    return res.send({message: 'Xoá nội thất'});
};
*/
exports.deleteInterior = async(req, res, next) => {
    try{
        const interiorService = new InteriorService();
        const deleted = await interiorService.deleleInterior(req.params.id);
        if(!deleted){
            return next(new ApiError(404, 'Thực vật không tìm thấy!'));
        }
        return res.send({message: 'Thực vật được xoá thành công!'});
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500,`Đã có lỗi xảy ra khi xoá nội thất có id=${req.params.id}`)
        );
    }
};


//Random Interiors
exports.randomInterior = async (req, res, next) => {
    let interiors = [];

    try{
        const interiorService = new InteriorService();
        const {type} = req.query;
        const {quality} = req.query;
        if(type && quality){
            interiors = await interiorService.randomInterior(type,quality);
        }
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, "Đã có lỗi xảy ra khi truy xuất nội thất")
        );
    }

    return res.send(interiors);
}
