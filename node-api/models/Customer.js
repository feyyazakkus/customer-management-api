var mongoose = require('mongoose');

var CustomerSchema = mongoose.Schema({
    
    customerID: Number,
    name: {
        first: String,
        last: String
    },
    birthday: Date,
    gender: String,
    lastContact: Date,
    customerLifetimeValue: Number,    
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');