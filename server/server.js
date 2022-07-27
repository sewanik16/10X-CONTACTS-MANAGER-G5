const express = require("express")
const mongoose = require("mongoose")


const app = express()



const Connection_Url = "mongodb+srv://admin:admin1234@contactsmanager.p83t7et.mongodb.net/contactsManager?retryWrites=true&w=majority";
const Port = process.env.PORT || 3005;

mongoose.connect(Connection_Url).then((result)=>{
    app.listen(Port,(err)=>{
        if(!err){
            console.log(`The server Is Running at ${Port} And DB Has Connected`)
        }
    })
})