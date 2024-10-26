const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {

        });

    } catch (err) {
        console.error(err);
    }
};

const dbName = "testing_tables";

module.exports = { connectDB, dbName }