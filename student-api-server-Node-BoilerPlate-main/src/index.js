const express = require('express')
const mongoose=require('mongoose')
require('./connection');
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const initialData=require('./InitialData');
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

//http://localhost:8080/api/student
app.get('/api/student',(req,res)=>{
    res.json(initialData);
})


//http://localhost:8080/api/student/2
app.get('/api/student/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const student=initialData.find(s=>s.id===id)//check student id 

    if(student){
        res.json(student)
    }else{
        res.status(404).json({err:'student not found'})
    }
})


app.patch("/api/student/:id",async(req,res)=>{
    try{
const id=req.params.id;
const updatestudent= await student.findByIdAndUpdate(id,req.body);
res.status(200).send(updatestudent);
    }catch(e){
        res.status(404).send();
    }
})


app.delete("/api/student/:id",async (req,res)=>{
    try{
        const deletestudent= await student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send()
        }
        res.status(200).send(deletestudent);
        console.log(deletestudent);
    }catch(e){
        res.status(500).send(e);
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   