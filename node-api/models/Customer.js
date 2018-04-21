var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var CustomerSchema = mongoose.Schema({
    
    customerID: {
        type: Number,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    birthday: String,
    gender: String,
    lastContact: Date,
    customerLifetimeValue: Number,    
    created_at: {
        type: Date,
        default: Date.now
    }
});

CustomerSchema.plugin(autoIncrement.plugin, {
    model: 'Customer',
    field: 'customerID',
    startAt: 6
});

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');