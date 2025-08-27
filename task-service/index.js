const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const amqp=require('amqplib');

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
let  channel,connection;

async function connectRabbitMqWithRetry(retries=5
                                        ,delay=3000) {
          while(retries){
            try{
              connection=await amqp.connect("amqp://rabbitmq");
              channel=await connection.createChannel();
              await channel.assertQueue("task_created");
              console.log('Connected to RabbitMQ');
              return;
            }catch(err){
              console.log('Error connecting to RabbitMQ',err.message);
              retries--;
              console.error("rabbitMQ connection retry:",retries);
              await new Promise(res=>setTimeout(res,delay));
            }
          }
  
}
app.post('/tasks',async(req,res)=>{
    const {title,description,userId}=req.body;
    try{
        const task=new Task({title,description,userId});
        await task.save();

        const message={taskId:task._id,userId,title};
        if(!channel){
          return res.status(503).json({
            error:"rabbitmq not connected"
          })
        }

        channel.sendToQueue("task_created",Buffer.from(
          JSON.stringify(message)
        ))

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
  connectRabbitMqWithRetry();
});