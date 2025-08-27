// const amqp=require('amqplib');
// const { connection } = require('mongoose');

// async function start() {
//     try{
//         connection=await amqp.connect("amqp://rabbitmq");
//         channel=await connection.createChannel();
//         await channel.assertQueue("task_created");
//         console.log('Connected to RabbitMQ');

//         channel.consume("task_created",(msg)=>{
//             const taskData=JSON.parse(msg.content.toString());
//             console.log("Notification received for taskId:",taskData.title);
//             console.log(taskData);
//             channel.ack(msg);
//         });
//     }
//     catch(err){
//         console.error("Error connecting to RabbitMQ",err.message);

//     }

    

// }

// start();

const amqp = require('amqplib');

let connection;
let channel;
const queueName = "task_created";
const rabbitUrl = "amqp://rabbitmq";
const retryDelay = 5000; 

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(rabbitUrl);
    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err.message);
    });
    connection.on('close', () => {
      console.error('RabbitMQ connection closed. Reconnecting...');
      setTimeout(connectRabbitMQ, retryDelay);
    });

    channel = await connection.createChannel();
    await channel.assertQueue(queueName);

    console.log('Connected to RabbitMQ');

    channel.consume(queueName, (msg) => {
      const taskData = JSON.parse(msg.content.toString());
      console.log("Notification received for taskId:", taskData.title);
      console.log(taskData);
      channel.ack(msg);
    });
  } catch (err) {
    console.error('Error connecting to RabbitMQ:', err.message);
    console.log(`Retrying connection in ${retryDelay / 1000} seconds...`);
    setTimeout(connectRabbitMQ, retryDelay);
  }
}

connectRabbitMQ();
