const mongoose = require('mongoose')
const Schemas = require('./Schemas')

var yourConnectionURI="Manger:YARDEN1noam2IDO3@ourshop.ijtge.mongodb.net/?retryWrites=true&w=majority&appName=OurShop"
var dbName="testing_tables"

//Connects to our mongo
mongoose.connect(`mongodb+srv://${yourConnectionURI}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

//which DB using
const dbClient = mongoose.connection.useDb(dbName)

//creates Schemas of a collection
if (!dbClient.models['users']) {
    var userModel = dbClient.model('users', Schemas.userSchema);
  }
  if (!dbClient.models['suppliers']) {
    var suppModel = dbClient.model('suppliers', Schemas.supplierSchema);
  }
  if (!dbClient.models['products']) {
    var productModel = dbClient.model('products', Schemas.productSchema);
  }
  if (!dbClient.models['baskethistory']) {
    var basketHistoryModel = dbClient.model('baskethistory', Schemas.basketHistorySchema);
  }

  //Create New data in a collection from req
//var collection is the name of the collection
async function CreateData(collection,datajson){
    var reterr=0
    var retdata=0
    // Create a new user
    if (collection=="users"){
    const newCollection = new userModel(datajson);
    await newCollection.save()
        .then(function () {
            retdata=`${collection} created: ${datajson}`
            reterr=0
        })
        .catch((err) => {
            reterr=err
        });}
    if (collection=="suppliers"){
        const newCollection = new suppModel(datajson);
        await newCollection.save()
            .then(function () {
                retdata=`${collection} created: ${datajson}`
                reterr=0
            })
            .catch((err) => {
                reterr=err
            });}
    if (collection=="products"){
        const newCollection = new productModel(datajson);
        await newCollection.save()
            .then(function () {
                retdata=`${collection} created: ${datajson}`
                reterr=0
            })
            .catch((err) => {
                reterr=err
            });}
    if (collection=="baskethistory"){
        const newCollection = new basketHistoryModel(datajson);
        await newCollection.save()
            .then(function () {
                console.log(datajson)
                retdata=`${collection} created: ${datajson}`
                reterr=0
            })
            .catch((err) => {
                reterr=err
            });}
    return [reterr,retdata]
}

//Get all of data in a collection
//var collection is the name of the collection
//sends in jsons the data
async function ReadData(collection,searchjson,fieldsjson){
    var reterr=0
    var retdata=0
     await dbClient.model(collection).find(searchjson,fieldsjson)
    .then(function (data) {
        retdata=data
        reterr=0
        })
    .catch((err) => {retdata=0
        reterr=err})
    return [reterr,retdata]
}
    
//Update data in a collection from req
//var collection is the name of the collection
//name of the field to search on the collection
async function UpdateData(collection,searchjson,fieldsjson){
    var reterr=0
    var retdata=0
    // Update a user
    await dbClient.model(collection).findOneAndUpdate( searchjson , fieldsjson )
    .then(function (){
        reterr=0
        retdata=`${collection}: in ${searchjson} was updated`
    })
    .catch((err) => {
        reterr=err
    });
    return [reterr,retdata]
}

//delete data in a collection from req
//var collection is the name of the collection
//name of the field to search on the collection
async function DeleteData(collection,searchjson){
    var reterr=0
    var retdata=0
   // Delete a user
   await dbClient.model(collection).deleteOne(searchjson)
   .then(function (){
    reterr=0
    retdata=`${collection}: in ${searchjson} was deleted`
    })
    .catch((err) => {
        reterr=err
    });
    return [reterr,retdata]
}

exports.CreateData=CreateData
exports.ReadData=ReadData
exports.UpdateData=UpdateData
exports.DeleteData=DeleteData
exports.mongoose=mongoose
exports.dbClient=dbClient
exports.userModel=userModel
exports.suppModel=suppModel
exports.productModel=productModel
exports.basketHistoryModel=basketHistoryModel