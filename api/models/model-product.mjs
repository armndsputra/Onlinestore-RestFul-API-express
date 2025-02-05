import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    product : { type : String, required: true },
    price : { type : Number, required: true },
    stock : { type : Number, required: true },
    category : { type : String, required : true },
    desc : { type : String, required: false },
    path : { type : String, require : true },
    vendor : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'users' },
    created : { type : Date, required : true },
})

export default mongoose.model('products', setSchema);