import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
    name : { type : String, required: true },
    email : { type : String, required : true,
        unique : true,
        match : /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password : { type : String, required : true },
    phone_number : { type : Number, required : true },
    address : { type : String, required : true},
    role : { type : String, required : true, default : 'customer'},
    gender : { type : String, required : false, default : 'none'},
    profile_picture : { type : String, required : false },
    created : { type : Date, required : true }
})

export default mongoose.model('users', setSchema);