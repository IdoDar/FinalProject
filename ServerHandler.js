//Express Module
const express = require('express')

//Init app http
const app=express()

//db_module
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://Manger:YARDEN1noam2IDO3@ourshop.ijtge.mongodb.net/?retryWrites=true&w=majority&appName=OurShop";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


//make main use the "public" folder as it's gets and posts
app.use(express.static('public'))




app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")

const authRouter = require("./routes/auth")
app.use("/auth", authRouter)
mongoose.connection.once('open', () => {
    console.log('DB connected');
    app.listen(8080);
});

const Product_Schema = new mongoose.Schema({
    product_name: String,
    company_name: String,
    price: Number,
    weight: Number,
    Description: String,
    Category: String
  });

  const Product_Model = mongoose.model("products", Product_Schema);
  const products = new Product_Model()
  console.log(Product_Model.find().where("price").gt(50).exec());

