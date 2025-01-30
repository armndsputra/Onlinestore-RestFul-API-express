import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    user : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'users'},
    product : { type : String, required: true },
    price : {type : Number, required: true},
    stock : {type : Number, required: true},
    category : {type : String, required : true},
    desc : {type : String, required: false},
    path : {type : String, require : true},
    created : {type : Date, required : true},
})

export default mongoose.model('products', setSchema);