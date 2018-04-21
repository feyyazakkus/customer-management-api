var express = require('express'),
    router = express.Router(),
    Customer = require('../models/Customer');

router.get('/customers', getAllCustomers);

function getAllCustomers(req, res) {
    Customer.find(function (err, customers) {
        res.json({
            success: true,
            customers: customers
        });
    });
}

module.exports = router;