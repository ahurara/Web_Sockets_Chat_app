const http = require('http');
const express = require('express');
const path = require('path');
const {Server} =require("socket.io");
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io =new Server(server);

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));

//socket.io
io.on('connection' , (socket) =>{
    console.log("A new user has been connected" , socket.id)
    //front end sy msg obtain krna
    socket.on('user-message' , (message)=>{
        console.log("new message from user :", message)
        //jitny users hyn server mn sbko msg bhejdo
        io.emit('message' , message);
    })
})

app.get('/gg' , (req,res)=>{
    res.send('hello world');
})

server.listen(9000,()=> console.log(`server is listneing at port :9000`))