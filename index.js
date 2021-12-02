import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//created an instace of the express servers
const app = express();
app.use(express.json());


const PORT = process.env.PORT?? 6800;

app.get('/', (req, res)=>{
    res.send("Hello World!, This is Practice");
});

//Connect to MongoAtlas Database#
mongoose.connect(process.env.MONGO_DB_PRACTICE, (error) => {
    if (error) {
        return console.log("Connection to MongoDB was unsuccesful");
    }
    else {
        console.log("Connection to MongoDB was succesful");
        app.listen(PORT, ()=>console.log(`Practice server is up and running on ${PORT}`));
    }
} )





