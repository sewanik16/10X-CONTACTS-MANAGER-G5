const express = require("express")
const mongoose = require("mongoose")

const userModel = require("./models/user-model")

const app = express()
app.listen(5000,()=>{
    console.log("server running at port : 5000")
})

app.use(express.json())
const DB = "mongodb+srv://admin:admin1234@contactsmanager.p83t7et.mongodb.net/contactsManager?retryWrites=true&w=majority"
mongoose.connect(DB).then(()=>{
    console.log("connected to database.....")
})




