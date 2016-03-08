'use strict';

var mongoose = require('mongoose'),
    Meat = require('../models/meat.model');

exports.findAll = function(req, res) {
    Meat.find({}).exec(function(err, meats) {
        if (err) {
            console.error(err);
            res.status(400).json(err);
        } else {
            res.json(meats);
        }
    });
};
exports.find = function(req, res) {
    res.json(req.meat);
};
exports.create = function(req, res) {
    var meat = new Meat(req.body);
    meat.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Carne criada com sucesso',
                meat: meat
            });
        }
    });
};
exports.update = function(req, res) {
    var meat = req.meat;
    meat.name = req.body.name;
    meat.animal = req.body.animal;
    meat.description = req.body.description;
    meat.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Carne alterada com sucesso',
                meat: meat
            });
        }
    });
};
exports.delete = function(req, res) {
    var meat = req.meat;
    meat.remove(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Carne removida com sucesso',
                meat: meat
            });
        }
    });
};
exports.meatById = function(req, res, next, meatId) {
    if (!mongoose.Types.ObjectId.isValid(meatId)) {
        res.status(400).json({
            message: 'Carne inválida'
        })
    }
    Meat.findById(meatId).exec(function(err, meat) {
        if (err) {
            res.status(404).json(err);
        }
        req.meat = meat;
        next();
    });
}