const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product')

//Get Product Request
router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: 'Handling Get Request'
    // });



    Product.find()
        .select('name price _id')
        .exec()
        .then(
            doc => {
                const response = {
                    count: doc.length,
                    products: doc.map(doct => {
                        return {
                            name: doct.name,
                            price: doct.price,
                            _id: doct._id,
                            request: {
                                type: "Get",
                                url: "http://localhost:3000/products" + doct._id
                            }

                        }
                    })
                };
                console.log("From Data Base Get All: " + doc);
                if (doc) {
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: 'No Data found',
                    });
                }
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            })
        });
});
//Post
router.post('/', (req, res, next) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price,
    // };
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log("Product Saved:" + result);
            res.status(201).json({
                message: 'Product Created successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "Get",
                        url: "http://localhost:3000/products" + result._id
                    }
                },
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            })
        });
});

///Get request with parameter
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(
            doc => {
                console.log("From Data Base: " + doc);
                if (doc) {

                    res.status(200).json({
                        message: 'Product Created successfully',
                        createdProduct: {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            request: {
                                type: "Get",
                                url: "http://localhost:3000/products" + doc._id
                            }
                        },
                    });
                } else {
                    res.status(404).json({
                        message: 'No Valid entry found',

                    });
                }
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            })
        });

    // if (id === '1') {
    //     res.status(200).json({
    //         message: 'Handling post Request with productId =' + id
    //     });
    // }
    // else {
    //     res.status(200).json({
    //         message: 'Handling Get Request'
    //     });
    // }
});


///Patch Job
router.patch('/:productId', (req, res, next) => {
    // res.status(200).json({
    //     message: 'Update Request Call'
    // });
    const id = req.params.productId;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.Value;
    }

    Product.update(
        { _id: id },
        {
            $set: updateOps
            // $set: {
            //     name: req.body.name,
            //     price: req.body.price
            // }
        }
    ).exec()
        .then(
            result => {
                console.log("Update Data By _Id: " + result);
                res.status(200).json({
                    message: 'Product Updated successfully',
                    createdProduct: {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        request: {
                            type: "Get",
                            url: "http://localhost:3000/products" + result._id
                        }
                    },
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            })
        });

});
///delete
router.delete('/:productId', (req, res, next) => {
    // res.status(200).json({
    //     message: 'Delete Request Call'
    // });
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(
            result => {
                console.log("Delete Data By _Id: " + result);
                res.status(200).json({
                    message: 'Product Updated successfully',
                    createdProduct: {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        request: {
                            type: "POST",
                            url: "http://localhost:3000/products",
                            body: { name: 'String', price: 'Number' }
                        }
                    },
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            })
        });

});
module.exports = router;