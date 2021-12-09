import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {Todo} from './models/todo.js'

dotenv.config();

//created an instace of the express servers
const app = express();
app.use(express.json());


const PORT = process.env.PORT?? 6800;

app.get('/', (req, res)=>{
    res.send("Hello World!, This is my Backend");
});

// create routes to make request to the serve
app.get("/todos", async (req, res) => {

    const result = await Todo.find({});

    res.json(result);});

// Make the handler an async function by adding the async keyword
app.post("/todo", async (req, res) => {

    // extract the necessary fields from the body
    const { title, description, dateTime, isCompleted } = req.body;

    // create a Todo model with the necessary fields
    const newTodo = Todo({
        title: title,
        description: description,
        dateTime: dateTime,
        isCompleted: isCompleted,
    });

    // save the Todo model and await the result
    const result = await newTodo.save();

    // send back a response with the result in a json format
    res.json(result);});

    app.patch("/todo/:todoID", async (req, res) => {
    //find and update a model by passing in the id, the data to be updated, and set the new option to true

    const result = await Todo.findByIdAndUpdate(
      req.params.todoID, // _id of the document
      { ...req.body }, // the data to be used to update the document
      { new: true }); // some options for the operation

    res.json(result);});

    app.put("/todo/:todoID", async (req, res) => {
    //find and update a model by
    // passing in the id, the data to be updated, and set the new option to true

    const result = await Todo.findByIdAndUpdate(
      req.params.todoID, // _id of the document
      { ...req.body }, // data to be replaced
      { new: true, overwrite: true }); // options

    res.json(result);
});

app.delete("/todo/:todoID", async (req, res) => {
    //find and update a model by passing in the id and a callback function
    // that takes in the error and the deletedDocument

    try { await

        Todo.findByIdAndDelete(req.params.todoID, (error, doc)=>{

    if(!error)
    res.send(`Todo with _id: ${req.params.todoID} has been deleted`);})}

    catch (error) {
    console.log("Error: ", error);
    }
});


//Connect to MongoAtlas Database#
mongoose.connect(process.env.MONGO_DB_PRACTICE, (error) => {

    if (error) {
        return console.log("Connection to MongoDB was unsuccesful");}

    else {
        console.log("Connection to MongoDB was succesful");
        app.listen(PORT, ()=>console.log(`Practice server is up and running on ${PORT}`));}
})





