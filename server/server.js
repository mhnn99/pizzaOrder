const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
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

app.listen(9000, () => console.log("Server listening on 9000"));
