const express = require("express");
require("dotenv").config();
const {sequelize} = require("./database-config");
const { userRouter } = require("./router");

//sequelize.sync({ force: true });


const app = express();

app.use((req, res , next)=>{
            next();
})


app.use(express.json());



app.use("/users", userRouter) 
app.listen(3000 , ()=>{
    console.log(" Started the application.")
})



