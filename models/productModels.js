const { string } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema
const productSchema  = new Schema({
    productname:{
        type: String
    },
    productprice:{
        type:Number
    },
    productdetails:{
        type:String
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'category'

    }
},{
    timestamps:true
})

const product = mongoose.model('product', productSchema);

module.exports = product