//Import Modules
require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger');
const cookieParser = require('cookie-parser');
const ROLES_LIST = require('./config/roles_list');
const verifyRoles = require('./middleware/verifyRoles');
const verifyJWT = require('./middleware/verifyJWT');
const mongoose = require('mongoose');
const connectDB = require('./config/dbconn')
const cors = require('cors');
const corsOptions = require('./config/CorsOptions');
const credentials = require('./middleware/credentials');
const path = require('path');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 80;


//Init app http
const app = express();


// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
// built-in middleware for json 
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

//middleware for cookies
app.use(cookieParser());


//make main use the "public" folder as it's gets and posts
app.use(express.static('public'));


app.use("/", require("./routes/main"));


app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, './Views', 'connect_to_user.html'));
});



//API Routes
app.use("/API", require("./routes/API/products"));
app.use("/API", require("./routes/API/suppliers"));
app.use("/API", require("./routes/API/users"));



//Default Routes
app.use("/auth", require("./routes/auth"));


app.use("/admin", verifyJWT, verifyRoles(ROLES_LIST.Admin), require("./routes/admin"));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running `));
});




