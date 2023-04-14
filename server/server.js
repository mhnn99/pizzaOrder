const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors());

const fileReader = (type, res) =>{
    try{
        const data = fs.readFileSync(`${type}.json`,'utf8')
        res.status(200).send(data.toString())
          }catch(err){
              res.status(400).json({success:false, message:err.message})
          }
}

app.get("/api/pizza", (req, res) => {
    fileReader('pizzas', res)
});

app.get("/api/allergens", (req, res) => {
    fileReader('allergens', res)
});

app.post('/api/orders', async (req,res)=>{
    try{
        let orderArr;
        const data = fs.readFileSync('orders.json', 'utf8')
        if(data===''){
            orderArr = []
        }else{
            orderArr=JSON.parse(data)
        }
        orderArr.push(req.body)
        fs.writeFileSync('orders.json', JSON.stringify(orderArr))
        res.json('DONE')
    }catch(err){
        res.json(err)
    }
})

app.listen(9000, () => console.log("Server listening on 9000"));
