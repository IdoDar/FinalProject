//Express Module
const express = require('express')
//body-parser Module
const bodyParser=require('body-parser')
//cors Module
const cors = require('cors')
//Init main http
const main=express()
//Init CRUD http
const crud=express()
var alldata=[]
//options to enable cros in browsers
var corsOptions={origin: '*',methods: "GET,PUT,POST,DELETE"}
//make main use the "public" folder as it's gets and posts
main.use(express.static('public'))
main.use(cors(corsOptions))
//make crud parse data from postdata as "json",url and if postdata is as "text/plain"
crud.use(bodyParser.urlencoded({ extended: false }))
crud.use(bodyParser.json())
crud.use(bodyParser.text({ type: 'text/plain' }))
crud.use(cors(corsOptions))

//What happends when method GET (get all info) used to CRUD
crud.get("/",(req,res) =>{
    var index=1
    var resdata=` <table class="table">
<thead>
  <tr>
  <th>#</th>
    <th>Dogname</th>
    <th>Dogtype</th>
  </tr>
</thead>`
alldata.forEach((element) => {
    resdata=resdata+`<tbody>
    <tr>
    <td>${index}</td>
      <td>${element.Dogname}</td>
      <td>${element.Dogtype}</td>
    </tr>
  </tbody>`
  index++
})
 res.send(resdata)})

 //What happends when method POST (to add more data) used to CRUD
crud.post("/",(req,res) =>{
    
    alldata.push(req.body)
    res.status(200).json(req.body)
})

//What happends when method PUT (to update a row) used to CRUD
crud.put("/",(req,res) =>{
    if (req.body.row_num-1<alldata.length && req.body.row_num-1>0){
        var Dogname=req.body.Dogname
        var Dogtype=req.body.Dogtype
    alldata[req.body.row_num-1]={Dogname,Dogtype}
    res.status(200).json(req.body)}
    else{
        res.status(404).json(req.body)
    }
})

//What happends when method delete (to delete data) used to CRUD
crud.delete("/",(req,res) =>{
    
var index=-1
var i=0
            alldata.forEach((element) => {
                if(element.Dogname==req.body.Dogname && element.Dogtype==req.body.Dogtype){
                    index=i
                   }
                i++
            })
            if (index > -1) { 
                alldata.splice(index, 1) 
                res.status(200).json(req.body)
            }
            else{
                res.status(404).json(req.body)
            }
            })
//make crud run on port 8080
crud.listen(8080,function(){console.log("CRUD Running")})
//make crud run on port 80
main.listen(80,function(){console.log("Main Running")})