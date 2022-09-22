const Joi = require('joi');

const productSchema = Joi.object({
    productname:Joi.string().empty().required().min(2).trim().messages({
        'string.empty': 'product name must be required',
        'string.min': 'Product name must atleast length of 2',
        'any.required': 'Product name must be required'
    }),
    productprice:Joi.number().empty().required().min(1).messages({
        'string.empty': 'Product price must be required',
        'string.min': 'Product price atleast length of 1',
        'any.required': 'Product price must be required'
    }),
    productdetails:Joi.string().required().min(2).message({
        'string.min': 'Product details length at lesat 2 ',
        'any.required':'Product details must be required'
    })

})



module.exports = productSchema;