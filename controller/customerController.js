const Customer = require('../models/customerModel');

exports.createCustomer = async(req,res)=>{
    try {
        const userCustom = new Customer({
            customername:req.body.customername
        });

        const creaCustomer = await userCustom.save();
        res.status(200).json({
            success:true,
            data:creaCustomer,
            message:'Customer is created'
        });

    } catch (error) {
        res.status(500).json({
            success:true,
            data:error,
            message:'Error in creating customer'
        });
    }
};

