const express = require("express"); //'express' module ko import kiya.
const path = require("path");
const fs = require("fs");
const app = express();  //uske baad ek app banaya 'express' ki. aur initialize kar diya.
const port = 80;  //usko port 80 pe run karna chahta hoon.

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))  //For serving static files
app.use(express.urlencoded())     //Yeh middle ware form ka data Express tak laane mein help karta hai.

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')  //Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))  //Set the views directory


//ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best game on the internet."
    const params = {'title': 'PubG is the best game', 'content': con}
    res.status(200).render('index.pug', params);
})

app.post('/', (req, res)=>{
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more

    let outputToWrite = `the name of the client is ${name}, ${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('index.pug', params);
})


//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})