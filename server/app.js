
const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser');
/*Add Mongoose */
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const usersRoutes = require('./api/routes/users');

// mongoose.connect(
//     process.env.DataBase
//     , { useMongoClient: true }
// );

mongoose.connect(
    "mongodb://localhost:27017/nodeRestApi"
    , { useNewUrlParser: true }
);


//use morgan
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
}));

//FOR ALLOW ORIGIN
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Request-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'it works'

//     })

// });
//routs which should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', usersRoutes);
//Error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;