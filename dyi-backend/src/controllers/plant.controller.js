const PlantService = require('../services/plant.service');
const ApiError = require('../api-error');

// Create and save a new plant
/*exports.createPlant = (req, res) =>{
    return res.send({message: 'Thêm thực vật'});
};
*/
exports.createPlant = async(req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, 'Tên không được trống!'));
    }try{
        const plantService = new PlantService();
        const plant = await plantService.createPlant(req.body);
        return res.send(plant);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'Đã có lỗi xảy ra khi cố gắng tạo thực vật!')
        );
    }
};


//Retrieve all plants from the database
/*exports.findAllPlant = (req, res) => {
    return res.send({message: 'Tìm toàn bộ thực vật'});
};
*/
exports.findAllPlant = async (req, res, next) => {
    let plants = [];

    try{
        const plantService = new PlantService();
        const {name} = req.query;
        if(name){
            plants = await plantService.findByName(name);
        }else{
            plants = await plantService.all();
        }
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, "Đã có lỗi xảy ra khi truy xuất thực vật")
        );
    }

    return res.send(plants);
}

// Find one plant id
/*exports.findOnePlant = (req, res) =>{
    return res.send({message: 'Tìm một thực vật'});
};*/
exports.findOnePlant = async(req, res, next) => {
    try{
        const plantService = new PlantService();
        const plant = await plantService.findById(req.params.id);
        if(!plant){
            return next(new ApiError(404, 'Không tìm thấy thực vật!'));
        }
        return res.send(plant);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, `Lỗi xảy ra khi cố truy xuất thực vật với id=${req.params.id}`)
        );
    }
};

//Update a plant by the id in the request
/*exports.updatePlant = (req, res) => {
    return res.send({message: 'Chỉnh sửa thực vật'});
};
*/
exports.updatePlant = async(req, res, next) => {
    if(Object.keys(req.body).length == 0){
        return next(new ApiError(400, 'Phải có thay đổi!'));
    }
    try{
        const plantService = new PlantService();
        const updated = await plantService.updatePlant(req.params.id, req.body);
        if(!updated){
            return next(new ApiError(404, 'Không tìm thấy thực vật!'));
        }
        return res.send({message: 'Thực vật đã được chỉnh sửa thành công!'});
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500,`Đã có lỗi xảy ra khi cập nhật thực vật có id=${req.params.id}`)
        );
    }
};

// Delete a plant with the specified id in the request
/*exports.deletePlant = (req, res) => {
    return res.send({message: 'Xoá thực vật'});
};
*/
exports.deletePlant = async(req, res, next) => {
    try{
        const plantService = new PlantService();
        const deleted = await plantService.delelePlant(req.params.id);
        if(!deleted){
            return next(new ApiError(404, 'Thực vật không tìm thấy!'));
        }
        return res.send({message: 'Thực vật được xoá thành công!'});
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500,`Đã có lỗi xảy ra khi xoá thực vật có id=${req.params.id}`)
        );
    }
};

exports.randomPlant = async(req, res) => {
    return res.send({message: 'Lấy ngẫu nhiên thực vật'});
};
