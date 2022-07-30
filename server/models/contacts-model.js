const mongoose =  require("mongoose")
const usermodel = require("./user-model")
const contactSchema = new mongoose.Schema({
    contact: [{
        name: {
          type: String,
          required: true,
        },
        designation: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        industry: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
          minLength: 10,
          maxLength:10
        },
        country: {
          type: String,
          required: true,
        },
      }],
      userId: { type: mongoose.Schema.Types.ObjectId, ref: usermodel }
})

const contactModel = mongoose.model("contacts",contactSchema)

module.exports = contactModel;