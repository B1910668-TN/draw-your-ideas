const AnimalService = require('../services/animal.service');
const ApiError = require('../api-error');

// Create and save a new animal
/*exports.createAnimal = (req, res) =>{
    return res.send({message: 'Thêm động vật'});
};
*/
exports.createAnimal = async(req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, 'Tên không được trống!'));
    }try{
        const animalService = new AnimalService();
        const animal = await animalService.createAnimal(req.body);
        return res.send(animal);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'Đã có lỗi xảy ra khi cố gắng tạo động vật!')
        );
    }
};


//Retrieve all animals from the database
/*exports.findAllAnimal = (req, res) => {
    return res.send({message: 'Tìm toàn bộ động vật'});
};
*/
exports.findAllAnimal = async (req, res, next) => {
    let animals = [];

    try{
        const animalService = new AnimalService();
        const {name} = req.query;
        if(name){
            animals = await animalService.findByName(name);
        }else{
            animals = await animalService.all();
        }
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, "Đã có lỗi xảy ra khi truy xuất động vật")
        );
    }

    return res.send(animals);
}

// Find one animal id
/*exports.findOneAnimal = (req, res) =>{
    return res.send({message: 'Tìm một động vật'});
};*/
exports.findOneAnimal = async(req, res, next) => {
    try{
        const animalService = new AnimalService();
        const animal = await animalService.findById(req.params.id);
        if(!animal){
            return next(new ApiError(404, 'Không tìm thấy động vật!'));
        }
        return res.send(animal);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, `Lỗi xảy ra khi cố truy xuất động vật với id=${req.params.id}`)
        );
    }
};

//Update a animal by the id in the request
/*exports.updateAnimal = (req, res) => {
    return res.send({message: 'Chỉnh sửa động vật'});
};
*/
exports.updateAnimal = async(req, res, next) => {
    if(Object.keys(req.body).length == 0){
        return next(new ApiError(400, 'Phải có thay đổi!'));
    }
    try{
        const animalService = new AnimalService();
        const updated = await animalService.updateAnimal(req.params.id, req.body);
        if(!updated){
            return next(new ApiError(404, 'Không tìm thấy động vật!'));
        }
        return res.send({message: 'Thực vật đã được chỉnh sửa thành công!'});
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500,`Đã có lỗi xảy ra khi cập nhật động vật có id=${req.params.id}`)
        );
    }
};

// Delete a animal with the specified id in the request
/*exports.deleteAnimal = (req, res) => {
    return res.send({message: 'Xoá động vật'});
};
*/
exports.deleteAnimal = async(req, res, next) => {
    try{
        const animalService = new AnimalService();
        const deleted = await animalService.deleleAnimal(req.params.id);
        if(!deleted){
            return next(new ApiError(404, 'Thực vật không tìm thấy!'));
        }
        return res.send({message: 'Thực vật được xoá thành công!'});
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500,`Đã có lỗi xảy ra khi xoá động vật có id=${req.params.id}`)
        );
    }
};


//Random Animals
exports.randomAnimal = async (req, res, next) => {
    let animals = [];

    try{
        const animalService = new AnimalService();
        const {type} = req.query;
        const {quality} = req.query;
        if(type && quality){
            animals = await animalService.randomAnimal(type,quality);
        }
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, "Đã có lỗi xảy ra khi truy xuất động vật")
        );
    }

    return res.send(animals);
}
