exports.createAnimal = (req, res) =>{
    return res.send({message: 'Thêm động vật'});
};

exports.findAllAnimal = (req, res) => {
    return res.send({message: 'Tìm toàn bộ động vật'});
};

exports.findOneAnimal = (req, res) =>{
    return res.send({message: 'Tìm một động vật'});
};

exports.updateAnimal = (req, res) => {
    return res.send({message: 'Chỉnh sửa động vật'});
};

exports.deleteAnimal = (req, res) => {
    return res.send({message: 'Xoá động vật'});
};

exports.randomAnimal = (req, res) => {
    return res.send({message: 'Lấy ngẫu nhiên động vật'});
};
