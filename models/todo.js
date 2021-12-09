//import the mongoose package
import mangoose from "mongoose";

//unpack schema & model from mongoose
const {schema, model} = mongoose;

// The schema defines the structure of our collection (Table) in MongoDB the model defines how data will modeled
//for our collection and comes along with built in features to manipulate the data

//Create a new schema instance specifying which fields (columns) you want in the collection (Table)
const todoSchema = Schema({
    title: String,
    description: String,
    dateTime: String,
    isCompleted: Boolean
});

// Make a model by passing in the name and a schema for our model
export const Todo = model('todo',todoSchema );