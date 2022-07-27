const mongoose =  require("mongoose")

const userSchema = new mongoose.Schema({
    mailId: String,
    password:String,
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel;