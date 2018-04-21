var express = require('express'),
    router = express.Router(),
    Customer = require('../models/Customer');

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerByID);
router.post('/customers', addCustomer);

function getCustomers(req, res) {
    Customer.find(function (err, customers) {
        res.json({
            success: true,
            customers: customers
        });
    });
}

function getCustomerByID(req, res) {
    Customer.findOne({customerID: req.params.id}, function (err, customer) {
        if (err) throw err;

        if (customer) {
            res.json({
                success: true,
                customer: customer
            });
        } else {
            res.json({
                success: false,
                message: 'Customer not found'
            });
        }
    });
}

function addCustomer(req, res) {

    var newCustomer = new Customer({
        name: {
            first: req.body.firstname,
            last: req.body.lastname
        },        
        birthday: req.body.birtday,
        gender: req.body.gender
    });

    newCustomer.save(function (err, customer) {
        if (err) throw err;

        if (customer) {
            res.json({success: true});
        } else {
            res.json({
                success: false,
                message: 'Cannot create customer'
            });
        }
    });
}

module.exports = router;