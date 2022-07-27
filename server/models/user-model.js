const mongoose =  require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    designation:String,
    company: String,
    industry : String,
    email: String,
    phoneNumber: String,
    country: String
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel;