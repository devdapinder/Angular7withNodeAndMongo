const express = require('express');
const router = express.Router();

//Get Product Request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order Handling Get Request'
    });
});
//Post
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order Handling Post Request'
    });
});

///Get request with parameter
router.get('/:orderId', (req, res, next) => {
    const id = req.params.productId;
    if (id === '1') {
        res.status(200).json({
            message: 'Order Handling post Request with productId =' + id
        });
    }
    else {
        res.status(200).json({
            message: 'Order Handling Get Request'
        });
    }
});


///Patch Job
router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Update Request Call'
    });
});
///delete
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Delete Request Call'
    });
});


module.exports = router;