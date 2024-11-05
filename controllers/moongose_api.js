const mongoose = require('mongoose')
const Schemas = require('../models/Schemas')
const DBcon = require('../config/dbconn')



//Connects to our mongo
DBcon.connectDB()

//which DB using
const dbClient = mongoose.connection.useDb(DBcon.dbName)

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
async function CreateData(collection, datajson) {
    var reterr = 0
    var retdata = 0
    // Create a new user
    if (collection == "users") {
        const newCollection = new userModel(datajson);
        await newCollection.save()
            .then(function () {
                retdata = `${collection} created: ${datajson}`
                reterr = 0
            })
            .catch((err) => {
                reterr = err
            });
    }
    if (collection == "suppliers") {
        const newCollection = new suppModel(datajson);
        await newCollection.save()
            .then(function () {
                retdata = `${collection} created: ${datajson}`
                reterr = 0
            })
            .catch((err) => {
                reterr = err
            });
    }
    if (collection == "products") {
        const newCollection = new productModel(datajson);
        await newCollection.save()
            .then(function () {
                retdata = `${collection} created: ${datajson}`
                reterr = 0
            })
            .catch((err) => {
                reterr = err
            });
    }
    if (collection == "baskethistory") {
        const newCollection = new basketHistoryModel(datajson);
        await newCollection.save()
            .then(function () {
                retdata = `${collection} created: ${datajson}`
                reterr = 0
            })
            .catch((err) => {
                reterr = err
            });
    }
    return [reterr, retdata]
}

//Get all of Fields in The products collection
//sends in jsons the data
async function GetProductsFields() {
    //Get List of all fields in the collection
    await dbClient.model("products").aggregate([
        { $project: { _id: 0, fields: { $objectToArray: "$$ROOT" } } },
        { $unwind: "$fields" },
        { $group: { _id: null, allFields: { $addToSet: "$fields.k" } } },
        { $project: { _id: 0, allFields: 1 } },
        { $unwind: "$allFields" },
        { $sort: { allFields: 1 } },
        { $group: { _id: null, allFields: { $push: "$allFields" } } }
    ]).then(function (data) {
        rdata = data
    }).catch((err) => {
        return [err, 0]
    });

    //get the values list of every fields
    const Fields = rdata[0].allFields;
    let FinalJson = {};
    for (const field of Fields) {
        if (field == '_id' || field == '__v' || field == 'picture_link') continue;
        let SubJson = {};
        await dbClient.model("products").distinct(field, {}).then(function (data) {
            NewData = data
        }).catch((err) => {
            return [err, 0]
        })
        //Add for the company_id the company name
        if (field == "company_name") {
            let names = []
            for (id of NewData) {
                const out = await ReadData("suppliers", { _id: id }, { companyName: 1 })
                var err = out[0]
                var data = out[1]
                if (err)
                    return [err, 0]
                else
                    names.push(data[0]);
            }
            SubJson[field] = names;
        }
        else
            SubJson[field] = NewData;

        // Create a final json with all the Data    
        Object.assign(FinalJson, SubJson);
    }
    return [0, FinalJson];
}
//Add a product to current basket
async function addToCurrentBasket(email, productId) {
    var reterr = 0
    var retdata = 0
    try {
        await userModel.findOneAndUpdate(
            { email: email }, // Search criteria
            { $push: { currentBasket: productId } }, // Update operation
            { new: true, useFindAndModify: false } // Options
        );
        console.log('Product added to currentBasket successfully');
        reterr = 0;
        retdata = `'Product added to currentBasket successfully'`;
    } catch (error) {
        reterr = error;
        console.log(error);
    }
    return [reterr, retdata]
}
//Remove a product from current basket
async function RemoveFromCurrentBasket(email, productId) {
    var reterr = 0;
    var retdata = 0;
    try {
        // Find the user document
        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }
        // Remove one instance of productId from currentBasket
        const index = user.currentBasket.indexOf(productId);
        if (index > -1) {
            user.currentBasket.splice(index, 1);
            await user.save();
            console.log('Product removed from currentBasket successfully');
            retdata = 'Product removed from currentBasket successfully';
        } else {
            console.log('Product not found in currentBasket');
            retdata = 'Product not found in currentBasket';
        }
    } catch (error) {
        console.error('Error removing product from currentBasket:', error);
        reterr = error;
    }
    return [reterr, retdata];
}
//Get all of data in a collection
//var collection is the name of the collection
//sends in jsons the data
async function ReadData(collection, searchjson, fieldsjson) {
    var reterr = 0
    var retdata = 0
    await dbClient.model(collection).find(searchjson, fieldsjson)
        .then(function (data) {
            retdata = data
            reterr = 0
        })
        .catch((err) => {
            retdata = 0
            reterr = err
        })

    return [reterr, retdata]
}

//Update data in a collection from req
//var collection is the name of the collection
//name of the field to search on the collection
async function UpdateData(collection, searchjson, fieldsjson) {
    var reterr = 0
    var retdata = 0
    // Update a user
    await dbClient.model(collection).findOneAndUpdate(searchjson, fieldsjson)
        .then(function () {
            reterr = 0
            retdata = `${collection}: in ${searchjson} was updated`
        })
        .catch((err) => {
            reterr = err
        });
    return [reterr, retdata]
}

//delete data in a collection from req
//var collection is the name of the collection
//name of the field to search on the collection
async function DeleteData(collection, searchjson) {
    var reterr = 0
    var retdata = 0
    // Delete a user
    await dbClient.model(collection).deleteOne(searchjson)
        .then(function () {
            reterr = 0
            retdata = `${collection}: in ${searchjson} was deleted`
        })
        .catch((err) => {
            reterr = err
        });
    return [reterr, retdata]
}

exports.CreateData = CreateData
exports.ReadData = ReadData
exports.UpdateData = UpdateData
exports.DeleteData = DeleteData
exports.GetProductsFields = GetProductsFields
exports.RemoveFromCurrentBasket = RemoveFromCurrentBasket;
exports.addToCurrentBasket = addToCurrentBasket;
exports.mongoose = mongoose
exports.dbClient = dbClient
exports.userModel = userModel
exports.suppModel = suppModel
exports.productModel = productModel
exports.basketHistoryModel = basketHistoryModel