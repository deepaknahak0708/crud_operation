const Product = require('../models/productModels');


exports.createProduct = async (req, res) => {
    try {
        const product = new Product();
        product.productname = req.body.productname
        product.productprice = req.body.productprice
        product.productdetails = req.body.productdetails

        const productData = await product.save();
        res.status(200).json({
            success: true,
            data: productData,
            message: 'Product is created Successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Enable to create a product'
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const getProduct = await Product.find().populate("categoryId");
        res.status(200).json({
            success: true,
            data: getProduct,
            message: 'All product ready successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Error in reading a products'
        })
    }
}


exports.getProductsByid = async (req, res) => {
    try {
        const _id = req.params.id;
        const getProductId = await Product.findById(_id);
        res.status(200).json({
            success: true,
            data: getProductId,
            message: 'Successfully read all the product data'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Enable to read products by Id'
        })
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const _id = req.params.id;
        const updateProduct = await Product.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.status(200).json({
            sucess: true,
            data: updateProduct,
            message: 'Product updated successfuly'
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            data: error,
            message: 'Error in updating Products'
        })
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(_id);
        res.status(200).json({
            sucess: true,
            data: deleteProduct,
            message: 'Products deleted Sucessfully'
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            data: error,
            message: 'Enable to delete Products'
        })
    }
}


exports.addCategoryId = async (req, res) => {
    try {
        const productId = req.params.id;
        const categoryId = req.params.categoryId;

        const productData = await Product.findById(productId)
        if (!productData) {
            res.status(422).json({
                success: true,
                message: 'Invalid Data'
            })
        }

        productData.categoryId = categoryId;

        await productData.save();
        res.status(200).json({
            sucess: true,
            message: 'Category Added'
        })
    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:error.message
        })
    }

}