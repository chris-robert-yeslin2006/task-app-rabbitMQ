const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
const port = 3002;


mongoose.connect('mongodb://mongo:27017/tasks')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


const TaskSchema=mongoose.Schema({
    title:String,
    description:String,
    userId:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
    
});

const Task=mongoose.model('Task',TaskSchema);

app.post('/tasks',async(req,res)=>{
    const {title,description,userId}=req.body;
    try{
        const task=new Task({title,description,userId});
        await task.save();
        res.status(201).json(task);
        console.log('Task created');
    }
    catch(err){
        res.status(500).json({message:'Error creating task'});
        console.log('Error creating task');
    }
})

app.get('/tasks',async(req,res)=>{
    const tasks=await Task.find();
    res.json(tasks)
    console.log('Tasks retrieved');
})


app.listen(port, () => {
  console.log(`Task service listening at http://localhost:${port}`);
});