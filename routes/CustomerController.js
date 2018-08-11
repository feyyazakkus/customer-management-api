var express = require('express'),
    router = express.Router(),
    logger = require('../logger'),
    Customer = require('../models/Customer');

router.post('/customers', getCustomers);
router.get('/customers/:id', getCustomerByID);
router.post('/customers/add', addCustomer);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

function getCustomers(req, res) {
    var limit = req.body.limit || 10;
    var offset = req.body.offset || 0;
    var sortRule = { customerID: 1 };

    if (req.body.sortBy) {
        sortRule = {};
        sortRule[req.body.sortBy] = req.body.sortDirection || 1;
    }
    
    Customer.find()
    .skip(parseInt(offset))
    .limit(parseInt(limit))
    .sort(sortRule)
    .exec(function (err, customers) {

        if (err) logger.error(err);

        Customer.find().count(function (e, count) {
            res.json({
                success: true,
                customers: customers,
                totalCount: count
            });    
        })
    });
}

function getCustomerByID(req, res) {
    Customer.findOne({
        customerID: req.params.id
    }, function (err, customer) {
        if (err) logger.error(err);

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
            first: req.body.name.first,
            last: req.body.name.last
        },
        birthday: req.body.birthday,
        gender: req.body.gender
    });

    newCustomer.save(function (err, customer) {

        if (err) logger.error(err);

        if (customer) {
            res.json({
                success: true,
                customer: customer
            });
        } else {
            res.json({
                success: false,
                message: 'Cannot create customer'
            });
        }
    });
}

function updateCustomer(req, res) {

    Customer.findOne({
        customerID: req.params.id
    }, function (err, customer) {
        if (err) logger.error(err);

        if (customer) {
            if (req.body.name) {
                customer.name.first = req.body.name.first;
                customer.name.last = req.body.name.last;
            }            
            customer.birthday = req.body.birthday || customer.birthday;
            customer.gender = req.body.gender || customer.gender;
            customer.lastContact = req.body.lastContact || customer.lastContact;

            customer.save(function (err, result) {
                if (!err) {
                    res.json({
                        success: true,
                        customer: result
                    });
                } else {
                    logger.error(err);
                    res.json({
                        success: false,
                        message: 'Cannot update customer'
                    });
                }
            });
            
        } else {
            res.json({
                success: false,
                message: 'Customer not found'
            });
        }
    });
}

function deleteCustomer(req, res) {
    Customer.findOne({
        customerID: req.params.id
    }, function (err, customer) {
        if (err) logger.error(err);
        
        if (customer) {
            customer.remove(function (err) {
                if (!err) {
                    res.json({ success: true });
                } else {
                    loggger.error(err);
                    res.json({
                        success: false,
                        message: 'Cannot delete customer'
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: 'Customer not found'
            });
        }
    });
}

module.exports = router;