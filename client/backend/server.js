const express= require('express')
const path=require('path')
const app = express()

app.get('/', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.use('/public', express.static(path.join(`${__dirname}/../frontend/public`)))

app.listen(9003,()=>console.log('http://127.0.0.1:9003', path.join(`${__dirname}/../frontend/public`)))