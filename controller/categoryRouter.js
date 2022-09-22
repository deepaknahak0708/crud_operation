const Category = require('../models/categoryModel');


exports.createData = async (req, res) => {
    try {
        const user = new Category();
        user.categoryname = req.body.categoryname

        const createUser = await user.save();
        res.status(200).json({
            success: true,
            data: createUser,
            message: 'Category Data Created'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Error in creating Category Data '
        })

    }
}

exports.getCategoryData = async (req, res) => {
    try {
        const getData = await Category.find();
        res.status(200).json({
            success: true,
            data: getData,
            message: 'Successfully read category data'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Errror in reading a Data'
        })
    }
}


exports.getCategoryDataById = async (req, res) => {
    try {
        const _id = req.params.id;
        const getDataId = await Category.findById(_id);
        res.status(200).json({
            success: true,
            data: getDataId,
            message: 'Succesfully read data by Id'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Error in reading a data by id'
        })
    }
}

exports.updateCategoryData = async (req, res) => {
    try {
        const _id = req.params.id;
        const updateData = await Category.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.status(200).json({
            success: true,
            data: updateData,
            message: 'Data updated Successfilly'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Error in updating a data'
        })
    }
}


exports.deleteCategoryData = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteData = await Category.findByIdAndDelete(_id);
        res.status(200).json({
            success: true,
            data: deleteData,
            message: 'Data deleted Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            data:error,
            message:'Error in deleting a data'
        })
    }
}