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
            plants = await plantService.findByNam(name);
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

exports.findOnePlant = (req, res) =>{
    return res.send({message: 'Tìm một thực vật'});
};

exports.updatePlant = (req, res) => {
    return res.send({message: 'Chỉnh sửa thực vật'});
};

exports.deletePlant = (req, res) => {
    return res.send({message: 'Xoá thực vật'});
};

exports.randomPlant = (req, res) => {
    return res.send({message: 'Lấy ngẫu nhiên thực vật'});
};
