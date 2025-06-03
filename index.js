const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');


const url = 'mongodb+srv://dineshsd411:dineshnaveen@cluster0.hdr5lyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url)
.then(()=>{console.log("db connected successfully")})
.catch((err)=>console.log(err))
const todoSchema = mongoose.Schema({
    text:String,
    completed:{
        type:Boolean,
        default:false
    }
})

const Todo = mongoose.model('Todo',todoSchema);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send("hello World");
})

app.post('/create',async(req,res)=>{
    const {text}=req.body;
    const todo = await Todo.create({text})
    console.log(todo);
    if(todo){
        return res.json({status:true});
    }
    return res.json({status:false});
})

app.get('/getALLTodos',async(req,res)=>{
    const todos = await Todo.find();
    if(todos){
        return res.json({status: true,todos})
    }
    return res.json({status:false,msg:"can't get all the todos"})
})

app.delete('/deleteTodo',async(req,res)=>{
    console.log(req.query)
    const {id} = req.query;
    const todo = await Todo.findByIdAndDelete(id)
    if(todo){
        return res.json({status:true})
    }
    return res.json({status:false})
})

app.put('/completetodo',async(req,res)=>{
    const {id} = req.query;
    
    const todo = await Todo.findByIdAndUpdate(id,{
        completed:true
    },{new:true});
    if(todo){
        return res.json({status:true})
    }
    return res.json({status:false})
})
app.listen(3333,() => {
    console.log("server started at the port 3333");
})
