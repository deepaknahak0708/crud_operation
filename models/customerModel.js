const mongoose = require('mongoose');

const Schema = mongoose.Schema
const customerSchema = new Schema({
    customername:{
        type:String
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'product'

    }
})


const customer = mongoose.model('customer', customerSchema);
module.exports = customer