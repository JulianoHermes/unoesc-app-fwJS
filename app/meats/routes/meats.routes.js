'use strict';

var auth = require('../../users/controllers/auth.controller');

module.exports = function(api) {
    var meats = require('../controllers/meats.controller');
    
    api.use(auth.validateToken);
    
    api.route('/meats')
        .get(meats.findAll)
        .post(meats.create);
        
    api.route('/meats/:meatId')
        .get(meats.find)
        .put(meats.update)
        .delete(meats.delete);
        
    api.param('meatId', meats.meatById);
}