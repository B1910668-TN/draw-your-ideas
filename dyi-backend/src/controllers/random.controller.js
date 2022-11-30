const RandomService = require('../services/random.service');
const ApiError = require('../api-error');

exports.randomAll = async (req, res, next) =>{
    let objs = [];
    
    try{
        const randomService = new RandomService();
        const {type} = req.query;
        const {quality} = req.query;
        const {test} = req.query;
        
        if(quality < 0 || quality > 10){
            return next(new ApiError(400, 'Số lượng phải trong khoảng từ 1 -> 10'));
        }else{
            if(test != 'khong'){
                switch(test){
                    case 'thucvat':
                        objs = await randomService.randomPlant(type,quality);
                        break;
                    case 'dongvat':
                        objs = await randomService.randomAnimal(type,quality);
                        break;
                    case 'noithat':
                        objs = await randomService.randomInterior(type,quality);
                        break;
                }
            }else{
                return next(new ApiError(400, 'Vui lòng chọn mục cần random'));
            }
        }
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, "Đã có lỗi xảy ra khi truy xuất thực vật")
        );
    }

    return res.send(objs);
}