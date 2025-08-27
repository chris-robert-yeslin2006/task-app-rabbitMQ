const amqp=require('amqplib');
const { connection } = require('mongoose');

async function start() {
    try{
        connection=await amqp.connect("amqp://rabbitmq");
        channel=await connection.createChannel();
        await channel.assertQueue("task_created");
        console.log('Connected to RabbitMQ');

        channel.consume("task_created",(msg)=>{
            const taskData=JSON.parse(msg.content.toString());
            console.log("Notification received for taskId:",taskData.title);
            console.log(taskData);
            channel.ack(msg);
        });
    }
    catch(err){
        console.error("Error connecting to RabbitMQ",err.message);

    }

    

}

start();