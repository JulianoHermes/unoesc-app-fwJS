'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeatSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    animal: {
        type: String
    },
    created: {
        type: Date
    },
    updated: {
        type: Date
    }
});

MeatSchema.pre('save', function(next) {
    var meat = this;
    if (this.isNew) {
        meat.created = new Date();
    }
    meat.updated = new Date();
    next();
});

module.exports = mongoose.model('Meat', MeatSchema);