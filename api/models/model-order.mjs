import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    product : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'products' },
    user : { type : mongoose.Schema.Types.ObjectId, required: true , ref : 'users' },
    quantity : { type : Number, required: false, default : 1 },
    created : { type : Date, required : true }
})

export default mongoose.model('orders', setSchema);