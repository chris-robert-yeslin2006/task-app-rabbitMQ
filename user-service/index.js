const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
const port = 3001;

mongoose.connect('mongodb://mongo:27017/users')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
const UserSchema=mongoose.Schema({
    name:String,
    email:String
})
const User=mongoose.model('User',UserSchema)

app.post('/users',async(req,res)=>{
    const {name,email}=req.body;
    try{
        const user=new User({name,email});
        await user.save();
        res.status(201).json(user);
        console.log('User created');
    }
    catch(err){
        res.status(500).json({message:'Error creating user'});
        console.log('Error creating user');
    }
})
app.get('/users', async(req, res) => {
    const users = await User.find();
    res.json(users);
    console.log('Users retrieved');
});
  


app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});