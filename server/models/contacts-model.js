const mongoose =  require("mongoose")

const contactSchema = new mongoose.Schema({
    name: String,
    designation:String,
    company:String,
    industry:String,
    email:String,
    phoneNumber:String,
    country:String
})

const contactModel = mongoose.model("contacts",contactSchema)

module.exports = contactModel;