const express= require('express')
const path=require('path')
const app = express()

app.get('/', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
});

app.get('/menu', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/../frontend/menu.html`))
});

app.get('/contact', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/../frontend/contact.html`))
});

app.get('/basket', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/../frontend/basket.html`))
});

app.get('/about', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/../frontend/about.html`))
});

app.use('/public', express.static(path.join(`${__dirname}/../frontend/public`)));

app.listen(9003,()=>console.log('http://127.0.0.1:9003', path.join(`${__dirname}/../frontend/public`)));