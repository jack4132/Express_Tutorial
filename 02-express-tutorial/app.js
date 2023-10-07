// const http=require('http')
// const {readFileSync}=require('fs')

// // get all files
// const homePage=readFileSync('./navbar-app/index.html')
// const homeStyles = readFileSync('./navbar-app/styles.css')
// const homeImage = readFileSync ('./navbar-app/logo.svg')
// const homeLogic = readFileSync('./navbar-app/browser-app.js')
// const server=http.createServer((req,res)=>{
//     if(req.url==='/'){
//     // console.log('server')
//     res.writeHead(200,{'content-type':'text/html'})
//     res.write(homePage)
//     res.end()
//     // res.end()
//     }else if(req.url==='/about'){
//     // console.log('server')
//     res.writeHead(200,{'content-type':'text/html'})
//     res.write('<h1>about</h1>')
//     res.end()
//     }else if(req.url==='/styles.css'){
//     // console.log('server')
//     res.writeHead(200,{'content-type':'text/css'})
//     res.write(homeStyles)
//     res.end()
//     }else if(req.url==='/logo.svg'){
//     // console.log('server')
//     res.writeHead(200,{'content-type':'image/svg+xml'})
//     res.write(homeImage)
//     res.end()
//     }else if(req.url==='/browser-app.js'){
//     // console.log('server')
//     res.writeHead(200,{'content-type':'text/javascript'})
//     res.write(homeLogic)
//     res.end()
//     }else{
//     // console.log('server')
//     res.writeHead(404,{'content-type':'text/html'})
//     res.write('<h1>Page not found</h1>')
//     res.end()
//     }
// })

// server.listen(3005)

const express=require('express');
const app=express();
const path =require('path')
const authorize = require('./authorize')
const {people}=require('./data')
// const logger=require('./logger')

// app.get ('/',(req, res) => {
// res.status(200).send( 'Home')
// })
// app.get ('/about',(req, res) => {
// res.status(200).send( 'About Page')
// })
const logger=(req,res,next)=>{
    console.log(req.url,'test')
    next()
}

app.use(express.static('./methods-public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// app.use([logger,authorize])
// app.get('/', (req, res) =>{
// res.sendFile(path.resolve(__dirname,'./index.html'))})
// res.status(200).json({success:true,data:people})

app.get('/api/people', (req, res) =>{
// res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))})
console.log(people)
res.status(200).json({success:true,data:people})
})

app.post('/api/people', (req, res) =>{
// res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))})
const {name}=req.body
if(!name?.length){
        return res.status(400).json({success:false,msg:'Please provide Credentials'})
    }else{
    return res.status(201).send({success:true,person:name})
    }
})
app.post('/api/postman/people', (req, res) =>{
// res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))})
const {name}=req.body
if(!name?.length){
        return res.status(400).json({success:false,msg:'Please provide Credentials'})
    }else{
    return res.status(201).send({success:true,data:[...people,{id:people.length+1,name}]})
    }
})
app.put('/api/postman/people/:id', (req, res) => {
const { id } = req.params
const { name } = req.body
const person = people.find( (person)=> person.id === Number(id))
// console.log(id, name) 
// res.send('hello world')
if(!person){
        return res.status(404).json({success:false,msg:'Person not found'})
    }
    const newPeople = people.map( (person) =>{
        if(person.id === Number(id) ){
            person.name = name
        }
        return person})
        res.status(200).json({success:true,data:newPeople})

})
app.post('/login',(req,res)=>{
    // console.log("POST")
    // console.log(req.body)
    const {name}=req.body
    console.log(name,req.body)
    if(name?.length){
        return res.status(200).send(`Welcome ${name}`)
    }else{
    return res.status(401).send('Please provide Credentials')
    }
})
app.delete('/api/people/:id', (req, res)=>{
const person = people.find((person) => person.id === Number(req.params.id))
if (!person) { 
    return res.status(404).json({success: false, msg: `no person with id ${req.params.id}`})
}
const newPeople = people.filter((person)=> person.id !== Number(req.params.id))
res.status(200).json({success:true,data:newPeople})
})
// app.get('/api/home', (req, res) =>{
// res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))})

// app.all('*', (req, res)=>{
// res.status(404).send(' <h1>resource not found</h1')
// })

app.listen(3005,()=>{
    console.log('listening on 3005')
})
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen