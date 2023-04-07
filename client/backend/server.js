const express= require('express')
const path=require('path')
const app = express()

app.get('/', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.use(express.static(`${__dirname}/../frontend/public`))

app.listen(9002,()=>console.log('http://127.0.0.1:9002'))