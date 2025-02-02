import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    productID : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'products' },
    customer : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'users' },
    vendor : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'users' },
    message : { type : String, required: false, },
    created : { type : Date, required : true }
})

export default mongoose.model('feedbacks', setSchema);